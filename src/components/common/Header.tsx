import React from 'react';
import ThemeToggle from './ThemeToggle/ThemeToggle';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="common-header glass">
      <div className="header-logo">
        <span className="logo-accent">Portfolio</span>
      </div>
      <nav className="header-nav">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
      <ThemeToggle />
    </header>
  );
};

export default Header;
