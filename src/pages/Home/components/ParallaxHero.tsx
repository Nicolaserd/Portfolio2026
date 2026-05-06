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
        <SimpleParallax scale={1.1} delay={0} orientation="up">
          <div style={{ padding: '2rem 10%', display: 'flex', justifyContent: 'flex-end' }}>
            
            {/* Card extraída de Card Nicolas.html */}
            <article className="nicolas-card" role="region" aria-label="Tarjeta de presentación">
              <div className="eyebrow">
                <span className="dot"></span>
                <span>Portfolio</span>
                <span className="torii-mark">⛩</span>
              </div>

              <h1 className="name">Nicolás <span className="accent">Inchaustegui</span></h1>
              <div className="horizon" aria-hidden="true"></div>
              <div className="role">
                <span className="bar"></span>
                <span>Software · Data · IA</span>
              </div>

              <p className="bio">
                Desarrollo soluciones combinando <em>software, automatización, datos e IA</em> para transformar información en decisiones accionables.
              </p>

              <div className="skills">
                <span className="chip"><span className="glyph">◆</span>Backend</span><span className="sep"></span>
                <span className="chip"><span className="glyph">◆</span>Power BI</span><span className="sep"></span>
                <span className="chip"><span className="glyph">◆</span>DAX</span><span className="sep"></span>
                <span className="chip"><span className="glyph">◆</span>Power Query</span><span className="sep"></span>
                <span className="chip"><span className="glyph">◆</span>IA Aplicada</span>
              </div>

              <div className="meta">
                <span>Lat&nbsp;—&nbsp;Colombia · GMT-5</span>
                <span className="now">Disponible para proyectos</span>
              </div>

              <div className="seal" aria-hidden="true">
                <div className="kanji">N</div>
              </div>
            </article>

          </div>
        </SimpleParallax>
      </div>
    </section>
  );
};

export default ParallaxHero;
