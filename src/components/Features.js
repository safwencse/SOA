import React from 'react';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: '⚡',
      title: 'Fast & Responsive',
      description: 'Built with React for optimal performance'
    },
    {
      icon: '🔧',
      title: 'CRUD Operations',
      description: 'Full Create, Read, Update, Delete functionality'
    },
    {
      icon: '🎨',
      title: 'Clean Design',
      description: 'Modern and minimalist UI design'
    },
    {
      icon: '🔌',
      title: 'API Integration',
      description: 'Seamless integration with REST APIs'
    }
  ];

  return (
    <section className="features" id="features">
      <div className="container">
        <h2 className="section-title">Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;