const BASE_URL = "https://api.spoonacular.com/recipes";

// epic 1: general search/suggested recipes
export async function getRecipesHandler(req, res) {
    const apiKey = process.env.SPOONACULAR_API_KEY;
    //console.log("handler called");
    //console.log("api key:", process.env.SPOONACULAR_API_KEY);

    try {
        const response = await fetch(
        `${BASE_URL}/complexSearch?apiKey=${apiKey}&addRecipeNutrition=true&addRecipeInformation=true&number=10`
        );
        const data = await response.json();
        // console.log("spoonacular response:", data);
        res.json(data.results);
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

// epic 7: get single recipe details
export async function getRecipeByIdHandler(req, res) {
    const apiKey = process.env.SPOONACULAR_API_KEY;
    const { id } = req.params;
     try {
        const response = await fetch(
        `${BASE_URL}/${id}/information?apiKey=${apiKey}&addRecipeNutrition=true`
        );
        const data = await response.json();
        console.log("spoonacular response:", data);
        res.json(data.results);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch recipe details" });
    }
}