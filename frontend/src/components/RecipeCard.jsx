import "../css/RecipeCard.css";

export default function RecipeCard({ name, image, time, cost, calories, onSave }) {
  return (
    <div className="card">
      <img className="card-image" src={image} alt={name} />
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <div className="card-meta">
          <span>{time} min</span>
          <span> {calories ? Math.round(calories) : "—"} cal</span>
          <span>${cost ? cost.toFixed(2) : "—"}</span>
        </div>
        <button className="card-save-btn" onClick={onSave}>Save Recipe</button>
      </div>
    </div>
  );
}