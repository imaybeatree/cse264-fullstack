import { useState, useEffect } from "react";
import { http } from "../lib/http";
import RecipeCard from "./RecipeCard";
import "../css/SavedRecipe.css"

// pass saved recipes and onUnsave
export default function SavedRecipe({ savedRecipes, onUnsave }) {
  const [index, setIndex] = useState(0);
  const VISIBLE = 3; // how many cards to show at once

  // go back in carousel
  function handlePrev() {
    setIndex((prev) => Math.max(0, prev - 1));
  }

  // go forward on carousel
  function handleNext() {
    setIndex((prev) => Math.min(savedRecipes.length - VISIBLE, prev + 1));
  }

  const visible = savedRecipes.slice(index, index + VISIBLE);

  if (savedRecipes.length === 0) {
    return (
      <div className="saved-section">
        <h2>Saved Recipes</h2>
        <p>You haven't saved any recipes yet. Save recipes to find them here later.</p>
      </div>
    );
  }

  console.log("savedRecipes in SavedRecipe:", savedRecipes);
  return (
    <div className="saved-section">
    <div className="saved-header">
        <h2>Saved Recipes</h2>
        <span className="saved-count">{savedRecipes.length} saved</span>
    </div>

    <div className="saved-carousel-shell">
        <button
        className="carousel-btn"
        onClick={handlePrev}
        disabled={index === 0}
        >
        ←
        </button>

        <div className="carousel-track">
        {visible.map((recipe) => (
            <div className="saved-card-wrap" key={recipe.id}>
            <RecipeCard
                id={recipe.recipeId}
                name={recipe.title}
                image={recipe.image}
                time={recipe.readyInMinutes}
                cost={recipe.pricePerServing / 100}
                calories={recipe.calories}
                isSaved={true}
                onSave={() => onUnsave(recipe.recipeId)}
            />
            </div>
        ))}
        </div>

        <button
        className="carousel-btn"
        onClick={handleNext}
        disabled={index >= savedRecipes.length - VISIBLE}
        >
        →
        </button>
    </div>
    </div>
  );
}