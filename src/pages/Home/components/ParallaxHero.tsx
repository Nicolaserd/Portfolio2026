import React from 'react';
import SimpleParallax from 'simple-parallax-js';
import './ParallaxHero.css';

const ParallaxHero: React.FC = () => {
  return (
    <section className="parallax-container">
      {/* Cielo */}
      <div className="parallax-layer layer-cielo">
        <SimpleParallax scale={1.1} delay={0} orientation="down">
          <img src="/parallax/cielo.png" alt="Cielo" style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
        </SimpleParallax>
      </div>

      {/* Sol - posicionado con wrapper absoluto, sin SimpleParallax para no romper el layout */}
      <div className="parallax-layer layer-sol">
        <img src="/parallax/sol.png" alt="Sol" className="sol-pequeno" />
      </div>
      
      {/* Mar - Esta capa dicta la altura del contenedor */}
      <div className="parallax-layer layer-mar">
        <SimpleParallax scale={1.3} delay={0} orientation="up">
          <img src="/parallax/mar.png" alt="Mar" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </SimpleParallax>
      </div>
      
      {/* Objetos */}
      <div className="parallax-layer layer-objetos">
        <SimpleParallax scale={1.15} delay={0} orientation="up">
          <img src="/parallax/objetos.png" alt="Objetos" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </SimpleParallax>
      </div>
      
      {/* Playa */}
      <div className="parallax-layer layer-playa">
        <SimpleParallax scale={1.5} delay={0} orientation="up">
          <img src="/parallax/Playa.png" alt="Playa" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </SimpleParallax>
      </div>
      
      {/* Plantas */}
      <div className="parallax-layer layer-plantas">
        <SimpleParallax scale={1.6} delay={0} orientation="up">
          <img src="/parallax/plantas.png" alt="Plantas" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </SimpleParallax>
      </div>
      
      {/* Contenedor para texto futuro */}
      <div className="parallax-content">
        <SimpleParallax scale={1.3} delay={0} orientation="up">
          <div style={{ padding: '2rem' }}>
            {/* Aquí puedes meter el texto principal */}
          </div>
        </SimpleParallax>
      </div>
    </section>
  );
};

export default ParallaxHero;
