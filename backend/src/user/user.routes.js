import express from "express";
import { saveOnboarding } from "./user.handlers.js";
import { authOnly } from "#auth/middleware.js";

const router = express.Router();

router.post("/onboarding", authOnly, saveOnboarding);

export default router;