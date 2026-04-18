// HomePage.jsx
import { useState, useEffect } from 'react';
import RecipeCard from '../../components/RecipeCard';
import "@/css/HomePage.css";
import Navbar from './Navbar';
import { http } from '../../lib/http';
import SearchBar from '../../components/SearchBar';

export default function HomePage() {
    const [recipes, setRecipes] = useState([]);
    // boolean to check if searched
    const [hasSearched, setHasSearched] = useState(false);
    // to offset recipes
    const [offset, setOffset] = useState(0);
    const [currentSearch, setCurrentSearch] = useState({ query: "", filters: {} })
    // error handling
    const [message, setMessage] = useState("");

    useEffect(() => {
      loadRecipes({ query: "", filters: {} }, 0);
    }, []);

    // fetches data for search
    function loadRecipes( searchData, pageOffset) {
      // if (searchData.query) setHasSearched(true);
      // else setHasSearched(false);
      
      const params = new URLSearchParams();
      const convenience = searchData.filters?.convenience || [];


      if (searchData.query) params.append("query", searchData.query);
      // meal type e.g: breakfast, lunch, dinner
      if (searchData.filters?.mealType?.length) params.append("type", searchData.filters.mealType.join(","));
      // time
      if (searchData.filters?.time?.includes("Under 15 min")) params.append("maxReadyTime", "15");
      else if (searchData.filters?.time?.includes("Under 30 min")) params.append("maxReadyTime", "30");
      else if (searchData.filters?.time?.includes("Under 1 hour")) params.append("maxReadyTime", "60");
     // 5 ingredients
      if (convenience.includes("5 ingredients or less")) params.append("maxIngredients", "5");
      // Microwave
      if (convenience.includes("Microwave only")) params.append("equipment", "microwave");
      // Easy (we’ll define this)
      if (convenience.includes("Easy")) params.append("maxReadyTime", "30"); // or 20 if you want stricter
      // nutrition
       if (searchData.filters?.nutrition?.includes("High protein")) params.append("minProtein", "20");
       if (searchData.filters?.nutrition?.includes("High fiber")) params.append("minFiber", "10");
       if (searchData.filters?.nutrition?.includes("Low carbs")) params.append("maxCarbs", "60");
      if (searchData.filters?.nutrition?.includes("Low calorie")) params.append("maxCalories", "400");

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

 
  // handles search data
  function handleSearch(searchData) {
    setOffset(0);  // reset on new search
    setCurrentSearch(searchData);
    setHasSearched(true);
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
    {!hasSearched && (
      <div className="saved-section">
        <h2>Saved Recipes</h2>
        <p>You haven’t saved any recipes yet. Save recipes to find them here later.</p>
      </div>
    )}
   
    
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
            onSave={() => console.log("save", recipe.id)} />
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