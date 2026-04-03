import React, { useState, useEffect, useContext } from 'react';
import SEO from '../../components/common/SEO';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Star, Droplets, Zap, Shield, HeartPulse, 
  ShoppingCart, Truck, ShieldCheck, Undo2, WifiOff, Sparkles, Waves
} from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import DynamicBackground from '../../components/common/DynamicBackground';
import './NovaDetails.css';

// Using available images from assets
// import mainImg from '../../assets/images/QLINK-NOVA.png';
import mainImg from '../../assets/images/watch.png';
import thumb1 from '../../assets/images/w4.png';
import thumb2 from '../../assets/images/w3.png';
import thumb3 from '../../assets/images/w1.png';
import thumb4 from '../../assets/images/w2.png';

const NovaDetails = () => {
  const { productId } = useParams();
  const { t, lang } = useContext(LanguageContext);
  const navigate = useNavigate();
  const isAr = lang === 'ar';
  const [qty, setQty] = useState(1);
  const [activeColor, setActiveColor] = useState('black');
  const [selectedImg, setSelectedImg] = useState(mainImg);
  
  const colors = [
    { id: 'black', name: t('novaDetails.colorBlack'), hex: '#111' },
    { id: 'grey', name: t('novaDetails.colorGrey'), hex: '#9ca3af' },
    { id: 'red', name: t('novaDetails.colorRed'), hex: '#E03232' },
    { id: 'blue', name: t('novaDetails.colorBlue'), hex: '#3b82f6' }
  ];

  useEffect(() => {
    // IntersectionObserver to animate content just like in TheBracelet
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
    <div className={`nova-details-container ${isAr ? 'rtl-text' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
      <SEO 
        title={lang === 'ar' ? 'نوفا' : 'Nova'}
        description={lang === 'ar' ? 'اكتشف سوار كيو لينك نوفا. الأداء العالي والأمان المتكامل.' : 'Discover the Qlink Nova bracelet. High performance and integrated safety.'}
        slug="shop/nova"
      />
      <DynamicBackground />
      
      <div className="nova-content-wrapper">
        
        {/* Back navigation */}
        <Link to="/shop/bracelet" className="back-btn scroll-animate">
          <ArrowLeft size={20} style={lang === 'ar' ? {transform: 'rotate(180deg)'} : {}} />
          {t('novaDetails.back')}
        </Link>
        
        {/* Top Product Section */}
        <div className="nova-product-top">
          
          {/* Left Side: Images & Perks */}
          <div className="nova-gallery-side scroll-animate stag-1">
            <div className="nova-gallery">
              <div className="main-image-wrapper">
                <img src={selectedImg} alt="QLINK-NOVA Main" className="main-featured-img" />
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
                <span className="perk-text">{t('novaDetails.perk1')}</span>
              </div>
              <div className="perk-box">
                <HeartPulse size={24} color="#10b981" />
                <span className="perk-text">{t('novaDetails.perk2')}</span>
              </div>
              <div className="perk-box">
                <Sparkles size={20} color="#E03232" />
                <span className="perk-text">{t('novaDetails.perk3')}</span>
              </div>
            </div>
          </div>
          
          {/* Right Side: Product Info */}
          <div className="nova-info scroll-animate stag-2">
            <h1 className="nova-title">{t('novaDetails.title')}</h1>
            <div className="nova-subtitle">{t('novaDetails.subtitle')}</div>
            <p className="nova-desc">{t('novaDetails.desc')}</p>
            
            <div className="price-row">
              <div className="price">{t('novaDetails.price')}</div>
              <div className="reviews">
                <span>★★★★★</span>
                {t('novaDetails.reviews')}
              </div>
            </div>
            
            <div className="finish-selector">
              <span className="finish-label">
                {t('novaDetails.finish')}: <strong>{colors.find(c => c.id === activeColor)?.name}</strong>
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
              <span className="finish-label">{t('novaDetails.quantity')}</span>
              <div className="qty-controls">
                <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                <div className="qty-val">{qty}</div>
                <button className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
              </div>
            </div>
            
            <div className="sizing-info">
              {t('novaDetails.sizing')}
            </div>
            
            <div className="action-buttons">
              <button className="btn-buy">
                <Zap fill="white" size={20} />
                {t('novaDetails.buyNow')}
              </button>
              <button className="btn-cart">
                <ShoppingCart size={20} />
                {t('novaDetails.addCart')}
              </button>
            </div>
            
            <div className="guarantees">
              <div className="guarantee-item">
                <Truck size={16} /> {t('novaDetails.ships')}
              </div>
              <div className="guarantee-item">
                <ShieldCheck size={16} /> {t('novaDetails.warranty')}
              </div>
              <div className="guarantee-item">
                <Undo2 size={16} /> {t('novaDetails.returns')}
              </div>
            </div>
            
          </div>
        </div>
        
        {/* Bottom Tabs Section */}
        <div className="nova-tabs scroll-animate stag-3">
          <div className="tab-headers">
            <button className="tab-btn active">{t('novaDetails.tabDetail')}</button>
            <button className="tab-btn" onClick={() => navigate('/shop/nova/privacy')}>{t('novaDetails.tabPrivacy')}</button>
            <button className="tab-btn" onClick={() => navigate('/shop/nova/inbox')}>{t('novaDetails.tabInbox')}</button>
          </div>
          
          <div className="bridge-content">
            <h3>{t('novaDetails.bridgeTitle')}</h3>
            <p>{t('novaDetails.bridgeDesc1')}</p>
            <p>{t('novaDetails.bridgeDesc2')}</p>
            
            <div className="bridge-features">
              <div className="feat-box">
                <WifiOff size={32} color="#E03232" />
                <h4>{t('novaDetails.feature1Title')}</h4>
                <p>{t('novaDetails.feature1Desc')}</p>
              </div>
              <div className="feat-box">
                <Waves size={32} color="#E03232" />
                <h4>{t('novaDetails.feature2Title')}</h4>
                <p>{t('novaDetails.feature2Desc')}</p>
              </div>
              <div className="feat-box">
                <Zap size={32} color="#10b981" />
                <h4>{t('novaDetails.feature3Title')}</h4>
                <p>{t('novaDetails.feature3Desc')}</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default NovaDetails;
