import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to My Project</h1>
          <p className="hero-subtitle">
            A simple React landing page with full CRUD functionality
          </p>
          <div className="hero-buttons">
            <a href="#features">
            <button className="btn btn-primary">Learn More</button>
            </a>
            <a href="#crud">
            <button className="btn btn-secondary">Try Demo</button>
            </a>
          </div>
        </div>
        <div className="hero-image">
          <div className="placeholder-image">
            <span>📊</span>
            <p>Interactive CRUD Demo Below</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;