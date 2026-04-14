const BASE_URL = "https://api.spoonacular.com/recipes";

// epic 1: general search/suggested recipes
export async function getRecipesHandler(req, res) {
    const apiKey = process.env.SPOONACULAR_API_KEY;
    const { query, diet, type, maxReadyTime, maxIngredients, offset } = req.query;
    //console.log("handler called");
    //console.log("api key:", process.env.SPOONACULAR_API_KEY);

     const params = new URLSearchParams({
        apiKey,
        number: 18,
        addRecipeNutrition: false,
        addRecipeInformation: true
    });


    if (query) params.append("query", query);
    if (diet) params.append("diet", diet);
    if (type) params.append("type", type);
    if (maxReadyTime) params.append("maxReadyTime", maxReadyTime);
    if (maxIngredients) params.append("maxIngredients", maxIngredients);
    if (offset) params.append("offset", offset);
    params.append("sort", "popularity");
    params.append("sortDirection", "desc");

    try {
        const response = await fetch(
        `${BASE_URL}/complexSearch?${params}`
        );
        const data = await response.json();
        //console.log("spoonacular data:", JSON.stringify(data).slice(0, 200));
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
        `${BASE_URL}//complexSearch?apiKey=${apiKey}&minProtein=${minProtein}&maxCalories=${maxCalories}&addRecipeNutrition=true&number=10`
        );
        const data = await response.json();
        // console.log("spoonacular response:", data);
        res.json(data.results);
    } catch (error) {
        res.status(500).json({ message: "Failed to find recipes by nutrients" });
    }
}

// epic 3: advanced filtering (diet, intolerances, nutrition, ingredients)
export async function getFilteredRecipesHandler(req, res) {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  const {
    diet,
    intolerances,
    includeCuisine,
    excludeCuisine,
    includeIngredients,
    excludeIngredients,
    minCarbs, maxCarbs,
    minProtein, maxProtein,
    minCalories, maxCalories,
    minFat, maxFat,
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
        // console.log("spoonacular response:", data);
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