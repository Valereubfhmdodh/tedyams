import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container nav-content">
        <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1>AMS<span> SHOP</span></h1>
        </Link>

        <div className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          <Link to="/" className={isActive('/') ? 'nav-active' : ''}>Accueil</Link>
          <Link to="/collections" className={isActive('/collections') ? 'nav-active' : ''}>Collections</Link>
          <Link to="/about" className={isActive('/about') ? 'nav-active' : ''}>À propos</Link>
        </div>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={menuOpen ? 'bar bar-open' : 'bar'}></span>
          <span className={menuOpen ? 'bar bar-open' : 'bar'}></span>
          <span className={menuOpen ? 'bar bar-open' : 'bar'}></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
