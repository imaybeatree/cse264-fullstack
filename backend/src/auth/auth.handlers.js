import { prisma } from "../db/db.js";
import bcrypt from "bcrypt";
import { generateJwtToken, verifyJwtToken } from "./auth.token.handlers.js";

export async function registerHandler(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "username and password are required",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        passwordHash,
      },
    });
    console.log(user)
    const token = generateJwtToken(user.id)

    res.status(201).json({token: token})
  } catch (err) {
    console.error(err);

    // unique username error
    if (err.code === "P2002") {
      return res.status(409).json({
        error: "username already exists",
      });
    }

    res.status(500).json({
      error: "failed to create user",
    });
  }
}

export async function loginHandler(res, req){
  try{
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
    where: { username: `${username}` },
    });
    console.log("login user: ",user)
    const ok = await bcrypt.compare(password, user.passwordHash);

    if (!ok) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = generateJwtToken(user.id)
    res.status(200).json({token: token})

  } catch(err){

  }



}