// user.routes.js
import express from "express";
import { getSavedRecipesHandler, saveRecipeHandler, unsaveRecipeHandler } from "./user.handlers.js";

const router = express.Router();

router.get("/saved-recipes", getSavedRecipesHandler);
router.post("/saved-recipes", saveRecipeHandler);
router.delete("/saved-recipes/:id", unsaveRecipeHandler);

export default router;