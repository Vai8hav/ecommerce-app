import React from 'react';

export const ScrollButton = () => {
  const scrollToSection = () => {
    const targetSection = document.getElementById('target-section');
    targetSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button className="scroll-button" onClick={scrollToSection}>
      Check Categories
    </button>
  );
};
