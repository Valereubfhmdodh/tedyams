import { Link } from 'react-router-dom';

function Shop({ products }) {
  return (
    <>
      {/* ── Hero ── */}
      <header className="hero container animate-fade-in">
        <div className="hero-text">
          <h2>
            Élevez<br />
            Votre <span>Style</span>
          </h2>
          <p>
            Découvrez la fusion du design futuriste et du confort ultime —
            des sneakers qui vous distinguent.
          </p>
          <div className="hero-cta">
            <Link to="/collections" className="btn-primary">
              Découvrir les Collections →
            </Link>
          </div>
          <div className="hero-badges">
            <div className="badge-item">
              <strong>{products.length}+</strong>
              <span>Modèles</span>
            </div>
            <div className="badge-item">
              <strong>100%</strong>
              <span>Authenticité</span>
            </div>
            <div className="badge-item">
              <strong>48h</strong>
              <span>Livraison</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src="/hero.png" alt="AMS SHOP Sneaker" />
        </div>
      </header>

      {/* ── Products ── */}
      <main id="shop" className="container">
        <div className="section-header">
          <div>
            <h3>Sneakers Vedettes</h3>
            <p>Nos sélections les plus populaires du moment</p>
          </div>
          <Link to="/collections" className="section-link">
            Voir tout →
          </Link>
        </div>

        <div className="product-grid">
          {products.map((product, i) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="product-card-link"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <div className="product-image-overlay" />
                </div>
                <div className="product-info">
                  <span className="category">{product.category}</span>
                  <h4>{product.name}</h4>
                  <div className="product-footer">
                    <div className="price-container">
                      {product.originalPrice && (
                        <span className="price-original">{product.originalPrice.toLocaleString()}</span>
                      )}
                      <span className="price">{product.price.toLocaleString()} XOF</span>
                    </div>
                    <button className="btn-buy">Ajouter</button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export default Shop;
