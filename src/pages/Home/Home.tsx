import React from 'react';
import Header from '../../components/common/Header';
import ParallaxHero from './components/ParallaxHero';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <Header />
      <main>
        <ParallaxHero />
        
        {/* Dummy section to allow scrolling and see the parallax effect */}
        <section className="dummy-content">
          <h2>Explora el Portfolio</h2>
          <p>Haz scroll hacia arriba y hacia abajo para ver el efecto Parallax en acción.</p>
          <div style={{ height: '1000px' }}></div>
        </section>
      </main>
    </div>
  );
};

export default Home;
