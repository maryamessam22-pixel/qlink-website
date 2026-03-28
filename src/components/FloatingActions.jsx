import React, { useState, useEffect } from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import './FloatingActions.css';

const FloatingActions = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`floating-actions ${isScrolled ? 'show' : ''}`}>
      <button className="floating-btn top-btn" aria-label="Scroll to top" onClick={scrollToTop}>
        <ArrowUp size={24} />
      </button>
    </div>
  );
};

export default FloatingActions;
