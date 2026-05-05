import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="common-header glass">
      <div className="header-logo">
        <span className="logo-accent">Vite</span>App
      </div>
      <nav className="header-nav">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
