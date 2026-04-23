import express from "express";
import {
  getCurrentUser,
  getSavedRecipesHandler,
  saveOnboarding,
  saveRecipeHandler,
  unsaveRecipeHandler,
  updateCurrentUserName,
  updateCurrentUserPassword,
} from "./user.handlers.js";
const router = express.Router();

router.post("/onboarding", saveOnboarding);
router.get("/me", getCurrentUser);
router.patch("/me/name", updateCurrentUserName);
router.patch("/me/password", updateCurrentUserPassword);

router.get("/saved-recipes", getSavedRecipesHandler);
router.post("/saved-recipes", saveRecipeHandler);
router.delete("/saved-recipes/:id", unsaveRecipeHandler);

export default router;
