// HomePage.jsx
import { useState, useEffect } from 'react';
import RecipeCard from '../../components/RecipeCard';
import "@/css/HomePage.css";
import Navbar from './Navbar';
import { http } from '../../lib/http';
import SearchBar from '../../components/SearchBar';
import SavedRecipe from "../../components/SavedRecipe";

export default function HomePage() {
    const [recipes, setRecipes] = useState([]);
    // boolean to check if searched
    const [hasSearched, setHasSearched] = useState(false);
    // to offset recipes
    const [offset, setOffset] = useState(0);
    const [currentSearch, setCurrentSearch] = useState({ query: "", filters: {} })
    // error handling
    const [message, setMessage] = useState("");
    // saved recipe
    const [savedIds, setSavedIds] = useState(new Set());
    const [savedRecipes, setSavedRecipes] = useState([]);

    useEffect(() => {
      loadRecipes({ query: "", filters: {} }, 0);
    }, []);

    // fetches data for search
    function loadRecipes( searchData, pageOffset) {
      if (searchData.query) setHasSearched(true);
      else setHasSearched(false);
      const params = new URLSearchParams();

      if (searchData.query) params.append("query", searchData.query);
      if (searchData.filters?.diet?.length) params.append("diet", searchData.filters.diet.join(","));
      if (searchData.filters?.mealType?.length) params.append("type", searchData.filters.mealType.join(","));
      if (searchData.filters?.difficulty?.includes("Under 15 min")) params.append("maxReadyTime", "15");
      else if (searchData.filters?.difficulty?.includes("Under 30 min")) params.append("maxReadyTime", "30");
      else if (searchData.filters?.difficulty?.includes("Under 1 hour")) params.append("maxReadyTime", "60");
      if (searchData.filters?.difficulty?.includes("5 ingredients or less")) params.append("maxIngredients", "5");

      // creating offset to only show 20 recipes
       params.append("offset", pageOffset);

      http().get(`/api/recipes?${params}`)
        .then(res => res.json())
        .then(data => {
          setRecipes(data || []);

          if (!data || data.length === 0) {
            setMessage("No recipes found.");
          } else {
            setMessage("");
          }
        })
      .catch(err => {
          console.log("error:", err);
          setRecipes([]); // set empty so page doesnt crash
          setMessage("Something went wrong. Please try again.");
      });
  }

  // fetch saved recipes on load to know which are already saved
  useEffect(() => {
    http().get("/api/user/saved-recipes")
      .then(res => res.json())
       .then(data => {
          const saved = data || [];
          setSavedIds(new Set(saved.map(r => r.recipeId)));
          setSavedRecipes(saved);
        })
      .catch(err => console.error("Failed to fetch saved:", err));
  }, []);

  // save recipe
  function handleSave(recipe) {
    // if already saved handle unsave
    if (savedIds.has(recipe.id)) {
      handleUnsave(recipe.id);
      return;
    }

    http().post("/api/user/saved-recipes", {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      readyInMinutes: recipe.readyInMinutes,
      pricePerServing: recipe.pricePerServing,
    })
      .then(res => res.json())
      .then(savedRecipe => {
         console.log("savedRecipe from backend:", savedRecipe);
        setSavedIds(prev => new Set(prev).add(recipe.id));
        setSavedRecipes(prev => [savedRecipe, ...prev]);
      })
      .catch(err => console.error("Failed to save:", err));
  }

  // unsaves recipe
   function handleUnsave(recipeId) {
    http().delete(`/api/user/saved-recipes/${recipeId}`)
      .then(() => {
        setSavedIds(prev => {
          const next = new Set(prev);
          next.delete(recipeId);
          return next;
        });

        setSavedRecipes(prev =>
          prev.filter(r => r.recipeId !== recipeId)
        );
      })
      .catch(err => console.error("Failed to unsave:", err));
  }

  // helper function to check if recipe is saved
  function isRecipeSaved(recipeId) {
    return savedIds.has(recipeId);
  }

  // handles search data
  function handleSearch(searchData) {
    setOffset(0);  // reset on new search
    setCurrentSearch(searchData);
    loadRecipes(searchData, 0);
  }

  // takes to previous page
  function handlePrev() {
    const newOffset = Math.max(0, offset - 18);
    setOffset(newOffset);
    loadRecipes(currentSearch, newOffset);
  }

  // takes to next page
  function handleNext() {
    const newOffset = offset + 18;
    setOffset(newOffset);
    loadRecipes(currentSearch, newOffset);
  }

  return (
  <div className="home-container">
    {/* Navbar link */}
     <Navbar />
     {/* Welcome Section */}
    {!hasSearched && (
      <div className="welcome-section">
        <h1 className="welcome-title">Welcome back! 👋</h1>
        <p className="welcome-subtitle">What are you cooking today?</p>
      </div>
    )}
     {/* Search Bar */}
    <SearchBar onSearch={handleSearch} />
    {/* saved recipes */}
    {/* <div className="saved-section">
      <h2>Saved Recipes</h2>
      <p>You haven’t saved any recipes yet. Save recipes to find them here later.</p>
    </div> */}
    {/* {!hasSearched && ( */}
      <SavedRecipe 
        savedRecipes={savedRecipes}
        onUnsave={handleUnsave}/>
        {/* )} */}
    {/* Suggested recipes  */}
    <h2 className="home-title">Suggested Recipes</h2>
    <div className="message"> {message && <p className="search-message">{message}</p>} </div>
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id}
            id={recipe.id} 
            name={recipe.title}
            image={recipe.image}
            time={recipe.readyInMinutes}
            cost={recipe.pricePerServing / 100}
            calories={recipe.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount}
            isSaved={savedIds.has(recipe.id)}
            onSave={() => handleSave(recipe)} />
      ))}
    </div>
    {recipes.length > 0 && (
        <div className="pagination">
          <button onClick={handlePrev} disabled={offset === 0}>←</button>
          <span>Page {Math.floor(offset / 20) + 1}</span>
          <button onClick={handleNext} disabled={recipes.length < 18}>→</button>
        </div>
    )}
  </div>
);
}