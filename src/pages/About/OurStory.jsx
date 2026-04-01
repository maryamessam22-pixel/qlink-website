import React, { useEffect, useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import DynamicBackground from '../../components/common/DynamicBackground';
import { Quote, AlertCircle, CheckCircle, Target, Shield, Globe, Zap, Users } from 'lucide-react';

// Assets
import mariamImg from '../../assets/images/salma.png';
import olaImg from '../../assets/images/sarah.png';
import amiraImg from '../../assets/images/malak.png';
import youseffImg from '../../assets/images/ann.png';
import karmaPic from '../../assets/images/stay-pic.png';

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

  const teamImages = [mariamImg, olaImg, amiraImg, youseffImg];

  return (
    <div className={`our-story-detailed-page ${lang === 'ar' ? 'rtl-text' : ''}`}>
      <DynamicBackground />
      
      <div className="story-content-container">
        {/* Header */}
        <header className="story-page-header scroll-animate stag-1">
          <span className="badge-red">{t('ourStory.heroBadge')}</span>
          <h1 className="main-title">{t('ourStory.heroTitle')}</h1>
        </header>

        {/* Step 1: The Spark */}
        <section className="story-step-section scroll-animate stag-2">
          <div className="step-number">1</div>
          <div className="step-content">
            <h2 className="step-title">{t('ourStory.sparkTitle')}</h2>
            <p className="step-paragraph">{t('ourStory.sparkText')}</p>
            <div className="dark-quote-box">
              <p>"{t('ourStory.sparkQuote')}"</p>
            </div>
          </div>
        </section>

        {/* Case Study Section */}
        <section className="case-study-section scroll-animate stag-3">
          <div className="case-card-main">
            <div className="case-grid">
              <div className="case-info-side">
                <div className="case-title-row">
                  <div className="case-icon-bg red">
                    <Zap size={24} />
                  </div>
                  <h3>{t('ourStory.caseTitle')}</h3>
                </div>
                <p>{t('ourStory.caseText')}</p>
                <div className="case-quote-tag">
                  "{t('ourStory.sparkQuote')}"
                </div>
              </div>
              <div className="case-details-side">
                <div className="detail-item red">
                  <div className="detail-header">
                    <AlertCircle size={20} />
                    <h4>{t('ourStory.caseProblemTitle')}</h4>
                  </div>
                  <p>{t('ourStory.caseProblemDesc')}</p>
                </div>
                <div className="detail-item green">
                  <div className="detail-header">
                    <CheckCircle size={20} />
                    <h4>{t('ourStory.caseSolutionTitle')}</h4>
                  </div>
                  <p>{t('ourStory.caseSolutionDesc')}</p>
                </div>
                <button className="learn-tech-btn">{t('ourStory.caseBtn')}</button>
              </div>
            </div>
          </div>
        </section>

        {/* Step 2: The innovation */}
        <section className="story-step-section scroll-animate stag-1">
          <div className="step-number">2</div>
          <div className="step-content">
            <h2 className="step-title">{t('ourStory.innovationTitle')}</h2>
            <p className="step-paragraph">{t('ourStory.innovationText')}</p>
            <div className="innovation-extra-box">
               <p>{t('ourStory.innovationExtra')}</p>
            </div>
          </div>
        </section>

        {/* Founder Mission Box */}
        <section className="founder-mission-section scroll-animate stag-2">
          <div className="mission-glass-box">
            <Quote size={40} className="mission-quote-icon" />
            <h2 className="mission-title">{t('ourStory.missionTitle')}</h2>
            <p className="mission-text">{t('ourStory.missionQuote')}</p>
            <div className="founder-footer">
               <div className="founder-line"></div>
               <h4 className="founder-name">{t('ourStory.founderName')}</h4>
               <p className="founder-role">{t('ourStory.founderRole')}</p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="core-values-section scroll-animate stag-3">
          <span className="badge-red-small">{t('ourStory.valuesTitle')}</span>
          <h2 className="values-main-title">{t('ourStory.valuesSubtitle')}</h2>
          <div className="values-grid-new">
             {t('ourStory.values', { returnObjects: true }).map((val, idx) => (
               <div key={val.id} className="value-card-dark">
                  <div className="value-icon-circle">
                    {idx === 0 && <Shield size={24} />}
                    {idx === 1 && <Globe size={24} />}
                    {idx === 2 && <Zap size={24} />}
                  </div>
                  <h3>{val.title}</h3>
                  <p>{val.desc}</p>
               </div>
             ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section scroll-animate stag-1">
           <div className="team-header">
              <span className="badge-red-small">{t('ourStory.teamTitle')}</span>
              <h2>{t('ourStory.teamSubtitle')}</h2>
           </div>
           <div className="team-grid">
              {t('ourStory.team', { returnObjects: true }).map((m, idx) => (
                <div key={m.id} className="team-member">
                   <div className="member-photo-wrapper">
                      <img src={teamImages[idx]} alt={m.name} />
                   </div>
                   <h4>{m.name}</h4>
                   <p>{m.role}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Stats Section */}
        <section className="story-stats-section scroll-animate stag-2">
           <div className="stats-grid-story">
              {t('ourStory.stats', { returnObjects: true }).map((s, i) => (
                <div key={i} className="stat-item-story">
                   <h3>{s.value}</h3>
                   <p>{s.label}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Final CTA */}
        <section className="story-final-cta scroll-animate stag-3">
           <h2>{t('ourStory.ctaTitle')}</h2>
           <p>{t('ourStory.ctaSubtitle')}</p>
           <button className="contact-btn-red">{t('ourStory.ctaBtn')}</button>
        </section>

      </div>
    </div>
  );
}

export default OurStory;
