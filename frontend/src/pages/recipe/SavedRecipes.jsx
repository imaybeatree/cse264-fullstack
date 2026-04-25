import { useState, useEffect } from "react";
import { http } from "../../lib/http";
import Navbar from "../home/Navbar";
import RecipeCard from "../../components/RecipeCard";
import "@/css/SavedRecipes.css";

export default function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    http()
      .get("/api/user/saved-recipes")
      .then((res) => res.json())
      .then((data) => {
        setSavedRecipes(data || []);
        if (!data || data.length === 0) {
          setMessage("You haven't saved any recipes yet.");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch saved recipes:", err);
        setMessage("Something went wrong. Please try again.");
      });
  }, []);

  function handleUnsave(recipeId) {
    // remove immediately
    setSavedRecipes((prev) => {
      const updated = prev.filter((r) => r.recipeId !== recipeId); // compare recipeId to recipeId
      if (updated.length === 0) setMessage("You haven't saved any recipes yet."); // check updated length
      return updated;
    });

    http()
      .delete(`/api/user/saved-recipes/${recipeId}`)
      .catch((err) => {
      console.error("Failed to unsave recipe:", err);
      // revert on failure by re-fetching
      http().get("/api/user/saved-recipes")
        .then((res) => res.json())
        .then((data) => setSavedRecipes(data || []));
      });
  }

  return (
   <div className="saved-page">
      <Navbar />

      <div className="saved-page-inner">
        <section className="saved-hero">
          <div>
            <h1 className="saved-page-title">Saved Recipes</h1>
            <p className="saved-page-subtitle">
              All your saved meals in one place.
            </p>
          </div>

          <div className="saved-count-pill">
            {savedRecipes.length} saved
          </div>
        </section>

        <section className="saved-content-card">
          {message && savedRecipes.length === 0 ? (
            <div className="saved-empty-state">
              <h2>No saved recipes yet</h2>
              <p>{message}</p>
            </div>
          ) : (
            <div className="saved-grid">
              {savedRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  id={recipe.recipeId}
                  name={recipe.title}
                  image={recipe.image}
                  time={recipe.readyInMinutes}
                  cost={recipe.pricePerServing / 100}
                  calories={recipe.calories}
                  isSaved={true}
                  onSave={() => handleUnsave(recipe.recipeId)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}