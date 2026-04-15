import "../css/RecipeCard.css";
import { useNavigate } from 'react-router'

export default function RecipeCard({ id, name, image, time, cost, calories, onSave }) {
  const navigate = useNavigate();

  return (
   <div className="card" onClick={() => navigate(`/recipe/${id}`)} style={{ cursor: "pointer" }}>
      <img className="card-image" src={image} alt={name} />
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <div className="card-meta">
          <span>{time} min</span>
          <span>{calories ? Math.round(calories) : "—"} cal</span>
          <span>${cost ? cost.toFixed(2) : "—"}</span>
        </div>
        <button className="card-save-btn" onClick={(e) => {
          e.stopPropagation(); // stops card click from firing
          onSave();
        }}>Save Recipe</button>
      </div>
    </div>
  );
}