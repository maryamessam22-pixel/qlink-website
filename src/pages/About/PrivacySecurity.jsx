import React, { useEffect, useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import DynamicBackground from '../../components/common/DynamicBackground';
import AppPromoSection from '../../components/Sections/AppPromoSection';
import { ShieldCheck, Lock, EyeOff, Activity, AlertCircle, Download, CheckCircle2 } from 'lucide-react';
import './PrivacySecurity.css';

import promoMobiles from '../../assets/images/appscreen.png';

const PrivacySecurity = () => {
  const { t, lang } = useContext(LanguageContext);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '-50px' });

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`privacy-security-page ${lang === 'ar' ? 'rtl-text' : ''}`}>
      <DynamicBackground />
      
      <div className="ps-content-container">
        {/* Hero Section */}
        <header className="ps-header scroll-animate">
          <h1>
            {t('privacy.heroTitle')}
            <span className="red-text">{t('privacy.heroTitleHighlight')}</span>
          </h1>
          <p className="ps-hero-desc">{t('privacy.heroDesc')}</p>
        </header>

        {/* Data Promise */}
        <section className="ps-promise-section scroll-animate stag-1">
          <div className="ps-promise-card">
            <div className="ps-icon-box red-glow">
              <ShieldCheck size={28} />
            </div>
            <div className="ps-promise-text">
              <h2>{t('privacy.promiseTitle')}</h2>
              <p>{t('privacy.promiseDesc')}</p>
            </div>
          </div>
        </section>

        {/* Shared vs Not Shared */}
        <section className="ps-grid-section">
          <div className="ps-grid-container">
            <div className="ps-shared-card scroll-animate stag-1">
              <div className="ps-grid-header">
                <div className="ps-small-icon green">
                  <Lock size={20} />
                </div>
                <h3>{t('privacy.sharedTitle')}</h3>
              </div>
              <ul className="ps-list green">
                {t('privacy.sharedItems').map((item, idx) => (
                  <li key={idx}>
                    <span className="dot"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="ps-shared-card scroll-animate stag-2">
              <div className="ps-grid-header">
                <div className="ps-small-icon red">
                  <EyeOff size={20} />
                </div>
                <h3>{t('privacy.notSharedTitle')}</h3>
              </div>
              <ul className="ps-list red">
                {t('privacy.notSharedItems').map((item, idx) => (
                  <li key={idx}>
                    <span className="dot"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* You Are In Control */}
        <section className="ps-control-section scroll-animate">
          <div className="ps-control-box">
             <div className="ps-main-icon">
                <Activity size={32} />
             </div>
             <h2>{t('privacy.controlTitle')}</h2>
             <p>{t('privacy.controlDesc')}</p>
             <button className="ps-terms-btn">{t('privacy.controlBtn')}</button>
          </div>
        </section>

        {/* Offline Fallback & Disclaimer */}
        <section className="ps-fallback-section scroll-animate">
          <div className="ps-fallback-content">
             <h2>{t('privacy.protocolTitle')}</h2>
             <p>{t('privacy.protocolDesc')}</p>
          </div>

          <div className="ps-disclaimer-card scroll-animate stag-1">
             <div className="ps-disclaimer-header">
                <AlertCircle size={24} color="var(--color-primary-red)" />
                <h4>{t('privacy.disclaimerTitle')}</h4>
             </div>
             <p>{t('privacy.disclaimerDesc')}</p>
          </div>
        </section>

        {/* App Promo */}
        <section className="ps-app-promo-wrap scroll-animate">
           <header className="ps-app-header">
              <h2>{t('privacy.installTitle')} <span className="red-text">{t('privacy.installTitleRed')}</span></h2>
              <p>{t('privacy.installSubtitle')}</p>
           </header>
           
           <div className="ps-promo-inner">
             <div className="ps-promo-text">
                <h2>{t('privacy.promoTitle')}</h2>
                <p>{t('privacy.promoDesc')}</p>
                <div className="ps-promo-features">
                   <div className="p-feat"><CheckCircle2 size={18} className="green-check" /> {t('privacy.promoF1')}</div>
                   <div className="p-feat"><CheckCircle2 size={18} className="green-check" /> {t('privacy.promoF2')}</div>
                   <div className="p-feat"><CheckCircle2 size={18} className="green-check" /> {t('privacy.promoF3')}</div>
                </div>
                <div className="ps-store-row">
                   <button className="ps-store-btn light"><Download size={18} /> Download on the App Store</button>
                   <button className="ps-store-btn dark"><Activity size={18} /> Get it on Google Play</button>
                </div>
             </div>
             <div className="ps-promo-img-side">
                <img src={promoMobiles} alt="Qlink App" />
             </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacySecurity;
