export async function getRecipesHandler(req, res) {
    const apiKey = process.env.SPOONACULAR_API_KEY;
    console.log("handler called");
    console.log("api key:", process.env.SPOONACULAR_API_KEY);

    try {
        const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeNutrition=true&addRecipeInformation=true&number=10`
        );
        const data = await response.json();
        console.log("spoonacular response:", data);
        res.json(data.results);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch recipes" });
    }
}