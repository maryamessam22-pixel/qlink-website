import React, { useEffect, useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import SetupSection from '../../components/Sections/SetupSection';
import AppPromoSection from '../../components/Sections/AppPromoSection';
import DynamicBackground from '../../components/common/DynamicBackground';
import './TheBracelet.css';

// Using available images from assets
import watchImg from '../../assets/images/w1.png';
import tacticalImg from '../../assets/images/w4.png';
import mobilesImg from '../../assets/images/2mobiles.png';

const TheBracelet = () => {
  const { t, lang } = useContext(LanguageContext);

  useEffect(() => {
    // Add this any thing at root the animation called IntersectionObserver as requested
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          // Add removal of class to replay animation when scrolling back up
          // entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.15, rootMargin: '-50px' });

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`bracelet-page-container ${lang === 'ar' ? 'rtl-text' : ''}`}>
      {/* Adding this dynamicballs background */}
      <DynamicBackground />
      
      <div className="bracelet-header-section scroll-animate stag-1">
        <h1 className="bracelet-title">{t('bracelet.title')}</h1>
        <p className="bracelet-subtitle">
          {t('bracelet.subtitle').split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}
        </p>
      </div>

      <div className="bracelet-products-grid">
        {/* Nova Touchscreen Card */}
        <div className="bracelet-product-card scroll-animate stag-2">
          <div className="bracelet-card-img-wrapper" style={{background: 'linear-gradient(135deg, rgba(80,80,100,0.8), rgba(40,40,50,0.9))'}}>
            <img src={watchImg} alt="Qlink Nova" style={{filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))'}} />
          </div>
          <h2 className="bracelet-card-title">{t('bracelet.novaTitle')}</h2>
          <p className="bracelet-card-subtitle">{t('bracelet.novaSub')}</p>
          
          <ul className="bracelet-card-features">
            {t('bracelet.novaFeatures').map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
          
          <div className="bracelet-card-price">{t('bracelet.priceNova')}</div>
          <button className="bracelet-card-btn">{t('bracelet.btnView')}</button>
        </div>

        {/* Pulse Tactical Card */}
        <div className="bracelet-product-card scroll-animate stag-3">
          <div className="bracelet-card-img-wrapper" style={{background: 'linear-gradient(135deg, rgba(230,230,230,0.9), rgba(180,180,180,0.8))'}}>
            <img src={tacticalImg} alt="Qlink Pulse" style={{filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))'}} />
          </div>
          <h2 className="bracelet-card-title">{t('bracelet.pulseTitle')}</h2>
          <p className="bracelet-card-subtitle">{t('bracelet.pulseSub')}</p>
          
          <ul className="bracelet-card-features">
            {t('bracelet.pulseFeatures').map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
          
          <div className="bracelet-card-price">{t('bracelet.pricePulse')}</div>
          <button className="bracelet-card-btn">{t('bracelet.btnView')}</button>
        </div>
      </div>

      {/* Setup in seconds section */}
      <div className="scroll-animate stag-1">
        <SetupSection />
      </div>
      
      {/* App Promo Section */}
      <div className="scroll-animate stag-2">
        <AppPromoSection imageSrc={mobilesImg} imgClassName="promo-phones-img" />
      </div>

    </div>
  );
};

export default TheBracelet;
