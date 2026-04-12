import React from 'react';
import './DynamicBackground.css';

const DynamicBackground = () => {
  return (
    <div className="dynamic-bg-container" aria-hidden>
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />
      <div className="bg-glow bg-glow-3" />
      <div className="bg-glow bg-glow-4" />
      <div className="bg-glow bg-glow-5" />
      <div className="bg-glow bg-glow-6" />
    </div>
  );
};

export default DynamicBackground;
