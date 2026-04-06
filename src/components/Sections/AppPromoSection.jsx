import React, { useEffect, useContext } from 'react';
import { Apple, Play } from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import './AppPromoSection.css';

const AppPromoSection = ({ imageSrc, imgClassName, customTitle, customFocus, customDesc }) => {
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
    }, { threshold: 0.15, rootMargin: '-50px' });

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={`app-promo-section ${lang === 'ar' ? 'rtl-text' : ''}`}>
      <div className="promo-container">
        <div className="promo-content scroll-animate stag-1">
          <h2>{customTitle || t('emergency.promoTitle')}<span className="red-text">{customFocus || t('emergency.promoFocus')}</span></h2>
          <p>{customDesc || t('emergency.promoDesc')}</p>
          <div className="promo-app-buttons">
            <button className="promo-app-btn">
              <Apple size={24} />
              <div className="btn-text">
                <span>{t('appSection.appStore')}</span>
                <strong>{t('appSection.appStoreTitle')}</strong>
              </div>
            </button>
            <button className="promo-app-btn secondary">
              <Play size={24} />
              <div className="btn-text">
                <span>{t('appSection.googlePlay')}</span>
                <strong>{t('appSection.googlePlayTitle')}</strong>
              </div>
            </button>
          </div>
        </div>
        <div className="promo-img scroll-animate stag-large-delay">
          <img src={imageSrc} alt="Qlink App Access" className={imgClassName} loading="lazy" />
        </div>
      </div>
    </section>
  );
};

export default AppPromoSection;
