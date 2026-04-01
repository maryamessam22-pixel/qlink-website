import React, { useEffect, useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import DynamicBackground from '../../components/common/DynamicBackground';
import AppPromoSection from '../../components/Sections/AppPromoSection';
import { Shield, Globe, Zap, History, Target, Users } from 'lucide-react';

// Assets
import heroBg from '../../assets/images/hero.png';
import originImg from '../../assets/images/stay-pic.png';
import mobilesImg from '../../assets/images/2mobiles.png';

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
    <div className={`our-story-page-wrapper ${lang === 'ar' ? 'rtl-text' : ''}`}>
      <DynamicBackground />
      
      <div className="story-hero-section scroll-animate stag-1" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">{t('ourStory.heroTitle')}</h1>
            <p className="hero-subtitle">{t('ourStory.heroSubtitle')}</p>
          </div>
        </div>
      </div>

      <div className="story-main-content">
        {/* Origin Section - Two Column Split */}
        <section className="story-split-section scroll-animate stag-2">
          <div className="split-grid">
            <div className="split-text-side">
              <h2 className="section-title">{t('ourStory.originTitle')}</h2>
              <p className="section-desc">{t('ourStory.originDesc')}</p>
              <div className="feature-list">
                <div className="feature-item">
                  <History size={24} className="feature-icon" />
                  <span>{t('ourStory.visionTitle')}</span>
                </div>
              </div>
            </div>
            <div className="split-image-side">
              <img src={originImg} alt="Original Concept" className="origin-img" />
            </div>
          </div>
        </section>

        {/* Values Grid - Similar to Family Members cards in Caregivers */}
        <section className="story-values-section scroll-animate stag-3">
          <div className="values-header">
            <h2 className="values-title">{t('ourStory.valuesTitle')}</h2>
          </div>
          <div className="values-grid">
            {t('ourStory.values', { returnObjects: true }).map((value, index) => (
              <div key={value.id} className="value-card-premium">
                <div className="value-icon-wrapper">
                  {index === 0 && <Shield size={32} />}
                  {index === 1 && <Globe size={32} />}
                  {index === 2 && <Zap size={32} />}
                </div>
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Journey - Similar to Setup in Caregivers */}
        <section className="story-timeline-section scroll-animate stag-1">
          <h2 className="timeline-title">{t('ourStory.journeyTitle')}</h2>
          <div className="timeline-row-wrapper">
            <div className="timeline-main-line"></div>
            <div className="timeline-steps-grid">
              {t('ourStory.journey', { returnObjects: true }).map((step) => (
                <div key={step.id} className="timeline-step">
                  <div className="step-circle">
                    <span className="step-date">{step.date}</span>
                  </div>
                  <h4 className="step-title">{step.title}</h4>
                  <p className="step-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Card */}
        <section className="story-cta-section scroll-animate stag-2">
          <div className="cta-premium-card">
            <div className="cta-icon-bg">
              <Target size={40} />
            </div>
            <h2>{t('ourStory.ctaTitle')}</h2>
            <p>{t('ourStory.ctaDesc')}</p>
            <button className="story-cta-btn">{t('ourStory.ctaBtn')}</button>
          </div>
        </section>
      </div>

      {/* Full Width App Promo Section */}
      <div className="promo-section-wrapper scroll-animate stag-3">
        <AppPromoSection 
          imageSrc={mobilesImg}
          customTitle={t('ourStory.heroTitle')}
          customDesc={t('ourStory.heroSubtitle')}
        />
      </div>
    </div>
  );
}

export default OurStory;
