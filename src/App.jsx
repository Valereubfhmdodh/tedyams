import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Shop from "./pages/Shop";
import Admin from "./pages/Admin";
import Collections from "./pages/Collections";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Shipping from "./pages/Shipping";
import { supabase } from "./supabaseClient";
import "./index.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des produits:",
        error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        {loading ? (
          <div
            className="loader container"
            style={{ padding: "100px 0", textAlign: "center" }}
          >
            <div className="animate-pulse">Chargement de la boutique...</div>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Shop products={products} />} />
            <Route
              path="/collections"
              element={<Collections products={products} />}
            />
            <Route
              path="/product/:id"
              element={<ProductDetail products={products} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route
              path="/admin"
              element={
                <Admin
                  products={products}
                  setProducts={setProducts}
                  refreshProducts={fetchProducts}
                />
              }
            />
          </Routes>
        )}

        <footer className="main-footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-brand">
                <h2>
                  AMS<span> SHOP</span>
                </h2>
                <p>
                  Votre destination premium pour les meilleures sneakers —
                  style, confort et exclusivité réunis.
                </p>
              </div>
              <div className="footer-links">
                <h4>Support</h4>
                <ul>
                  <li>
                    <Link
                      to="/about"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      À propos
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://wa.me/22963923777"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Contact WhatsApp
                    </a>
                  </li>
                  <li>
                    <Link
                      to="/shipping"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      Livraison
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="footer-links">
                <h4>Suivez-nous</h4>
                <ul>
                  <li>
                    <a
                      href="https://instagram.com/amsshop"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/profile.php?id=61551775391027"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://wa.me/22963923777"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p>
                <Link
                  to="/admin"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    cursor: "default",
                  }}
                >
                  &copy; 2025 AMS SHOP. Tous droits réservés.
                </Link>
              </p>
              <div className="footer-legal">
                <a
                  href="#"
                  style={{
                    marginRight: "20px",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Politique de confidentialité
                </a>
                <a
                  href="#"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Conditions d'utilisation
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
