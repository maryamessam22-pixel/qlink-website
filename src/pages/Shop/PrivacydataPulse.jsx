import React, { useState, useEffect, useContext } from 'react';
import SEO from '../../components/common/SEO';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Droplets, Zap, Shield, ShoppingCart,
  Truck, ShieldCheck, Undo2, CheckCircle2, Lock
} from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import DynamicBackground from '../../components/common/DynamicBackground';
import './ProductSubPage.css';

import mainImg from '../../assets/images/w4.png';
import thumb1 from '../../assets/images/watch.png';
import thumb2 from '../../assets/images/1img.png';
import thumb3 from '../../assets/images/2img.png';
import thumb4 from '../../assets/images/3img.png';

const PrivacydataPulse = () => {
  const { t, lang } = useContext(LanguageContext);
  const navigate = useNavigate();
  const isAr = lang === 'ar';
  const [qty, setQty] = useState(1);
  const [activeColor, setActiveColor] = useState('gray');
  const [selectedImg, setSelectedImg] = useState(mainImg);

  const colors = [
    { id: 'gray', name: t('pulseDetails.colorGray'), hex: '#5C5C5C' },
    { id: 'dark', name: t('pulseDetails.colorDark'), hex: '#1C1C24' },
    { id: 'ruby', name: t('pulseDetails.colorRuby'), hex: '#9B1B30' },
    { id: 'blue', name: t('pulseDetails.colorBlue'), hex: '#2B6CB0' },
  ];

  useEffect(() => {
    const savedY = sessionStorage.getItem('tabScrollY');
    if (savedY) {
      window.scrollTo(0, parseInt(savedY, 10));
      sessionStorage.removeItem('tabScrollY');
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
    }, { threshold: 0.15, rootMargin: '-50px' });
    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goTab = (path) => {
    sessionStorage.setItem('tabScrollY', window.scrollY);
    navigate(path);
  };

  return (
    <div className={`subpage-container ${isAr ? 'rtl-text' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
      <SEO
        title={isAr ? 'بالس - بيانات الخصوصية' : 'Pulse – Privacy Data'}
        description={isAr ? 'بيانات الخصوصية لسوار كيو لينك بالس' : 'Privacy data details for Qlink Pulse.'}
        slug="shop/pulse/privacy"
      />
      <DynamicBackground />

      <div className="subpage-wrapper">
        <Link to="/shop/bracelet" className="back-btn scroll-animate">
          <ArrowLeft size={20} style={isAr ? { transform: 'rotate(180deg)' } : {}} />
          {t('pulseDetails.back')}
        </Link>

        <div className="subpage-product-top">
          {/* Gallery */}
          <div className="subpage-gallery scroll-animate stag-1">
            <div className="main-image-wrapper">
              <img src={selectedImg} alt={t('pulseDetails.title')} />
            </div>
            <div className="thumbnail-group">
              {[mainImg, thumb1, thumb2, thumb3, thumb4].map((img, i) => (
                <div key={i} className={`thumb ${selectedImg === img ? 'active' : ''}`} onClick={() => setSelectedImg(img)}>
                  <img src={img} alt={`Thumb ${i}`} />
                </div>
              ))}
            </div>
            <div className="perks-row">
              <div className="perk-box"><Droplets size={22} color="#3b82f6" /><span className="perk-text">{t('pulseDetails.perk1')}</span></div>
              <div className="perk-box"><Zap size={22} color="#10b981" /><span className="perk-text">{t('pulseDetails.perk2')}</span></div>
              <div className="perk-box"><Shield size={22} color="#E03232" /><span className="perk-text">{t('pulseDetails.perk3')}</span></div>
            </div>
          </div>

          {/* Info */}
          <div className="subpage-info scroll-animate stag-2">
            <h1 className="subpage-title">{t('pulseDetails.title')}</h1>
            <div className="subpage-subtitle">{t('pulseDetails.subtitle')}</div>
            <p className="subpage-desc">{t('pulseDetails.desc')}</p>
            <div className="price-row">
              <div className="price">{t('pulseDetails.price')}</div>
              <div className="reviews"><span>★★★★★</span> {t('pulseDetails.reviews')}</div>
            </div>
            <div className="finish-selector">
              <span className="finish-label">{t('pulseDetails.finish')}: <strong>{colors.find(c => c.id === activeColor)?.name}</strong></span>
              <div className="finish-options">
                {colors.map(c => (
                  <div key={c.id} className={`color-circle ${activeColor === c.id ? 'active' : ''}`}
                    style={{ backgroundColor: c.hex }} onClick={() => setActiveColor(c.id)} />
                ))}
              </div>
            </div>
            <div className="quantity-selector">
              <span className="finish-label">{t('pulseDetails.quantity')}</span>
              <div className="qty-controls">
                <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <div className="qty-val">{qty}</div>
                <button className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
              </div>
            </div>
            <div className="sizing-info">{t('pulseDetails.sizing')}</div>
            <div className="action-buttons">
              <button className="btn-buy"><Zap fill="white" size={18} /> {t('pulseDetails.buyNow')}</button>
              <button className="btn-cart"><ShoppingCart size={18} /> {t('pulseDetails.addCart')}</button>
            </div>
            <div className="guarantees">
              <div className="guarantee-item"><Truck size={15} /> {t('pulseDetails.ships')}</div>
              <div className="guarantee-item"><ShieldCheck size={15} /> {t('pulseDetails.warranty')}</div>
              <div className="guarantee-item"><Undo2 size={15} /> {t('pulseDetails.returns')}</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="subpage-tabs scroll-animate stag-3">
          <div className="tab-headers">
            <button className="tab-btn" onClick={() => goTab('/shop/pulse')}>{t('pulseDetails.tabDetail')}</button>
            <button className="tab-btn active">{t('pulseDetails.tabPrivacy')}</button>
            <button className="tab-btn" onClick={() => goTab('/shop/pulse/inbox')}>{t('pulseDetails.tabInbox')}</button>
          </div>

          <div className="privacy-panel">
            <div className="privacy-icon-wrap">
              <Lock size={32} color="#fff" strokeWidth={1.8} />
            </div>
            <h2>{t('pulseDetails.privacyTitle')}</h2>
            <ul className="privacy-list">
              <li><CheckCircle2 size={18} className="privacy-check" /><span>{t('pulseDetails.privacyItem1')}</span></li>
              <li><CheckCircle2 size={18} className="privacy-check" /><span>{t('pulseDetails.privacyItem2')}</span></li>
              <li><CheckCircle2 size={18} className="privacy-check" /><span>{t('pulseDetails.privacyItem3')}</span></li>
              <li><CheckCircle2 size={18} className="privacy-check" /><span>{t('pulseDetails.privacyItem4')}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacydataPulse;
