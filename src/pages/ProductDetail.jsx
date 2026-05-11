import React from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetail({ products }) {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [selectedSize, setSelectedSize] = React.useState('');

  if (!product) {
    return (
      <div className="container animate-fade-in" style={{padding: '100px 0', textAlign: 'center'}}>
        <h2>Produit non trouvé</h2>
        <Link to="/collections" className="btn-primary" style={{marginTop: '20px'}}>Retour aux collections</Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleOrder = () => {
    if (!selectedSize) {
      alert("Veuillez sélectionner une pointure avant de passer commande.");
      return;
    }

    const phoneNumber = "2290190206120"; // REMPLACEZ PAR VOTRE NUMÉRO (ex: 2250102030405)
    const message = `Bonjour AMS SHOP, je souhaite commander ce modèle :\n\n*Produit :* ${product.name}\n*Pointure :* ${selectedSize}\n*Prix :* ${product.price.toLocaleString()} XOF\n*Image :* ${product.image}\n\nEst-ce disponible ?`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="product-detail-page container animate-fade-in">
      <div className="breadcrumb">
        <Link to="/">Accueil</Link> / <Link to="/collections">Collections</Link> / <span>{product.name}</span>
      </div>

      <div className="product-main">
        <div className="product-gallery">
          <div className="main-image-container glass-morphism">
            <img src={product.image} alt={product.name} />
          </div>
        </div>

        <div className="product-info-panel">
          <span className="category-tag">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="price-container price-large">
            {product.original_price && (
              <span className="price-original" style={{fontSize: '1.5rem', verticalAlign: 'middle', marginRight: '15px'}}>{product.original_price.toLocaleString()}</span>
            )}
            <span>{product.price.toLocaleString()} XOF</span>
          </div>
          
          <div className="product-description">
            <h3>Description</h3>
            <p>
              {product.description || `Découvrez le prochain niveau de confort et de style avec la ${product.name}. 
              Dotées d'une technologie d'amorti avancée et d'un design respirant, 
              ces sneakers sont parfaites pour la performance comme pour le quotidien.`}
            </p>
          </div>

          <div className="purchase-options">
            <div className="option-group">
              <label>Sélectionner la taille</label>
              <div className="size-selector">
                {(product.sizes || '38, 39, 40, 41, 42, 43, 44, 45').split(',').map(size => (
                  <button 
                    key={size} 
                    className={`size-btn ${selectedSize === size.trim() ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size.trim())}
                  >
                    {size.trim()}
                  </button>
                ))}
              </div>
            </div>

            <button className="btn-primary btn-large" onClick={handleOrder}>
              Passer Commande
            </button>
          </div>

          <div className="product-features">
            <div className="feature">
              <strong>Matériaux Premium</strong>
              <span>Tige en textile et synthétique de haute qualité.</span>
            </div>
            <div className="feature">
              <strong>Semelle Durable</strong>
              <span>Semelle en caoutchouc pour une traction maximale.</span>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="related-section">
          <h3>Vous aimerez aussi</h3>
          <div className="product-grid">
            {relatedProducts.map(rp => (
              <Link to={`/product/${rp.id}`} key={rp.id} className="product-card-link">
                <div className="product-card">
                  <div className="product-image">
                    <img src={rp.image} alt={rp.name} />
                  </div>
                  <div className="product-info">
                    <span className="category">{rp.category}</span>
                    <h4>{rp.name}</h4>
                    <div className="price-container">
                      {rp.originalPrice && (
                        <span className="price-original">{rp.originalPrice.toLocaleString()}</span>
                      )}
                      <span className="price">{rp.price.toLocaleString()} XOF</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetail;
