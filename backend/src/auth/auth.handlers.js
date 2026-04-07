import { prisma } from "../db/db.js";
import bcrypt from "bcrypt";
import { generateJwtToken } from "./auth.token.handlers.js";

export const registerHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "email and password are required",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username: email.split("@")[0].toLowerCase(),
        email: email.toLowerCase(),
        passwordHash,
        verified: process.env.NODE_ENV !== "production",
      },
    });
    const token = generateJwtToken(user.id)

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

    const token = generateJwtToken(user.id)
    res.status(200).json({token: token})

  } catch(err){
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }

}