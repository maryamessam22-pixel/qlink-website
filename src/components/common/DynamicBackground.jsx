import React from 'react';
import './DynamicBackground.css';

const DynamicBackground = () => {
  return (
    <div className="dynamic-bg-container">
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>
      <div className="bg-glow bg-glow-3"></div>
    </div>
  );
};

export default DynamicBackground;
