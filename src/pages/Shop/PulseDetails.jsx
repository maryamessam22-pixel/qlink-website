import React, { useState, useEffect, useContext } from 'react';
import SEO from '../../components/common/SEO';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Droplets, Zap, Shield, HeartPulse, 
  ShoppingCart, Truck, ShieldCheck, Undo2, WifiOff, Sparkles, Upload
} from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import DynamicBackground from '../../components/common/DynamicBackground';
import './PulseDetails.css';


import mainImg from '../../assets/images/w4.png';
import thumb1 from '../../assets/images/watch.png'; 
import thumb2 from '../../assets/images/1img.png';
import thumb3 from '../../assets/images/2img.png';
import thumb4 from '../../assets/images/3img.png';

const PulseDetails = () => {
  const { productId } = useParams();
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
    { id: 'blue', name: t('pulseDetails.colorBlue'), hex: '#2B6CB0' }
  ];

  useEffect(() => {
    // IntersectionObserver to animate content
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.15, rootMargin: '-50px' });

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  const goTab = (path) => {
    sessionStorage.setItem('tabScrollY', window.scrollY);
    navigate(path);
  };

  return (
    <div className={`pulse-details-container ${isAr ? 'rtl-text' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
      <SEO 
        title={lang === 'ar' ? 'بولس' : 'Pulse'}
        description={lang === 'ar' ? 'اكتشف سوار كيو لينك بولس. خفيف الوزن ومتين.' : 'Discover the Qlink Pulse bracelet. Lightweight and durable.'}
        slug="shop/pulse"
      />
      <DynamicBackground />
      
      <div className="pulse-content-wrapper">
        
        
        <Link to="/shop/bracelet" className="back-btn scroll-animate">
          <ArrowLeft size={20} style={lang === 'ar' ? {transform: 'rotate(180deg)'} : {}} />
          {t('pulseDetails.back')}
        </Link>
        
        
        <div className="pulse-product-top">
          
          
          <div className="pulse-gallery-side scroll-animate stag-1">
            <div className="pulse-gallery">
              <div className="main-image-wrapper">
                <img src={selectedImg} alt="QLINK-PULSE Main" className="main-featured-img" />
              </div>
              <div className="thumbnail-group">
                <div className={`thumb ${selectedImg === mainImg ? 'active' : ''}`} onClick={() => setSelectedImg(mainImg)}>
                  <img src={mainImg} alt="Main Thumb" />
                </div>
                <div className={`thumb ${selectedImg === thumb1 ? 'active' : ''}`} onClick={() => setSelectedImg(thumb1)}>
                  <img src={thumb1} alt="Thumb 1" />
                </div>
                <div className={`thumb ${selectedImg === thumb2 ? 'active' : ''}`} onClick={() => setSelectedImg(thumb2)}>
                  <img src={thumb2} alt="Thumb 2" />
                </div>
                <div className={`thumb ${selectedImg === thumb3 ? 'active' : ''}`} onClick={() => setSelectedImg(thumb3)}>
                  <img src={thumb3} alt="Thumb 3" />
                </div>
                <div className={`thumb ${selectedImg === thumb4 ? 'active' : ''}`} onClick={() => setSelectedImg(thumb4)}>
                  <img src={thumb4} alt="Thumb 4" />
                </div>
              </div>
            </div>
            
            <div className="perks-row">
              <div className="perk-box">
                <Droplets size={24} color="#3b82f6" />
                <span className="perk-text">{t('pulseDetails.perk1')}</span>
              </div>
              <div className="perk-box">
                <Zap size={24} color="#10b981" />
                <span className="perk-text">{t('pulseDetails.perk2')}</span>
              </div>
              <div className="perk-box">
                <Shield size={24} color="#E03232" />
                <span className="perk-text">{t('pulseDetails.perk3')}</span>
              </div>
            </div>
          </div>
          
          
          <div className="pulse-info scroll-animate stag-2">
            <div className="info-top-flex">
              <div>
                <h1 className="pulse-title">{t('pulseDetails.title')}</h1>
                <div className="pulse-subtitle">{t('pulseDetails.subtitle')}</div>
                <p className="pulse-desc">{t('pulseDetails.desc')}</p>
                
                <div className="price-row">
                  <div className="price">{t('pulseDetails.price')}</div>
                  <div className="reviews">
                    <span>★★★★★</span>
                    {t('pulseDetails.reviews')}
                  </div>
                </div>
              </div>
              
              <div className="floating-side-actions">
                {/* <button className="action-circle">
                  <Sparkles size={20} color="#E03232" />
                </button>
                <button className="action-circle">
                  <Upload size={20} />
                </button> */}
              </div>
            </div>
            
            <div className="finish-selector">
              <span className="finish-label">
                {t('pulseDetails.finish')}: <strong>{colors.find(c => c.id === activeColor)?.name}</strong>
              </span>
              <div className="finish-options">
                {colors.map(color => (
                  <div 
                    key={color.id}
                    className={`color-circle ${activeColor === color.id ? 'active' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setActiveColor(color.id)}
                  ></div>
                ))}
              </div>
            </div>
            
            <div className="quantity-selector">
              <span className="finish-label">{t('pulseDetails.quantity')}</span>
              <div className="qty-controls">
                <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                <div className="qty-val">{qty}</div>
                <button className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
              </div>
            </div>
            
            <div className="sizing-info">
              {t('pulseDetails.sizing')}
            </div>
            
            <div className="action-buttons">
              <button className="btn-buy">
                <Zap fill="white" size={20} />
                {t('pulseDetails.buyNow')}
              </button>
              <button className="btn-cart">
                <ShoppingCart size={20} />
                {t('pulseDetails.addCart')}
              </button>
            </div>
            
            <div className="guarantees">
              <div className="guarantee-item">
                <Truck size={16} /> {t('pulseDetails.ships')}
              </div>
              <div className="guarantee-item">
                <ShieldCheck size={16} /> {t('pulseDetails.warranty')}
              </div>
              <div className="guarantee-item">
                <Undo2 size={16} /> {t('pulseDetails.returns')}
              </div>
            </div>
            
          </div>
        </div>
        
        
        <div className="pulse-tabs scroll-animate stag-3">
          <div className="tab-headers">
            <button className="tab-btn active">{t('pulseDetails.tabDetail')}</button>
            <button className="tab-btn" onClick={() => navigate('/shop/pulse/privacy')}>{t('pulseDetails.tabPrivacy')}</button>
            <button className="tab-btn" onClick={() => navigate('/shop/pulse/inbox')}>{t('pulseDetails.tabInbox')}</button>
          </div>
          
          <div className="bridge-content">
            <h3>{t('pulseDetails.bridgeTitle')}</h3>
            <p>{t('pulseDetails.bridgeDesc1')}</p>
            
            <div className="bridge-features">
              <div className="feat-box">
                <WifiOff size={32} color="#E03232" />
                <h4>{t('pulseDetails.feature1Title')}</h4>
                <p>{t('pulseDetails.feature1Desc')}</p>
              </div>
              <div className="feat-box">
                <Droplets size={32} color="#3b82f6" />
                <h4>{t('pulseDetails.feature2Title')}</h4>
                <p>{t('pulseDetails.feature2Desc')}</p>
              </div>
              <div className="feat-box">
                <Zap size={32} color="#10b981" />
                <h4>{t('pulseDetails.feature3Title')}</h4>
                <p>{t('pulseDetails.feature3Desc')}</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default PulseDetails;
