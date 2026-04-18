import "@/css/Navbar.css";
import { removeToken } from "../../lib/token";
import { useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();
  function handleLogout() {
    removeToken();
    navigate("/");
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">🍽 Food App</div>
      <div className="navbar-links">
        {/* go back to home */}
         <a href ="/home">Home</a>
        {/* see saved recipes */}
        <a href="/saved">Saved Recipes</a>
        {/* see account details */}
        <a href="/account">Account</a>
        {/* user can log out */}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}