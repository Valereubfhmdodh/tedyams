import React from 'react';

function Shipping() {
  return (
    <div className="shipping-page container animate-fade-in">
      <header className="page-header">
        <span className="category-tag">Logistique</span>
        <h1>Livraison & <span>Expédition</span></h1>
        <p>Un service sur mesure pour recevoir vos sneakers en toute sérénité.</p>
      </header>

      <div className="shipping-content">
        <div className="shipping-grid">
          <div className="shipping-card glass-morphism">
            <div className="icon">🚀</div>
            <h3>Service à la Demande</h3>
            <p>
              Chez AMS SHOP, nous nous adaptons à votre emploi du temps. Nos livraisons sont effectuées 
              exclusivement à la demande. Une fois votre commande validée, notre équipe vous contacte 
              pour convenir du moment idéal pour la remise de votre colis.
            </p>
          </div>

          <div className="shipping-card glass-morphism">
            <div className="icon">🏠</div>
            <h3>Livraison à Domicile</h3>
            <p>
              Oubliez les points de retrait. Nous livrons directement à votre porte, à votre bureau 
              ou à l'adresse de votre choix. Notre service de livraison à domicile garantit 
              une remise en main propre sécurisée de vos articles premium.
            </p>
          </div>
        </div>

        <section className="shipping-steps">
          <h3>Comment ça marche ?</h3>
          <div className="steps-container">
            <div className="step">
              <span className="step-num">01</span>
              <h4>Commande</h4>
              <p>Vous passez commande sur notre plateforme.</p>
            </div>
            <div className="step">
              <span className="step-num">02</span>
              <h4>Confirmation</h4>
              <p>Nous vous appelons pour planifier le passage.</p>
            </div>
            <div className="step">
              <span className="step-num">03</span>
              <h4>Réception</h4>
              <p>Votre colis est livré en main propre sous 24h à 48h.</p>
            </div>
          </div>
        </section>

        <div className="shipping-info-box glass-morphism">
          <p>
            <strong>Note importante :</strong> Les frais de livraison sont calculés selon votre zone géographique 
            et vous seront communiqués lors de la confirmation téléphonique.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Shipping;
