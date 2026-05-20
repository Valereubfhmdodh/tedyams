import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Gérer l'apparence (fond blanc/ombre)
      setScrolled(currentScrollY > 30);

      // Gérer la visibilité (disparaît au scroll vers le bas, réapparaît vers le haut)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scroll vers le bas
        setVisible(false);
      } else {
        // Scroll vers le haut
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Synchroniser la visibilité de la navbar avec le body pour le style CSS
  useEffect(() => {
    if (visible) {
      document.body.removeAttribute("data-navbar-hidden");
    } else {
      document.body.setAttribute("data-navbar-hidden", "true");
    }
    return () => {
      document.body.removeAttribute("data-navbar-hidden");
    };
  }, [visible]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`navbar ${scrolled ? "navbar-scrolled" : ""} ${!visible ? "navbar-hidden" : ""}`}
    >
      <div className="container nav-content">
        <Link
          to="/"
          className="logo"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <h1>
            AMS<span> SHOP</span>
          </h1>
        </Link>

        <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          <Link to="/" className={isActive("/") ? "nav-active" : ""}>
            Accueil
          </Link>
          <Link
            to="/collections"
            className={isActive("/collections") ? "nav-active" : ""}
          >
            Collections
          </Link>
          <Link to="/about" className={isActive("/about") ? "nav-active" : ""}>
            À propos
          </Link>
        </div>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={menuOpen ? "bar bar-open" : "bar"}></span>
          <span className={menuOpen ? "bar bar-open" : "bar"}></span>
          <span className={menuOpen ? "bar bar-open" : "bar"}></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
