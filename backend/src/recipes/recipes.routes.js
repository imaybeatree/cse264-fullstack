import express from "express";

import { 
  getRecipesHandler,
  getRecipesByIngredientsHandler,
  getRecipeByIdHandler,
  getRecipesByNutrientsHandler,
  getFilteredRecipesHandler,
  getSimilarRecipesHandler
} from "./recipes.handlers.js";

const router = express.Router();

router.get("/", getRecipesHandler);
router.get("/filter", getFilteredRecipesHandler);
router.get("/by-ingredients", getRecipesByIngredientsHandler);
router.get("/by-nutrients", getRecipesByNutrientsHandler);
router.get("/:id", getRecipeByIdHandler);
router.get("/:id/similar", getSimilarRecipesHandler);

export default router;