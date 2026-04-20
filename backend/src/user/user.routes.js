import express from "express";
import { saveOnboarding } from "./user.handlers.js";
import { authOnly } from "#auth/middleware.js";
import { getCurrentUser } from "./user.handlers.js";

const router = express.Router();

router.post("/onboarding", authOnly, saveOnboarding);
router.get("/me", authOnly, getCurrentUser);
router.get("/saved-recipes", getSavedRecipesHandler);
router.post("/saved-recipes", saveRecipeHandler);
router.delete("/saved-recipes/:id", unsaveRecipeHandler);

export default router;