import React, { useEffect, useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import DynamicBackground from '../../components/common/DynamicBackground';
import { Target, Heart, ShieldCheck, Zap } from 'lucide-react';
import './OurStory.css';

function OurStory() {
  const { t, lang } = useContext(LanguageContext);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`our-story-page ${lang === 'ar' ? 'rtl-text' : ''}`}>
      <DynamicBackground />
      <div className="story-container">
        {/* Hero Section */}
        <header className="story-hero scroll-animate stag-1">
          <h1 className="story-title">{t('ourStory.heroTitle')}</h1>
          <p className="story-subtitle">{t('ourStory.heroSubtitle')}</p>
        </header>

        {/* Mission Section */}
        <section className="story-mission scroll-animate stag-2">
          <div className="mission-content">
            <div className="mission-icon">
              <Target size={40} />
            </div>
            <h2>{t('ourStory.missionTitle')}</h2>
            <p>{t('ourStory.missionText')}</p>
          </div>
        </section>

        {/* Values Section */}
        <section className="story-values scroll-animate stag-3">
          <h2>{t('ourStory.valuesTitle')}</h2>
          <div className="values-grid">
            <div className="value-card">
              <Zap className="value-icon" size={28} />
              <h3>{t('ourStory.values.0.title')}</h3>
              <p>{t('ourStory.values.0.desc')}</p>
            </div>
            <div className="value-card">
              <ShieldCheck className="value-icon" size={28} />
              <h3>{t('ourStory.values.1.title')}</h3>
              <p>{t('ourStory.values.1.desc')}</p>
            </div>
            <div className="value-card">
              <Heart className="value-icon" size={28} />
              <h3>{t('ourStory.values.2.title')}</h3>
              <p>{t('ourStory.values.2.desc')}</p>
            </div>
            <div className="value-card">
              <Zap className="value-icon" size={28} />
              <h3>{t('ourStory.values.3.title')}</h3>
              <p>{t('ourStory.values.3.desc')}</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="story-cta scroll-animate stag-1">
          <div className="cta-box">
            <h2>{t('ourStory.ctaTitle')}</h2>
            <button className="btn-primary">{t('ourStory.ctaBtn')}</button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default OurStory;
