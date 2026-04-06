import express from "express";


import { 
  getRecipesHandler,
  getRecipesByIngredientsHandler,
  getRecipeByIdHandler,
getRecipesByNutrientsHandler
} from "./recipes.handlers.js";

const router = express.Router();

router.get("/", getRecipesHandler);
router.get("/by-ingredients", getRecipesByIngredientsHandler);
router.get("/by-nutrients", getRecipesByNutrientsHandler);
router.get("/:id", getRecipeByIdHandler);

export default router;