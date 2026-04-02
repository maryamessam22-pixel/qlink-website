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
        
        {/* HEADER SECTION */}
        <section className="support-header-section scroll-animate stag-1">
          <h1 className="support-title">
            Support <span className="red-text">Center</span>
          </h1>
          <p className="support-subtitle">
            We're here to help. Find answers, contact our team, or check system status
          </p>
        </section>

        {/* SUPPORT CARDS */}
        <section className="support-cards-section scroll-animate stag-2">
          <div className="card-grid-3">
            <div className="support-card glass-panel">
              <div className="icon-wrap icon-wrap-glass" style={{ color: '#b0b8c8' }}>
                <Book size={24} />
              </div>
              <h3>Getting Started</h3>
              <p>Setup guides and tutorials</p>
            </div>
            
            <div className="support-card glass-panel card-active-glow">
              <div className="icon-wrap icon-wrap-red" style={{ color: '#E03232' }}>
                <Wrench size={24} />
              </div>
              <h3>Troubleshooting</h3>
              <p>Fix common technical issues</p>
            </div>

            <div className="support-card glass-panel">
              <div className="icon-wrap icon-wrap-glass" style={{ color: '#0d6efd' }}>
                <CreditCard size={24} />
              </div>
              <h3>Account & Billing</h3>
              <p>Manage your subscription</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default HelpCenter;
