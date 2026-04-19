import express from "express";
import { saveOnboarding } from "./user.handlers.js";
import { authOnly } from "#auth/middleware.js";
import { getCurrentUser } from "./user.handlers.js";

const router = express.Router();

router.post("/onboarding", authOnly, saveOnboarding);
router.get("/me", authOnly, getCurrentUser);

export default router;