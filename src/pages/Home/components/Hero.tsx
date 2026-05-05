import React from 'react';
import Button from '../../../components/common/Button';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="home-hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Build <span className="text-gradient">Faster</span> with Vite
        </h1>
        <p className="hero-subtitle">
          Experience the lightning fast development server and optimized build process for modern web apps.
        </p>
        <div className="hero-actions">
          <Button variant="primary">Get Started</Button>
          <Button variant="secondary">View Documentation</Button>
        </div>
      </div>
      <div className="hero-visual">
        <div className="visual-shape shape-1"></div>
        <div className="visual-shape shape-2"></div>
        <div className="glass-card">
          <div className="code-mockup">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
            <pre><code>npm run dev</code></pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
