import React from 'react';

function About() {
  return (
    <div className="about-page container animate-fade-in">
      {/* ── Hero Section ── */}
      <section className="about-hero">
        <span className="category-tag">Notre Histoire</span>
        <h1>L'Expérience <span>AMS SHOP</span></h1>
        <p>Plus qu'une simple boutique de sneakers, une destination pour les passionnés de style et d'innovation.</p>
      </section>

      {/* ── Mission Section ── */}
      <section className="about-grid">
        <div className="about-image glass-morphism">
          <img src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800" alt="Sneaker Culture" />
        </div>
        <div className="about-text">
          <h3>Notre Vision</h3>
          <p>
            Fondée en 2025, AMS SHOP est née de la volonté de rendre les sneakers les plus exclusives et les plus performantes 
            accessibles à tous les passionnés. Nous croyons que chaque pas doit être une affirmation de style sans compromis sur le confort.
          </p>
          <div className="stats-mini">
            <div className="stat-item">
              <strong>10k+</strong>
              <span>Clients Heureux</span>
            </div>
            <div className="stat-item">
              <strong>100%</strong>
              <span>Authentique</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values Section ── */}
      <section className="values-section">
        <div className="section-header center">
          <h3>Pourquoi nous choisir ?</h3>
        </div>
        <div className="values-grid">
          <div className="value-card glass-morphism">
            <div className="icon">🛡️</div>
            <h4>Authenticité Garantie</h4>
            <p>Chaque paire vendue sur AMS SHOP passe par un processus de vérification rigoureux pour garantir son authenticité totale.</p>
          </div>
          <div className="value-card glass-morphism">
            <div className="icon">⚡</div>
            <h4>Livraison Rapide</h4>
            <p>Nous comprenons votre impatience. C'est pourquoi nous optimisons nos circuits pour vous livrer en un temps record (48h).</p>
          </div>
          <div className="value-card glass-morphism">
            <div className="icon">💎</div>
            <h4>Service Premium</h4>
            <p>Un support client réactif et à votre écoute pour vous accompagner dans le choix de votre future paire préférée.</p>
          </div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="contact-cta glass-morphism">
        <h3>Une question ?</h3>
        <p>Notre équipe d'experts est là pour vous répondre 7j/7.</p>
        <button className="btn-primary">Contactez-nous</button>
      </section>
    </div>
  );
}

export default About;
