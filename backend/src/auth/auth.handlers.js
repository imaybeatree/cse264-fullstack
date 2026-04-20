import { prisma } from "../db/db.js";
import bcrypt from "bcrypt";
import { generateJwtToken, verifyJwtToken } from "./auth.token.handlers.js";

export const registerHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "email and password are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: "password must be at least 8 characters",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username: email.split("@")[0].toLowerCase(),
        email: email.toLowerCase(),
        passwordHash,
        verified: process.env.NODE_ENV !== "production", // if not production, auto verify
      },
    });
    const token = generateJwtToken({ userId: user.id, verified: user.verified, onboarded: user.onboarded})

    res.status(201).json({token: token})
  } catch (err) {
    console.error(err);

    if (err.code === "P2002") {
      return res.status(409).json({
        error: "email already exists",
      });
    }

    res.status(500).json({
      error: "failed to create user",
    });
  }
}

export const loginHandler = async (req, res) => {
  try{
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);

    if (!ok) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateJwtToken({ userId: user.id, verified: user.verified, onboarded: user.onboarded})
    res.status(200).json({token: token})

  } catch(err){
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }

}

export const resetPasswordHandler = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Missing token" });
    }

    const data = verifyJwtToken(token);
    // check purpose
    if (data.purpose !== "password-reset") {
      return res.status(400).json({ error: "Invalid token" });
    }
    const user = await prisma.user.findUnique({ where: { id: data.userId } });
    if (!user) {
      return res.status(400).json({ error: "User doesn't exist" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    // verify user
    await prisma.user.update({
      where: { id: data.userId },
      data: { passwordHash: passwordHash },
    });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Verify error:", err);
    res.status(400).json({ error: "Invalid or expired token" });
  }
};