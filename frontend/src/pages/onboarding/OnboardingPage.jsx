import { useState } from "react";
import { useNavigate } from "react-router";
import "@/css/auth.css";
import "@/css/onboarding.css";

const dietaryOptions = [
  { key: "vegetarian", label: "Vegetarian" },
  { key: "vegan", label: "Vegan" },
  { key: "glutenFree", label: "Gluten-Free" },
  { key: "dairyFree", label: "Dairy-Free" },
  { key: "nutFree", label: "Nut-Free" },
];

const goalOptions = [
  { key: "highProtein", label: "High Protein" },
  { key: "lowCalorie", label: "Low Calorie" },
];

const commonAllergens = [
  { label: "Peanuts", value: "peanut", image: "peanuts" },
  { label: "Tree Nuts", value: "tree nuts", image: "almonds" },
  { label: "Shellfish", value: "shellfish", image: "shrimp" },
  { label: "Gluten", value: "gluten", image: "flour" },
  { label: "Dairy", value: "dairy", image: "milk" },
  { label: "Egg", value: "egg", image: "egg" },
  { label: "Soy", value: "soy", image: "soy-sauce" },
  { label: "Sesame", value: "sesame", image: "sesame-seeds" },
];

const commonKitchenItems = [
  { label: "Eggs", value: "egg", image: "egg" },
  { label: "Milk", value: "milk", image: "milk" },
  { label: "Butter", value: "butter", image: "butter" },
  { label: "Flour", value: "flour", image: "flour" },
  //{ label: "Sugar", value: "sugar", image: "sugar" },
  { label: "Salt", value: "salt", image: "salt" },
  { label: "Pepper", value: "pepper", image: "black-pepper" },
  { label: "Chicken", value: "chicken", image: "chicken-breast" },
  //{ label: "Rice", value: "rice", image: "rice" },
  { label: "Pasta", value: "pasta", image: "spaghetti" },
  { label: "Cheese", value: "cheese", image: "cheddar-cheese" },
  { label: "Bread", value: "bread", image: "white-bread" },
  { label: "Oil", value: "oil", image: "olive-oil" },
  { label: "Lettuce", value: "lettuce", image: "iceberg-lettuce" },
];

