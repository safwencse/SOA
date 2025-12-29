import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h1>SOA Project</h1>
        </div>
        <nav className="nav">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#crud">CRUD Demo</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <a href="#crud">
        <button className="cta-button">Get Started</button>
        </a>
      </div>
    </header>
  );
};

export default Header;