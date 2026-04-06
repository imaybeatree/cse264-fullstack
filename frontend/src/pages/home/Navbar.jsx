import "@/css/Navbar.css";

export default function Navbar() {
// empty func for now
  function handleLogout() {
    console.log("logout");
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">🍽 Food App</div>
      <div className="navbar-links">
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