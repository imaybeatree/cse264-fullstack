// HomePage.jsx
import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import "../css/HomePage.css";
import Navbar from './Navbar';

export default function HomePage() {
//   const [recipes, setRecipes] = useState([]);  // empty until API responds
//   const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

//   useEffect(() => {
//     fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeNutrition=true&number=10`)
//       .then(res => res.json())
//       .then(data => {
//             console.log(data);  // keep this for now
//             setRecipes(data.results || []);  // fallback to empty array if undefined
//         });
//   }, []);  // empty [] means "run once when page loads"

//   console.log("key:", import.meta.env.VITE_SPOONACULAR_API_KEY);

const recipes = [
// hard coding recipes because api link doesn't work yet
  { id: 1, title: "Chicken Fried Rice", image: "https://placehold.co/300x200", readyInMinutes: 20, pricePerServing: 350, calories: 480 },
  { id: 2, title: "Pasta Aglio e Olio", image: "https://placehold.co/300x200", readyInMinutes: 15, pricePerServing: 200, calories: 390 },
  { id: 3, title: "Egg Toast",          image: "https://placehold.co/300x200", readyInMinutes: 5,  pricePerServing: 100, calories: 210 },
  { id: 4, title: "Ramen",              image: "https://placehold.co/300x200", readyInMinutes: 10, pricePerServing: 150, calories: 520 },
];
  return (
  <div className="home-container">
    {/* Navbar link */}
     <Navbar />
    {/* Search Bar */}
    <div className="search-bar">
    <input className="search-input" type="text" placeholder="Search recipes..." />
    <button className="search-button">Search</button>
    </div>
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