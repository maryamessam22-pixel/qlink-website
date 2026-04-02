import React, { useEffect, useState, useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';
import { 
  Book, 
  Wrench, 
  CreditCard,
  ChevronDown,
  Users,
  Send,
  CheckCircle2,
  Apple,
  Play
} from 'lucide-react';
import './HelpCenter.css';
import DynamicBackground from '../../components/common/DynamicBackground';
import appScreenImg from '../../assets/images/appscreen.png';

function HelpCenter() {
  const { lang, t } = useContext(LanguageContext);

  useEffect(() => {
    // Reusing the same IntersectionObserver logic from Home
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.15, rootMargin: '-50px' });

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="help-center-wrapper">
      <DynamicBackground />
      
      <div className={`help-center-content ${lang === 'ar' ? 'rtl-text' : ''}`}>
        {/* Step 2: Header Section will go here */}
      </div>
    </div>
  );
}

export default HelpCenter;
