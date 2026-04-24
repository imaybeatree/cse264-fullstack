import "@/css/Navbar.css";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, UserCircle } from "lucide-react";
import { removeToken } from "../../lib/token";
import { useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();
  const navbarRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPill, setIsPill] = useState(false);

  function handleLogout() {
    removeToken();
    navigate("/");
  }

  function handleHome() {
    navigate("/home");
  }

  function handleMenuNavigate(path) {
    setIsDropdownOpen(false);
    navigate(path);
  }

  useEffect(() => {
    function handleScroll() {
      const navbar = navbarRef.current;
      if (!navbar) return;

      setIsPill(window.scrollY > navbar.offsetHeight);
    }

    function handleDocumentClick(e) {
      if (!dropdownRef.current?.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return (
    <nav ref={navbarRef} className={`navbar ${isPill ? "is-pill" : ""}`}>
      <button className="navbar-brand" onClick={handleHome} type="button">
        <img src="/logo.jpg" alt="logo" className="navbar-logo-image" />
        <span className="navbar-logo">QuickBites</span>
      </button>

      <div className="navbar-right">
        <button
          type="button"
          className="navbar-link"
          onClick={() => navigate("/saved-recipes")}
        >
          Saved Recipes
        </button>

        <div className="navbar-profile-menu" ref={dropdownRef}>
          <button
            type="button"
            className="navbar-profile-button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            aria-expanded={isDropdownOpen}
            aria-haspopup="menu"
            aria-label="Open profile menu"
          >
            <UserCircle size={26} aria-hidden="true" />
            <ChevronDown
              size={16}
              aria-hidden="true"
              className={
                isDropdownOpen ? "navbar-chevron open" : "navbar-chevron"
              }
            />
          </button>

          {isDropdownOpen && (
            <div className="navbar-dropdown" role="menu">
              <button
                type="button"
                className="navbar-dropdown-item"
                onClick={() => handleMenuNavigate("/account")}
                role="menuitem"
              >
                Account
              </button>
              <button
                type="button"
                className="navbar-dropdown-item logout"
                onClick={handleLogout}
                role="menuitem"
              >
                <LogOut size={16} aria-hidden="true" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
