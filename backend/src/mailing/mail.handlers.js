import { transporter } from "./mailer.js";
import { verificationEmailTemplate, resetPwEmailTemplate } from "./templates.js";
import { prisma } from "../db/db.js";
import { generateJwtToken, verifyJwtToken } from "../auth/auth.token.handlers.js";

const COOLDOWN_SECONDS = 60;
const lastSentMap = new Map(); // store cooldowns in memory (may need to change at scale)

export const sendVerificationEmailHandler = async (req, res) => {
  try {
    const { userId } = res.locals.user;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.verified) {
      return res.status(400).json({ error: "Email already verified" });
    }

    const to = user.email;
    // set cooldown
    const lastSent = lastSentMap.get(to);
    if (lastSent) {
      const elapsed = Math.floor((Date.now() - lastSent) / 1000);
      const remaining = COOLDOWN_SECONDS - elapsed;
      if (remaining > 0) {
        return res.status(429).json({ error: "Too many requests", cooldown: remaining });
      }
    }
    // add purpose so auth token can't be used
    const verifyToken = generateJwtToken({ userId: user.id, purpose: "email-verification" });
    const baseUrl = process.env.NODE_ENV !== "production" ? "http://localhost:5173" : "https://quickbites.site"
    const verifyUrl = `${baseUrl}/verify?token=${verifyToken}`;

    await transporter.sendMail({
      from: `QuickBites <${process.env.SMTP_USER ?? "localhost"}>`,
      to,
      subject: "Verify your email",
      html: verificationEmailTemplate(verifyUrl),
    });

    lastSentMap.set(to, Date.now());
    res.status(200).json({ message: "Verification email sent", cooldown: COOLDOWN_SECONDS });
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
};

export const verifyEmailHandler = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ error: "Missing token" });
    }

    const data = verifyJwtToken(token);
    // check purpose
    if (data.purpose !== "email-verification") {
      return res.status(400).json({ error: "Invalid token" });
    }
    // ensure token is not reused
    const existing = await prisma.user.findUnique({ where: { id: data.userId } });
    if (existing.verified) {
      return res.status(400).json({ error: "Email already verified" });
    }
    // verify user
    await prisma.user.update({
      where: { id: data.userId },
      data: { verified: true },
    });
    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("Verify error:", err);
    res.status(400).json({ error: "Invalid or expired token" });
  }
};

export const sendResetEmailHandler = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      return res.status(200).json({ message: "If email exists, reset email sent" });
    }

    // add purpose so auth token can't be used
    const resetToken = generateJwtToken({ userId: user.id, purpose: "password-reset" });
    const baseUrl = process.env.NODE_ENV !== "production" ? "http://localhost:5173" : "https://quickbites.site"
    const resetUrl = `${baseUrl}/reset?token=${resetToken}`;
    const to = user.email;

    await transporter.sendMail({
      from: `QuickBites <${process.env.SMTP_USER ?? "localhost"}>`,
      to,
      subject: "Reset your password",
      html: resetPwEmailTemplate(resetUrl),
    });

    res.status(200).json({ message: "If email exists, reset email sent" });
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
};
