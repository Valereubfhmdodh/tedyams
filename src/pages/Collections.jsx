import { useState } from 'react';
import { Link } from 'react-router-dom';

function Collections({ products }) {
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  // Extract unique categories (excluding 'Tous')
  const pureCategories = [...new Set(products.map(p => p.category))];
  const categories = ['Tous', ...pureCategories];

  const filteredProducts = selectedCategory === 'Tous' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="collections-page container animate-fade-in">
      <div className="collections-header">
        <h2>Nos Collections</h2>
        <p>Explorez notre gamme complète de sneakers premium pour chaque style.</p>
      </div>

      <div className="collections-layout">
        <aside className="category-sidebar">
          <h4>Catégories</h4>
          <ul className="category-list">
            {categories.map(category => (
              <li key={category}>
                <button 
                  className={selectedCategory === category ? 'active' : ''} 
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                  <span className="count">
                    ({category === 'Tous' ? products.length : products.filter(p => p.category === category).length})
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="collections-main">
          {selectedCategory === 'Tous' ? (
            // ── Section View ──
            <div className="category-sections">
              {pureCategories.map(cat => {
                const catProducts = products.filter(p => p.category === cat).slice(0, 6);
                if (catProducts.length === 0) return null;
                
                return (
                  <section key={cat} className="category-section">
                    <div className="section-header">
                      <div>
                        <h3>{cat}</h3>
                        <p>{products.filter(p => p.category === cat).length} modèles disponibles</p>
                      </div>
                      <button 
                        className="section-link-btn" 
                        onClick={() => setSelectedCategory(cat)}
                      >
                        Voir tout →
                      </button>
                    </div>
                    
                    <div className="product-grid grid-3-cols">
                      {catProducts.map(product => (
                        <Link to={`/product/${product.id}`} key={product.id} className="product-card-link">
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
                                <button className="btn-buy">Détails</button>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            // ── Filtered View ──
            <>
              <div className="results-info">
                Affichage de {filteredProducts.length} produits dans <strong>{selectedCategory}</strong>
                <button className="back-link" onClick={() => setSelectedCategory('Tous')}>
                  ← Retour aux sections
                </button>
              </div>
              
              <div className="product-grid">
                {filteredProducts.map(product => (
                  <Link to={`/product/${product.id}`} key={product.id} className="product-card-link">
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
                          <button className="btn-buy">Détails</button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="no-results glass-morphism">
                  <p>Aucun produit trouvé dans cette catégorie.</p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Collections;
