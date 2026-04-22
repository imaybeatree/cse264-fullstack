import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { http } from '../../lib/http';
import '../../css/RecipeDetailPage.css';

export default function RecipeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
const [similar, setSimilar] = useState([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
     // fetch recipe details
    http().get(`/api/recipes/${id}`)
        .then(res => res.json())
        .then(data => setRecipe(data))
        .catch(err => console.log("error:", err));

    // fetch similar recipes
    http().get(`/api/recipes/${id}/similar`)
      .then(res => res.json())
      .then(data => setSimilar(data || []))
      .catch(err => console.log("similar error:", err));

  }, [id]);

  // check if already saved on load
  useEffect(() => {
    http().get("/api/user/saved-recipes")
      .then(res => res.json())
      .then(data => {
        const isSaved = data.some(r => r.recipeId === parseInt(id));
        setSaved(isSaved);
      })
      .catch(err => console.error("Failed to check saved:", err));
  }, [id]);

  function handleSave() {
    if (saved) {
      // unsave
      http().delete(`/api/user/saved-recipes/${id}`)
        .then(() => setSaved(false))
        .catch(err => console.error("Failed to unsave:", err));
    } else {
      // save
      http().post("/api/user/saved-recipes", {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        pricePerServing: recipe.pricePerServing,
      })
        .then(() => setSaved(true))
        .catch(err => console.error("Failed to save:", err));
    }
  }

  if (!recipe) return <p className="loading">Loading...</p>;

  return (
    <div className="detail-page">
      <div className="detail-container">

        {/* Back button */}
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

        {/* Hero */}
        <div className="detail-hero">
          <img src={recipe.image} alt={recipe.title} className="detail-image" />
          <div className="detail-hero-info">
            <h1 className="detail-title">{recipe.title}</h1>
            <div className="detail-meta">
              <span>{recipe.readyInMinutes} min</span>
              <span>{recipe.servings} servings</span>
              <span>${(recipe.pricePerServing / 100).toFixed(2)} / serving</span>
              <span>Health score: {recipe.healthScore}</span>
            </div>
            <div className="detail-diets">
              {recipe.vegetarian && <span className="diet-tag">Vegetarian</span>}
              {recipe.vegan && <span className="diet-tag">Vegan</span>}
              {recipe.glutenFree && <span className="diet-tag">Gluten Free</span>}
              {recipe.dairyFree && <span className="diet-tag">Dairy Free</span>}
            </div>
            <button className={`save-btn ${saved ? "saved" : ""}`} onClick={handleSave} >
                  {saved ? "✓ Saved" : "Save Recipe"}
            </button>
          </div>
        </div>

        {/* Ingredients */}
        <div className="detail-section">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {recipe.extendedIngredients?.map((ing) => (
              <li key={ing.id}>{ing.original}</li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="detail-section">
          <h2>Instructions</h2>
          {recipe.analyzedInstructions?.length > 0 ? (
            <ol className="steps-list">
              {recipe.analyzedInstructions[0].steps.map((step) => (
                <li key={step.number}>{step.step}</li>
              ))}
            </ol>
          ) : (
            <p>No instructions available.</p>
          )}
        </div>

        {/* Similar Recipes */}
        {similar.length > 0 && (
          <div className="detail-section">
            <h2>Similar Recipes</h2>
            <div className="similar-grid">
              {similar.map((s) => (
                <div
                  key={s.id}
                  className="similar-card"
                  onClick={() => navigate(`/recipe/${s.id}`)}
                >
                  <p className="similar-title">{s.title}</p>
                  <span>{s.readyInMinutes} min</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}