import React from 'react';
import Header from '../../components/common/Header';
import ParallaxHero from './components/ParallaxHero';
import SelectedWorks from './components/SelectedWorks';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <Header />
      <main>
        <ParallaxHero />
        
        <SelectedWorks />
      </main>
    </div>
  );
};

export default Home;
