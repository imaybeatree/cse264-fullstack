const BASE_URL = "https://api.spoonacular.com/recipes";
import { prisma } from "../db/db.js";

const mapping = {
  vegetarian: { type: "diet", value: "vegetarian" },
  vegan: { type: "diet", value: "vegan" },
  glutenFree: { type: "diet", value: "gluten free" },
  dairyFree: { type: "diet", value: "dairy free" },
  // nutrition
  lowCalorie: { type: "nutrition", param: "maxCalories", value: "400" },
  highProtein: { type: "nutrition", param: "minProtein", value: "20" },
};

// allergen mapping
const allergenMapping = {
  Peanuts: "peanut",
  "Tree Nuts": "tree nut",
  Shellfish: "shellfish",
  Gluten: "gluten",
  Dairy: "dairy",
  Egg: "egg",
  Soy: "soy",
  Sesame: "sesame",
};

// epic 1: general search/suggested recipes
export async function getRecipesHandler(req, res) {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  const { query, diet, type, maxReadyTime, maxIngredients, offset } = req.query;

  // fetch user preferences from db
  const userId = res.locals.user?.userId;
  let userPreferences = { diet: [], intolerances: [], nutritionParams: [] };

  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { preferences: true, allergies: true, ingredients: true }
    });

    if (user) {
      const dietList = [];
      const nutritionParams = [];

      // build diet and nutrition from preferences object
      if (user.preferences) {
        Object.entries(user.preferences).forEach(([key, val]) => {
          if (!val) return;
          const mapped = mapping[key];
          if (!mapped) return;
          if (mapped.type === "diet") dietList.push(mapped.value);
          if (mapped.type === "nutrition") nutritionParams.push({ param: mapped.param, value: mapped.value });
        });
      }

      // map allergens to spoonacular intolerances
      const intoleranceList = (user.allergies || [])
        .map(a => allergenMapping[a])
        .filter(Boolean);

      userPreferences = { diet: dietList, intolerances: intoleranceList, nutritionParams };
    }
  }

  const params = new URLSearchParams({
    apiKey,
    number: 18,
    addRecipeNutrition: true,
    addRecipeInformation: true
  });

  if (query) params.append("query", query);
  if (type) params.append("type", type);
  if (maxReadyTime) params.append("maxReadyTime", maxReadyTime);
  if (maxIngredients) params.append("maxIngredients", maxIngredients);
  if (offset) params.append("offset", offset);

  // apply manual filters from frontend, override user prefs if needed
  if (diet) {
    params.append("diet", diet);
  } else if (userPreferences.diet.length) {
    params.append("diet", userPreferences.diet.join(","));
  }

  // allergies aka intolerances
  if (userPreferences.intolerances.length) {
    params.append("intolerances", userPreferences.intolerances.join(","));
  }

  // nutrition filters from preferences
  userPreferences.nutritionParams.forEach(({ param, value }) => {
    params.append(param, value);
  });

  params.append("sort", "popularity");
  params.append("sortDirection", "desc");

  try {
    const response = await fetch(`${BASE_URL}/complexSearch?${params}`);
    const data = await response.json();
    res.json(data.results ?? []); // if undefined send an empty array
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recipes" });
  }
}

// epic 2: search by ingredients
export async function getRecipesByIngredientsHandler(req, res) {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  const { ingredients } = req.query;
  try {
    const response = await fetch(
      `${BASE_URL}/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}&number=10`
    );
    const data = await response.json();
    console.log("spoonacular response:", data);
    res.json(data.results);
  } catch (error) {
    res.status(500).json({ message: "Failed to find recipes by ingredients" });
  }
}

// epic 6: search by nutrients
export async function getRecipesByNutrientsHandler(req, res) {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  const { minCalories, maxCalories } = req.query;
  try {
    const response = await fetch(
      `${BASE_URL}/complexSearch?apiKey=${apiKey}&minCalories=${minCalories}&maxCalories=${maxCalories}&addRecipeNutrition=true&number=10`
    );
    const data = await response.json();
    res.json(data.results);
  } catch (error) {
    res.status(500).json({ message: "Failed to find recipes by nutrients" });
  }
}

// epic 3: advanced filtering (diet, intolerances, nutrition, ingredients)
export async function getFilteredRecipesHandler(req, res) {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  const {
    diet, intolerances, includeCuisine, excludeCuisine,
    includeIngredients, excludeIngredients,
    minCarbs, maxCarbs, minProtein, maxProtein,
    minCalories, maxCalories, minFat, maxFat,
  } = req.query;

  // build params dynamically - only include what was provided
  const params = new URLSearchParams({ apiKey, number: 10, addRecipeNutrition: true });

  if (diet) params.append("diet", diet);
  if (intolerances) params.append("intolerances", intolerances);
  if (includeCuisine) params.append("includeCuisine", includeCuisine);
  if (excludeCuisine) params.append("excludeCuisine", excludeCuisine);
  if (includeIngredients) params.append("includeIngredients", includeIngredients);
  if (excludeIngredients) params.append("excludeIngredients", excludeIngredients);
  if (minCarbs) params.append("minCarbs", minCarbs);
  if (maxCarbs) params.append("maxCarbs", maxCarbs);
  if (minProtein) params.append("minProtein", minProtein);
  if (maxProtein) params.append("maxProtein", maxProtein);
  if (minCalories) params.append("minCalories", minCalories);
  if (maxCalories) params.append("maxCalories", maxCalories);
  if (minFat) params.append("minFat", minFat);
  if (maxFat) params.append("maxFat", maxFat);

  try {
    const response = await fetch(`${BASE_URL}/complexSearch?${params}`);
    const data = await response.json();
    res.json(data.results);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch filtered recipes" });
  }
}

// epic 7: get single recipe details
export async function getRecipeByIdHandler(req, res) {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  const { id } = req.params;
  try {
    const response = await fetch(
      `${BASE_URL}/${id}/information?apiKey=${apiKey}&addRecipeNutrition=true`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recipe details" });
  }
}

// see similar recipes
export async function getSimilarRecipesHandler(req, res) {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  const { id } = req.params;
  try {
    const response = await fetch(
      `${BASE_URL}/${id}/similar?apiKey=${apiKey}&number=6`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch similar recipes" });
  }
}