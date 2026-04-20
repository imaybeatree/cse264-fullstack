import { prisma } from "../db/db.js";

export async function getUserByName(username){

    const user = await prisma.user.findUnique({
    where: { username: `${username.toLowerCase()}` },
    });
}

// get saved recipes
export async function getSavedRecipesHandler(req, res) {
  const userId = res.locals.user.userId;
  try {
    const saved = await prisma.savedRecipe.findMany({ where: { userId } });
    res.json(saved);
  } catch (error) {
    console.error("GET saved recipes error:", error);
    res.status(500).json({ message: "Failed to fetch saved recipes" });
  }
}

// save a recipe
export async function saveRecipeHandler(req, res) {
  const userId = res.locals.user.userId;
  const { id, title, image, readyInMinutes, pricePerServing } = req.body;
  try {
    const existing = await prisma.savedRecipe.findUnique({
      where: { userId_recipeId: { userId, recipeId: id } },
    });
    if (existing) return res.status(409).json({ message: "Already saved" });

    const saved = await prisma.savedRecipe.create({
      data: { userId, recipeId: id, title, image, readyInMinutes, pricePerServing },
    });
    res.status(201).json(saved);
  } catch (error) {
    console.error("POST saved recipe error:", error);
    res.status(500).json({ message: "Failed to save recipe" });
  }
}

// unsave a recipe
export async function unsaveRecipeHandler(req, res) {
  const userId = res.locals.user.userId;
  const recipeId = parseInt(req.params.id);
  try {
    await prisma.savedRecipe.delete({
      where: { userId_recipeId: { userId, recipeId } },
    });
    res.json({ message: "Recipe unsaved" });
  } catch (error) {
    res.status(500).json({ message: "Failed to unsave recipe" });
  }
}