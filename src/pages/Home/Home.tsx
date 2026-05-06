import React from 'react';
import Header from '../../components/common/Header';
import ParallaxHero from './components/ParallaxHero';
import SelectedWorks from './components/SelectedWorks';
import KatanaStrike from '../../components/common/KatanaStrike/KatanaStrike';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <Header />
      <main>
        <ParallaxHero />

        <SelectedWorks />

        {/* Animación katana + tech stack chips */}
        <div style={{ width: '100%', height: '100vh' }}>
          <KatanaStrike />
        </div>
      </main>
    </div>
  );
};

export default Home;
