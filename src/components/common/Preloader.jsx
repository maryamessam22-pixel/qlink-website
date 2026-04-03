import React, { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
  
    const timer1 = setTimeout(() => {
      setIsVisible(false);
    }, 2000); 

  
    const timer2 = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <div className={`preloader-wrapper ${isVisible ? '' : 'fade-out'}`}>
      <div className="preloader-content">
  
        <div className="qlink-logo-container">
          <svg className="q-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" className="q-circle" />
            <path d="M70 70 L90 90" stroke="var(--color-primary-red)" strokeWidth="12" strokeLinecap="round" className="q-tail" />
            
            {/* Health Cross / Link inside the Q */}
            {/* <path d="M35 50 H65 M50 35 V65" stroke="var(--color-primary-red)" strokeWidth="6" strokeLinecap="round" className="q-cross" /> */}
          </svg>
        </div>
        
        <div className="loading-text">
          <span className="letter letter-1">Q</span>
          <span className="letter letter-2">L</span>
          <span className="letter letter-3">I</span>
          <span className="letter letter-4">N</span>
          <span className="letter letter-5">K</span>
        </div>
        
        <div className="loading-bar-container">
          <div className="loading-bar-fill"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
