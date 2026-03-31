import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../context/LanguageContext';
import './ShopCTA.css';

const ShopCTA = () => {
  const { t, lang } = useContext(LanguageContext);
  const navigate = useNavigate();

  return (
    <section className={`shop-cta-section scroll-animate ${lang === 'ar' ? 'rtl-text' : ''}`}>
      <div className="shop-cta-content">
        <h2 className="shop-cta-title">
          {lang === 'ar' ? 'هل أنت مستعد لاختيار سوارك؟' : 'Ready To Pick Your Bracelet?'}
        </h2>
        <button 
          className="shop-cta-button"
          onClick={() => navigate('/shop/bracelet')}
        >
          {t('cta.btn')}
        </button>
      </div>
    </section>
  );
};

export default ShopCTA;
