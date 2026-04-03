import React, { useState, useEffect, useContext } from 'react';
import SEO from '../../components/common/SEO';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Droplets, Zap, ShoppingCart,
  Truck, ShieldCheck, Undo2, HeartPulse, Sparkles, CheckCircle2
} from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import DynamicBackground from '../../components/common/DynamicBackground';
import './ProductSubPage.css';

import mainImg from '../../assets/images/watch.png';
import thumb1 from '../../assets/images/w4.png';
import thumb2 from '../../assets/images/w3.png';
import thumb3 from '../../assets/images/w1.png';
import thumb4 from '../../assets/images/w2.png';

const InTheBoxNova = () => {
  const { t, lang } = useContext(LanguageContext);
  const navigate = useNavigate();
  const isAr = lang === 'ar';
  const [qty, setQty] = useState(1);
  const [activeColor, setActiveColor] = useState('black');
  const [selectedImg, setSelectedImg] = useState(mainImg);

  const colors = [
    { id: 'black', name: t('novaDetails.colorBlack'), hex: '#111' },
    { id: 'grey',  name: t('novaDetails.colorGrey'),  hex: '#9ca3af' },
    { id: 'red',   name: t('novaDetails.colorRed'),   hex: '#E03232' },
    { id: 'blue',  name: t('novaDetails.colorBlue'),  hex: '#3b82f6' },
  ];

  const boxItems = [
    { name: t('novaDetails.inboxItem1Name'), sub: t('novaDetails.inboxItem1Sub') },
    { name: t('novaDetails.inboxItem2Name'), sub: t('novaDetails.inboxItem2Sub') },
    { name: t('novaDetails.inboxItem3Name'), sub: t('novaDetails.inboxItem3Sub') },
    { name: t('novaDetails.inboxItem4Name'), sub: t('novaDetails.inboxItem4Sub') },
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
        title={isAr ? 'نوفا - محتويات العلبة' : 'Nova – In The Box'}
        description={isAr ? 'محتويات علبة كيو لينك نوفا' : "What's in the box for Qlink Nova."}
        slug="shop/nova/inbox"
      />
      <DynamicBackground />

      <div className="subpage-wrapper">
        <Link to="/shop/bracelet" className="back-btn scroll-animate">
          <ArrowLeft size={20} style={isAr ? { transform: 'rotate(180deg)' } : {}} />
          {t('novaDetails.back')}
        </Link>

        <div className="subpage-product-top">

          <div className="subpage-gallery scroll-animate stag-1">
            <div className="main-image-wrapper">
              <img src={selectedImg} alt={t('novaDetails.title')} />
            </div>
            <div className="thumbnail-group">
              {[mainImg, thumb1, thumb2, thumb3, thumb4].map((img, i) => (
                <div key={i} className={`thumb ${selectedImg === img ? 'active' : ''}`} onClick={() => setSelectedImg(img)}>
                  <img src={img} alt={`Thumb ${i}`} />
                </div>
              ))}
            </div>
            <div className="perks-row">
              <div className="perk-box"><Droplets size={22} color="#3b82f6" /><span className="perk-text">{t('novaDetails.perk1')}</span></div>
              <div className="perk-box"><HeartPulse size={22} color="#10b981" /><span className="perk-text">{t('novaDetails.perk2')}</span></div>
              <div className="perk-box"><Sparkles size={20} color="#E03232" /><span className="perk-text">{t('novaDetails.perk3')}</span></div>
            </div>
          </div>

      
          <div className="subpage-info scroll-animate stag-2">
            <h1 className="subpage-title">{t('novaDetails.title')}</h1>
            <div className="subpage-subtitle">{t('novaDetails.subtitle')}</div>
            <p className="subpage-desc">{t('novaDetails.desc')}</p>
            <div className="price-row">
              <div className="price">{t('novaDetails.price')}</div>
              <div className="reviews"><span>★★★★★</span> {t('novaDetails.reviews')}</div>
            </div>
            <div className="finish-selector">
              <span className="finish-label">{t('novaDetails.finish')}: <strong>{colors.find(c => c.id === activeColor)?.name}</strong></span>
              <div className="finish-options">
                {colors.map(c => (
                  <div key={c.id} className={`color-circle ${activeColor === c.id ? 'active' : ''}`}
                    style={{ backgroundColor: c.hex }} onClick={() => setActiveColor(c.id)} />
                ))}
              </div>
            </div>
            <div className="quantity-selector">
              <span className="finish-label">{t('novaDetails.quantity')}</span>
              <div className="qty-controls">
                <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <div className="qty-val">{qty}</div>
                <button className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
              </div>
            </div>
            <div className="sizing-info">{t('novaDetails.sizing')}</div>
            <div className="action-buttons">
              <button className="btn-buy"><Zap fill="white" size={18} /> {t('novaDetails.buyNow')}</button>
              <button className="btn-cart"><ShoppingCart size={18} /> {t('novaDetails.addCart')}</button>
            </div>
            <div className="guarantees">
              <div className="guarantee-item"><Truck size={15} /> {t('novaDetails.ships')}</div>
              <div className="guarantee-item"><ShieldCheck size={15} /> {t('novaDetails.warranty')}</div>
              <div className="guarantee-item"><Undo2 size={15} /> {t('novaDetails.returns')}</div>
            </div>
          </div>
        </div>

   
        <div className="subpage-tabs scroll-animate stag-3">
          <div className="tab-headers">
            <button className="tab-btn" onClick={() => goTab('/shop/nova')}>{t('novaDetails.tabDetail')}</button>
            <button className="tab-btn" onClick={() => goTab('/shop/nova/privacy')}>{t('novaDetails.tabPrivacy')}</button>
            <button className="tab-btn active">{t('novaDetails.tabInbox')}</button>
          </div>

          <div className="inbox-grid">
            {boxItems.map((item, i) => (
              <div key={i} className="inbox-card">
                <CheckCircle2 size={20} className="inbox-check" />
                <h4>{item.name}</h4>
                <span>{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InTheBoxNova;
