import React from 'react';
import Header from '../../components/common/Header';
import ParallaxHero from './components/ParallaxHero';
import SelectedWorks from './components/SelectedWorks';
import KatanaStrike from './components/KatanaStrike/KatanaStrike';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <Header />
      <main>
        <ParallaxHero />

        <SelectedWorks />

        {/* Animación pixel art katana — se activa al hacer scroll */}
        <KatanaStrike />
      </main>
    </div>
  );
};

export default Home;