function formatLabel(value) {
  if (!value) return "";
  return value
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatValue(value) {
  return value.trim().toLowerCase();
}

function getIngredientImage(name) {
  const formatted = name.toLowerCase().trim().replace(/\s+/g, "-");
  return `https://spoonacular.com/cdn/ingredients_100x100/${formatted}.jpg`;
}

function IngredientChip({ item, onRemove }) {
  return (
    <div className="ingredient-chip">
      <img
        src={getIngredientImage(item.image)}
        alt={item.label}
        className="ingredient-chip-image"
        onError={(e) => {
          e.currentTarget.src =
            "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg";
        }}
      />
      <span className="ingredient-chip-label">{item.label}</span>
      <button
        type="button"
        className="ingredient-chip-remove"
        onClick={() => onRemove(item.value)}
        aria-label={`Remove ${item.label}`}
      >
        ×
      </button>
    </div>
  );
}

export default function OnboardingPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [preferences, setPreferences] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    nutFree: false,
    highProtein: false,
    lowCalorie: false,
  });

  const [allergyInput, setAllergyInput] = useState("");
  const [ingredientInput, setIngredientInput] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [saved, setSaved] = useState(false);

  function handleCheckboxChange(e) {
    const { name, checked } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: checked,
    }));
  }

  function toggleAllergy(item) {
    setAllergies((prev) => {
      const exists = prev.some((allergy) => allergy.value === item.value);

      if (exists) {
        return prev.filter((allergy) => allergy.value !== item.value);
      }

      return [...prev, item];
    });

    setAllergyInput("");
  }

  function toggleIngredient(item) {
    setIngredients((prev) => {
      const exists = prev.some((ingredient) => ingredient.value === item.value);

      if (exists) {
        return prev.filter((ingredient) => ingredient.value !== item.value);
      }

      return [...prev, item];
    });

    setIngredientInput("");
  }

  function addCustomAllergy(value) {
    const formatted = formatValue(value);
    if (!formatted) return;

    const item = {
      label: formatLabel(formatted),
      value: formatted,
      image: formatted.replace(/\s+/g, "-"),
    };

    setAllergies((prev) => {
      if (prev.some((allergy) => allergy.value === item.value)) {
        return prev;
      }
      return [...prev, item];
    });

    setAllergyInput("");
  }

  function addIngredient(value) {
    const formatted = formatValue(value);
    if (!formatted) return;

    const item = {
      label: formatLabel(formatted),
      value: formatted,
      image: formatted.replace(/\s+/g, "-"),
    };

    setIngredients((prev) => {
      if (prev.some((ingredient) => ingredient.value === item.value)) {
        return prev;
      }
      return [...prev, item];
    });

    setIngredientInput("");
  }

  function handleAllergyKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addCustomAllergy(allergyInput);
    }
  }

  function handleIngredientKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addIngredient(ingredientInput);
    }
  }

  function removeAllergy(value) {
    setAllergies((prev) => prev.filter((item) => item.value !== value));
  }

  function removeIngredient(value) {
    setIngredients((prev) => prev.filter((item) => item.value !== value));
  }

  function handleNext() {
    if (step < 3) setStep((prev) => prev + 1);
  }

  function handleBack() {
    if (step > 1) setStep((prev) => prev - 1);
  }

  function handleSkip() {
    navigate("/home");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (step !== 3) return;

    const formData = {
      preferences,
      allergies,
      ingredients,
    };

    console.log("Onboarding preferences:", formData);
    setSaved(true);

    setTimeout(() => {
      navigate("/home");
    }, 800);
  }

  return (
    <div className="onboarding-page">
      <div className="onboarding-card">
        <div className="onboarding-header">
          <p className="onboarding-step">Step {step} of 3</p>
          <h1 className="onboarding-title">Tell us what you like</h1>
          <p className="onboarding-subtitle">
            QuickBites will personalize recipes based on your preferences,
            ingredients to avoid, and the foods you usually keep around.
          </p>

          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="onboarding-form">
          {step === 1 && (
            <>
              <section className="onboarding-section">
                <h2>Dietary Preferences</h2>
                <p>Select any preferences you want us to keep in mind.</p>

                <div className="option-grid">
                  {dietaryOptions.map((option) => (
                    <label key={option.key} className="option-card">
                      <input
                        type="checkbox"
                        name={option.key}
                        checked={preferences[option.key]}
                        onChange={handleCheckboxChange}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </section>

              <section className="onboarding-section">
                <h2>Nutrition Goals</h2>
                <p>
                  These help us prioritize the kinds of recipes you want to see.
                </p>

                <div className="option-grid">
                  {goalOptions.map((option) => (
                    <label key={option.key} className="option-card">
                      <input
                        type="checkbox"
                        name={option.key}
                        checked={preferences[option.key]}
                        onChange={handleCheckboxChange}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </section>
            </>
          )}

          {step === 2 && (
            <section className="onboarding-section">
              <h2>Allergies or Ingredients to Avoid</h2>
              <p>
                Search and press Enter to add items, or select from common
                allergens below.
              </p>

              <div className="ingredient-search-row">
                <input
                  type="text"
                  placeholder="Search allergens to avoid"
                  value={allergyInput}
                  onChange={(e) => setAllergyInput(e.target.value)}
                  onKeyDown={handleAllergyKeyDown}
                />
                <button
                  type="button"
                  className="add-chip-btn"
                  onClick={() => addCustomAllergy(allergyInput)}
                >
                  Add
                </button>
              </div>

              <div className="quick-pick-section">
                <h3>Common Allergens</h3>
                <div className="allergen-grid">
                  {commonAllergens.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      className={`allergen-card ${
                        allergies.some(
                          (allergy) => allergy.value === item.value
                        )
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => toggleAllergy(item)}
                    >
                      <img
                        src={getIngredientImage(item.image)}
                        alt={item.label}
                        className="allergen-card-image"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg";
                        }}
                      />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {allergies.length > 0 && (
                <div className="ingredient-chip-list">
                  {allergies.map((item) => (
                    <IngredientChip
                      key={item.value}
                      item={item}
                      onRemove={removeAllergy}
                    />
                  ))}
                </div>
              )}
            </section>
          )}

          {step === 3 && (
            <section className="onboarding-section">
              <h2>Ingredients You Usually Have</h2>
              <p>
                Search and add common ingredients so we can recommend more useful
                recipes based on what you already keep at home.
              </p>

              <div className="ingredient-search-row">
                <input
                  type="text"
                  placeholder="Search ingredients you usually keep at home"
                  value={ingredientInput}
                  onChange={(e) => setIngredientInput(e.target.value)}
                  onKeyDown={handleIngredientKeyDown}
                />
                <button
                  type="button"
                  className="add-chip-btn"
                  onClick={() => addIngredient(ingredientInput)}
                >
                  Add
                </button>
              </div>

              <div className="quick-pick-section">
                <h3>Common Kitchen Staples</h3>
                <div className="allergen-grid">
                  {commonKitchenItems.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      className={`allergen-card ${
                        ingredients.some(
                          (ingredient) => ingredient.value === item.value
                        )
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => toggleIngredient(item)}
                    >
                      <img
                        src={getIngredientImage(item.image)}
                        alt={item.label}
                        className="allergen-card-image"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg";
                        }}
                      />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {ingredients.length > 0 && (
                <div className="ingredient-chip-list">
                  {ingredients.map((item) => (
                    <IngredientChip
                      key={item.value}
                      item={item}
                      onRemove={removeIngredient}
                    />
                  ))}
                </div>
              )}
            </section>
          )}

          {saved && (
            <p className="success-message">
              Preferences saved locally for demo/testing.
            </p>
          )}

          <div className="onboarding-actions">
            <div className="onboarding-actions-left">
              {step > 1 && (
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={handleBack}
                >
                  Back
                </button>
              )}
            </div>

            <div className="onboarding-actions-right">
              <button
                type="button"
                className="secondary-btn"
                onClick={handleSkip}
              >
                Skip for Now
              </button>

              {step < 3 ? (
                <button
                  type="button"
                  className="primary-btn"
                  onClick={handleNext}
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  className="primary-btn"
                  onClick={handleSubmit}
                >
                  Save Preferences
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}