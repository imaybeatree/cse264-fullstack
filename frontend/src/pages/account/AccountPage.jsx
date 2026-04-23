import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Pencil } from "lucide-react";
import { http } from "../../lib/http";
import Navbar from "../home/Navbar";
import "@/css/onboarding.css";

const preferenceLabels = {
  vegetarian: "Vegetarian",
  vegan: "Vegan",
  glutenFree: "Gluten-Free",
  dairyFree: "Dairy-Free",
  nutFree: "Nut-Free",
  highProtein: "High Protein",
  lowCalorie: "Low Calorie",
};

export default function AccountPage() {
  const navigate = useNavigate();

  function getIngredientImage(name) {
    const formatted = name.toLowerCase().trim().replace(/\s+/g, "-");
    return `https://spoonacular.com/cdn/ingredients_100x100/${formatted}.jpg`;
  }

  function getItemLabel(item) {
    return typeof item === "string" ? item : item.label || item.value || "Item";
  }

  function getItemImage(item) {
    if (typeof item === "string") return item;
    return item.image || item.value || item.label || "apple";
  }

  const [user, setUser] = useState({
    email: "",
    username: "",
    preferences: {},
    allergies: [],
    ingredients: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountMessage, setAccountMessage] = useState("");
  const [accountError, setAccountError] = useState("");
  const [isSavingAccount, setIsSavingAccount] = useState(false);

  const selectedPreferences = Object.entries(preferenceLabels)
    .filter(([key]) => user.preferences?.[key])
    .map(([, label]) => label);
  const hasAnyPreferences =
    selectedPreferences.length > 0 ||
    user.allergies.length > 0 ||
    user.ingredients.length > 0;
  const displayName = user.username || user.email || "Account";
  const profileInitial = displayName.charAt(0).toUpperCase();

  useEffect(() => {
    http()
      .get("/api/user/me")
      .then((res) => res.json())
      .then((data) => {
        setUser({
          email: data.email || "",
          username: data.username || "",
          preferences: data.preferences || {},
          allergies: Array.isArray(data.allergies) ? data.allergies : [],
          ingredients: Array.isArray(data.ingredients) ? data.ingredients : [],
        });
        setNameInput(data.username || "");
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
        setUser({
          email: "unknown",
          username: "",
          preferences: {},
          allergies: [],
          ingredients: [],
        });
        setNameInput("");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function clearAccountFeedback() {
    setAccountMessage("");
    setAccountError("");
  }

  function openNameEditor() {
    setNameInput(user.username || "");
    clearAccountFeedback();
    setIsEditingName(true);
  }

  function closeNameEditor() {
    setIsEditingName(false);
    setNameInput(user.username || "");
  }

  function openPasswordChange() {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    clearAccountFeedback();
    setIsResettingPassword(true);
  }

  function closePasswordChange() {
    setIsResettingPassword(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  async function handleNameSubmit(e) {
    e.preventDefault();
    const nextName = nameInput.trim();

    if (!nextName) {
      setAccountError("Name is required.");
      return;
    }

    setIsSavingAccount(true);
    clearAccountFeedback();

    try {
      const response = await http().patch("/api/user/me/name", {
        username: nextName,
      });
      const data = await response.json();

      setUser((prev) => ({
        ...prev,
        username: data.username || nextName,
      }));
      setNameInput(data.username || nextName);
      setAccountMessage("Name updated.");
      setIsEditingName(false);
    } catch (err) {
      setAccountError(err.message || "Could not update your name.");
    } finally {
      setIsSavingAccount(false);
    }
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      setAccountError("Fill out all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setAccountError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setAccountError("New password must be at least 8 characters.");
      return;
    }

    setIsSavingAccount(true);
    clearAccountFeedback();

    try {
      await http().patch("/api/user/me/password", {
        oldPassword,
        newPassword,
        confirmPassword,
      });

      setAccountMessage("Password updated.");
      closePasswordChange();
    } catch (err) {
      setAccountError(err.message || "Could not update your password.");
    } finally {
      setIsSavingAccount(false);
    }
  }

  function renderIngredientChips(items) {
    if (isLoading) {
      return <p className="account-empty-text">Loading...</p>;
    }

    if (!items.length) {
      return null;
    }

    return (
      <div className="ingredient-chip-list account-chip-list">
        {items.map((item, index) => (
          <div
            key={`${getItemLabel(item)}-${index}`}
            className="ingredient-chip"
          >
            <img
              src={getIngredientImage(getItemImage(item))}
              alt={getItemLabel(item)}
              className="ingredient-chip-image"
              onError={(e) => {
                e.currentTarget.src =
                  "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg";
              }}
            />
            <span className="ingredient-chip-label">{getItemLabel(item)}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="onboarding-page account-page">
        <div className="onboarding-card account-card">
          <button
            type="button"
            className="account-edit-button"
            onClick={openNameEditor}
            aria-label="Edit name"
          >
            <Pencil size={20} aria-hidden="true" />
          </button>

          <div className="account-header">
            <div className="account-avatar" aria-hidden="true">
              {isLoading ? "" : profileInitial}
            </div>

            <div>
              <p className="onboarding-step">Account</p>
              <h1 className="onboarding-title">{displayName}</h1>
              <p className="account-header-email">
                {user.email || "Loading..."}
              </p>
            </div>
          </div>

          {(accountMessage || accountError) && (
            <p
              className={
                accountError ? "account-error-message" : "success-message"
              }
            >
              {accountError || accountMessage}
            </p>
          )}

          <div className="onboarding-section account-preferences-section">
            <h2>Preferences</h2>
            <p>Your current food preferences and dietary settings.</p>

            {isLoading ? (
              <p className="account-empty-text">Loading...</p>
            ) : (
              <>
                {!hasAnyPreferences && (
                  <p className="account-empty-text">No preferences</p>
                )}

                {selectedPreferences.length > 0 && (
                  <div className="account-preference-grid">
                    {selectedPreferences.map((preference) => (
                      <span key={preference} className="account-preference-pill">
                        {preference}
                      </span>
                    ))}
                  </div>
                )}

                {user.allergies.length > 0 && (
                  <div className="account-preference-group">
                    <h3>Allergies</h3>
                    {renderIngredientChips(user.allergies)}
                  </div>
                )}

                {user.ingredients.length > 0 && (
                  <div className="account-preference-group">
                    <h3>Kitchen ingredients</h3>
                    {renderIngredientChips(user.ingredients)}
                  </div>
                )}
              </>
            )}

            <button
              type="button"
              className="primary-btn"
              onClick={() => navigate("/onboarding/update")}
            >
              Edit Preferences
            </button>

            <button
              type="button"
              className="secondary-btn account-change-password-btn"
              onClick={openPasswordChange}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {isEditingName && (
        <div className="account-modal-backdrop" role="presentation">
          <form className="account-modal" onSubmit={handleNameSubmit}>
            <div className="account-modal-header">
              <h2>Edit Name</h2>
              <button
                type="button"
                className="account-modal-close"
                onClick={closeNameEditor}
                aria-label="Close"
              >
                x
              </button>
            </div>

            <label className="account-field">
              <span>Name</span>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                maxLength="40"
                autoFocus
              />
            </label>

            {accountError && (
              <p className="account-error-message">{accountError}</p>
            )}

            <div className="account-modal-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={closeNameEditor}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="primary-btn"
                disabled={isSavingAccount}
              >
                {isSavingAccount ? "Saving..." : "Save Name"}
              </button>
            </div>
          </form>
        </div>
      )}

      {isResettingPassword && (
        <div className="account-modal-backdrop" role="presentation">
          <form className="account-modal" onSubmit={handlePasswordSubmit}>
            <div className="account-modal-header">
              <h2>Change Password</h2>
              <button
                type="button"
                className="account-modal-close"
                onClick={closePasswordChange}
                aria-label="Close"
              >
                x
              </button>
            </div>

            <label className="account-field">
              <span>Old Password</span>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </label>

            <label className="account-field">
              <span>New Password</span>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>

            <label className="account-field">
              <span>Confirm New Password</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>

            {accountError && (
              <p className="account-error-message">{accountError}</p>
            )}

            <div className="account-modal-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={closePasswordChange}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="primary-btn"
                disabled={isSavingAccount}
              >
                {isSavingAccount ? "Saving..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
