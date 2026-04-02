import React, { useEffect, useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import DynamicBackground from '../../components/common/DynamicBackground';
import AppPromoSection from '../../components/Sections/AppPromoSection';
import { ShieldCheck, Lock, EyeOff, Activity, AlertCircle, CheckCircle2, Apple, Play } from 'lucide-react';
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

        {/* Shared vs Not Shared — full-bleed dark band */}
        <section className="ps-grid-section">
          <div className="ps-grid-band">
            <div className="ps-grid-band-inner">
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
        <section className="ps-fallback-section">
          <div className="ps-fallback-band">
            <div className="ps-fallback-band-inner">
              <div className="ps-fallback-content scroll-animate">
                <h2>{t('privacy.protocolTitle')}</h2>
                <p>{t('privacy.protocolDesc')}</p>
              </div>

              <div className="ps-disclaimer-card scroll-animate stag-1">
                <div className="ps-disclaimer-header">
                  <div className="ps-disclaimer-icon-box">
                    <AlertCircle size={22} />
                  </div>
                  <h4>{t('privacy.disclaimerTitle')}</h4>
                </div>
                <p>{t('privacy.disclaimerDesc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* App Promo */}
        <section className="ps-app-promo-wrap scroll-animate">
           <header className="ps-app-header">
             <div className="ps-app-header-inner">
               <h2>{t('privacy.installTitle')} <span className="red-text">{t('privacy.installTitleRed')}</span></h2>
               <p>{t('privacy.installSubtitle')}</p>
             </div>
           </header>
           
           <div className="ps-promo-inner">
             <div className="ps-promo-row">
               <div className="app-text">
                 <h2 className="split-title">{t('appSection.title')}</h2>
                 <p className="split-desc">
                   {t('appSection.desc')}
                 </p>
                 <ul className="app-list">
                   <li className="app-list-item"><CheckCircle2 size={18} className="check" /> {t('appSection.l1')}</li>
                   <li className="app-list-item"><CheckCircle2 size={18} className="check" /> {t('appSection.l2')}</li>
                   <li className="app-list-item"><CheckCircle2 size={18} className="check" /> {t('appSection.l3')}</li>
                 </ul>
                 <div className={`store-buttons ${lang === 'ar' ? 'rtl-buttons' : ''}`}>
                   <a href="#" className="store-btn">
                     <Apple size={28} />
                     <div className="store-btn-text">
                       <span className="store-btn-sub">{t('appSection.appStore')}</span>
                       <span className="store-btn-title">{t('appSection.appStoreTitle')}</span>
                     </div>
                   </a>
                   <a href="#" className="store-btn store-btn-google">
                     <Play size={28} />
                     <div className="store-btn-text">
                       <span className="store-btn-sub">{t('appSection.googlePlay')}</span>
                       <span className="store-btn-title">{t('appSection.googlePlayTitle')}</span>
                     </div>
                   </a>
                 </div>
               </div>
               <div className="app-image">
                 <img src={promoMobiles} alt="Qlink App" className="floating-app-screen img-shadow-dark" />
               </div>
             </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacySecurity;
