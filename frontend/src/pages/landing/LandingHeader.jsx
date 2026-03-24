import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import "@/css/header.css"

export function LandingHeader() {
  const headerRef = useRef(null);
  const [isPill, setIsPill] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = headerRef.current;
      if (!header) return;

      const headerBottom = header.offsetHeight;
      setIsPill(window.scrollY > headerBottom);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header ref={headerRef} className={`header ${isPill ? "is-pill" : ""}`}>
      <div className="header-container">
        <div className="header-left">
          <img src="/food_bowl.png" alt="logo" className="header-logo" />
          <span className="header-title">Food App</span>
        </div>

        <nav className="header-nav">
          <a href="#features" className="header-link">
            Features
          </a>
          <a href="#contact" className="header-link">
            Contact
          </a>
        </nav>

        <div className="header-actions">
          <a href="/login" className="btn btn-secondary">
            Login
          </a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/register"
            className="btn btn-primary"
          >
            Sign up
          </motion.a>
        </div>
      </div>
    </header>
  );
}