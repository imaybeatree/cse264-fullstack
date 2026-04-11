// HomePage.jsx
import { useState, useEffect } from 'react';
import RecipeCard from '../../components/RecipeCard';
import "@/css/HomePage.css";
import Navbar from './Navbar';
import { http } from '../../lib/http';
import SearchBar from './SearchBar';

export default function HomePage() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
    // fetch recipes
        http().get("/api/recipes")
            .then(res => res.json())
            .then(data => setRecipes(data || []));
    }, []);

    // fetches data for search
    function fetchRecipes({ query, filters }) {
      const params = new URLSearchParams();

      if (query) params.append("query", query);
      if (filters?.diet?.length) params.append("diet", filters.diet.join(","));
      if (filters?.mealType?.length) params.append("type", filters.mealType.join(","));

      fetch(`/api/recipes?${params}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
        .then(res => res.json())
        .then(data => setRecipes(data || []));
  }

  return (
  <div className="home-container">
    {/* Navbar link */}
     <Navbar />
    {/* Search Bar */}
    {/* <div className="search-bar">
    <input className="search-input" type="text" placeholder="Search recipes..." />
    <button className="search-button">Search</button>
    </div> */}
    <SearchBar onSearch={fetchRecipes} />
     {/* Welcome Section */}
    <div className="welcome-section">
      <h1 className="welcome-title">Welcome back! 👋</h1>
      <p className="welcome-subtitle">What are you cooking today?</p>
    </div>
    {/* Suggested recipes  */}
    <h2 className="home-title">Suggested Recipes</h2>
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id}
            name={recipe.title}
            image={recipe.image}
            time={recipe.readyInMinutes}
            cost={recipe.pricePerServing / 100}
            calories={recipe.calories}
            onSave={() => console.log("save", recipe.id)} />
      ))}
    </div>
  </div>
);
}