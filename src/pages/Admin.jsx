import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function Admin({ products, refreshProducts }) {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    originalPrice: '',
    image: '',
    category: 'Lifestyle',
    description: '',
    sizes: [] 
  });

  const AVAILABLE_SIZES = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];

  const handleSizeToggle = (size) => {
    const updatedSizes = newProduct.sizes.includes(size)
      ? newProduct.sizes.filter(s => s !== size)
      : [...newProduct.sizes, size];
    setNewProduct({ ...newProduct, sizes: updatedSizes });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const productToInsert = {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        original_price: newProduct.originalPrice ? parseFloat(newProduct.originalPrice) : null,
        image: newProduct.image,
        category: newProduct.category,
        description: newProduct.description,
        sizes: newProduct.sizes.join(', ') // Convertir le tableau en chaîne
      };

      const { error } = await supabase
        .from('products')
        .insert([productToInsert]);

      if (error) throw error;

      setNewProduct({ name: '', price: '', originalPrice: '', image: '', category: 'Lifestyle', description: '', sizes: [] });
      setShowForm(false);
      refreshProducts(); // Refresh the list from App.jsx
      alert("Produit ajouté avec succès !");
    } catch (error) {
      alert("Erreur lors de l'ajout: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);

        if (error) throw error;
        refreshProducts();
      } catch (error) {
        alert("Erreur lors de la suppression: " + error.message);
      }
    }
  };

  return (
    <div className="admin-page container animate-fade-in">
      <div className="admin-header">
        <div>
          <h2>Tableau de Bord</h2>
          <p>Gérez l'inventaire et les produits de votre boutique en temps réel.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(true)}>+ Nouveau Produit</button>
      </div>

      <div className="admin-stats">
        <div className="stat-card glass-morphism">
          <span>Total Produits</span>
          <h3>{products.length}</h3>
        </div>
        <div className="stat-card glass-morphism">
          <span>Catégories</span>
          <h3>{new Set(products.map(p => p.category)).size}</h3>
        </div>
        <div className="stat-card glass-morphism">
          <span>Base de données</span>
          <h3 style={{color: '#10b981'}}>Connectée</h3>
        </div>
      </div>

      <div className="admin-content">
        <div className="products-table-container glass-morphism">
          <table className="products-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Nom</th>
                <th>Catégorie</th>
                <th>Prix</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td data-label="Image">
                    <img src={product.image} alt={product.name} className="table-img" />
                  </td>
                  <td data-label="Nom" className="product-name">{product.name}</td>
                  <td data-label="Catégorie"><span className="badge">{product.category}</span></td>
                  <td data-label="Prix" className="price-cell">
                    {product.original_price && (
                      <span style={{textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '0.8rem', marginRight: '8px'}}>
                        {product.original_price.toLocaleString()}
                      </span>
                    )}
                    {product.price.toLocaleString()} XOF
                  </td>
                  <td data-label="Actions">
                    <button className="btn-delete" onClick={() => deleteProduct(product.id)}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="admin-panel glass-morphism animate-fade-in">
            <h3>Ajouter une Sneaker</h3>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Nom du Produit</label>
                <input 
                  type="text" 
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                  required 
                  placeholder="ex: Air Max Fusion"
                />
              </div>
              
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                <div className="input-group">
                  <label>Prix de Vente (XOF)</label>
                  <input 
                    type="number" 
                    value={newProduct.price}
                    onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                    required 
                    placeholder="85000"
                  />
                </div>
                <div className="input-group">
                  <label>Prix Normal (Optionnel)</label>
                  <input 
                    type="number" 
                    value={newProduct.originalPrice}
                    onChange={e => setNewProduct({...newProduct, originalPrice: e.target.value})}
                    placeholder="120000"
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Image du Produit</label>
                <div className="file-upload-wrapper">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    required={!newProduct.image}
                  />
                  {newProduct.image && (
                    <div className="image-preview">
                      <img src={newProduct.image} alt="Preview" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="input-group">
                <label>Catégorie</label>
                <select 
                  value={newProduct.category}
                  onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                >
                  <option>Performance</option>
                  <option>Lifestyle</option>
                  <option>Casual</option>
                  <option>Édition Limitée</option>
                  <option>Promotions</option>
                </select>
              </div>

              <div className="input-group">
                <label>Pointures disponibles (Sélectionnez)</label>
                <div className="admin-size-selector">
                  {AVAILABLE_SIZES.map(size => (
                    <button
                      key={size}
                      type="button"
                      className={`size-tag ${newProduct.sizes.includes(size) ? 'active' : ''}`}
                      onClick={() => handleSizeToggle(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="input-group">
                <label>Description</label>
                <textarea 
                  value={newProduct.description}
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                  rows="4"
                  placeholder="Décrivez les caractéristiques du produit..."
                ></textarea>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowForm(false)} disabled={isSubmitting}>Annuler</button>
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Enregistrement...' : 'Enregistrer le Produit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
