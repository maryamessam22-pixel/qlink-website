import React, { useEffect, useContext } from 'react';
import { Apple, Play } from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import './AppPromoSection.css';

const AppPromoSection = ({ imageSrc }) => {
  const { t, lang } = useContext(LanguageContext);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
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
    <section className={`app-promo-section scroll-animate ${lang === 'ar' ? 'rtl-text' : ''}`}>
      <div className="promo-content">
        <h2>{t('emergency.promoTitle')}<span className="red-text">{t('emergency.promoFocus')}</span></h2>
        <p>{t('emergency.promoDesc')}</p>
        <div className={`promo-app-buttons ${lang === 'ar' ? 'rtl-buttons' : ''}`}>
          <button className="promo-app-btn">
             <Apple size={24} />
             <div className="btn-text" style={lang === 'ar' ? {textAlign: 'right'} : {}}>
               <span>{t('appSection.appStore')}</span>
               <strong>{t('appSection.appStoreTitle')}</strong>
             </div>
          </button>
          <button className="promo-app-btn" style={{background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)'}}>
             <Play size={24} />
             <div className="btn-text" style={lang === 'ar' ? {textAlign: 'right'} : {}}>
               <span>{t('appSection.googlePlay')}</span>
               <strong>{t('appSection.googlePlayTitle')}</strong>
             </div>
          </button>
        </div>
      </div>
      <div className="promo-img">
        <img src={imageSrc} alt="Qlink App Access" />
      </div>
    </section>
  );
};

export default AppPromoSection;
