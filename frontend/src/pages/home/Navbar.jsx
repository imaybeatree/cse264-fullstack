import "@/css/Navbar.css";
import { removeToken } from "../../lib/token";
import { useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    removeToken();
    navigate("/");
  }

  function handleHome() {
    navigate("/home");
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={handleHome} style={{ cursor: "pointer" }}>
        🍽 QuickBites
      </div>

      <div className="navbar-links">
        {/* go back to home */}
         <a href ="/home">Home</a>
        {/* see saved recipes */}
        <a href="/saved">Saved Recipes</a>
        <a href="/account">Account</a>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}