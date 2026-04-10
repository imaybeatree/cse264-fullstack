import { useState } from "react";
import "@/css/auth.css";

export default function OnboardingPage() {
  const [preferences, setPreferences] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    nutFree: false,
    highProtein: false,
    lowCalorie: false,
  });

  const [allergies, setAllergies] = useState("");
  const [ingredients, setIngredients] = useState("");

  function handleCheckboxChange(e) {
    const { name, checked } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: checked,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      preferences,
      allergies,
      ingredients,
    };

    console.log("Onboarding preferences:", formData);
    alert("Preferences saved locally for demo/testing.");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Set Your Food Preferences</h1>
        <p className="auth-subtitle">
          Help QuickBites personalize your recipe recommendations.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-section">
            <h3>Dietary Preferences</h3>

            <label>
              <input
                type="checkbox"
                name="vegetarian"
                checked={preferences.vegetarian}
                onChange={handleCheckboxChange}
              />
              Vegetarian
            </label>

            <label>
              <input
                type="checkbox"
                name="vegan"
                checked={preferences.vegan}
                onChange={handleCheckboxChange}
              />
              Vegan
            </label>

            <label>
              <input
                type="checkbox"
                name="glutenFree"
                checked={preferences.glutenFree}
                onChange={handleCheckboxChange}
              />
              Gluten-Free
            </label>

            <label>
              <input
                type="checkbox"
                name="dairyFree"
                checked={preferences.dairyFree}
                onChange={handleCheckboxChange}
              />
              Dairy-Free
            </label>

            <label>
              <input
                type="checkbox"
                name="nutFree"
                checked={preferences.nutFree}
                onChange={handleCheckboxChange}
              />
              Nut-Free
            </label>
          </div>

          <div className="form-section">
            <h3>Nutrition Goals</h3>

            <label>
              <input
                type="checkbox"
                name="highProtein"
                checked={preferences.highProtein}
                onChange={handleCheckboxChange}
              />
              High Protein
            </label>

            <label>
              <input
                type="checkbox"
                name="lowCalorie"
                checked={preferences.lowCalorie}
                onChange={handleCheckboxChange}
              />
              Low Calorie
            </label>
          </div>

          <div className="form-section">
            <h3>Allergies or Ingredients to Avoid</h3>
            <input
              type="text"
              placeholder="Ex: peanuts, shellfish"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
            />
          </div>

          <div className="form-section">
            <h3>Ingredients You Usually Have</h3>
            <input
              type="text"
              placeholder="Ex: rice, eggs, chicken"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary auth-submit">
            Save Preferences
          </button>
        </form>
      </div>
    </div>
  );
}