// RecipeCard.jsx
import "../css/RecipeCard.css";
export default function RecipeCard({ name, image, time, cost, calories, onSave }) {
  return (
   <div className="card">
    {/* show name and image for recipes so far*/}
        <img className="card-image" src={image} alt={name} />
        <h3 className="card-title">{name}</h3>
    </div>
  );
}