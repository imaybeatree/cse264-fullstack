import express from "express";

import { 
  getRecipesHandler,
  getRecipesByIngredientsHandler,
  getRecipeByIdHandler,
  getRecipesByNutrientsHandler,
  getFilteredRecipesHandler
} from "./recipes.handlers.js";

const router = express.Router();

router.get("/", getRecipesHandler);
router.get("/filter", getFilteredRecipesHandler);
router.get("/by-ingredients", getRecipesByIngredientsHandler);
router.get("/by-nutrients", getRecipesByNutrientsHandler);
router.get("/:id", getRecipeByIdHandler);

export default router;