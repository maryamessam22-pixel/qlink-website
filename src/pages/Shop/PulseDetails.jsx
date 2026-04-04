import React, { useState, useEffect, useContext } from 'react';
import SEO from '../../components/common/SEO';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Droplets, Zap, Shield, HeartPulse, 
  ShoppingCart, Truck, ShieldCheck, Undo2, WifiOff, Sparkles, Upload
} from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import DynamicBackground from '../../components/common/DynamicBackground';
import { supabase } from '../../lib/Supabase';
import './PulseDetails.css';

const PulseDetails = () => {
  const { productId } = useParams();
  const { t, lang } = useContext(LanguageContext);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const isAr = lang === 'ar';
  
  const [qty, setQty] = useState(1);
  const [activeColor, setActiveColor] = useState('gray');
  

  const [product, setProduct] = useState(null);
  const [seoData, setSeoData] = useState(null);
  const [selectedImg, setSelectedImg] = useState('');
  const [loading, setLoading] = useState(true);

  const colors = [
    { id: 'gray', name: t('pulseDetails.colorGray'), hex: '#5C5C5C' },
    { id: 'dark', name: t('pulseDetails.colorDark'), hex: '#1C1C24' },
    { id: 'ruby', name: t('pulseDetails.colorRuby'), hex: '#9B1B30' },
    { id: 'blue', name: t('pulseDetails.colorBlue'), hex: '#2B6CB0' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch Product Details
        const { data: prodData } = await supabase
          .from('products')
          .select('*')
          .eq('slug', 'qlink-pulse')
          .single();
          
        if (prodData) {
          setProduct(prodData);
          setSelectedImg(prodData.image_url);
        }

        // Fetch SEO Details
        const { data: seo } = await supabase
          .from('seo')
          .select('*')
          .eq('slug', 'shop/pulse')
          .single();
        if (seo) setSeoData(seo);

      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Animation Observer
  useEffect(() => {
    if (loading || !product) return; 

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
  }, [loading, product]);

  const goTab = (path) => {
    sessionStorage.setItem('tabScrollY', window.scrollY);
    navigate(path);
  };

  const mainImg = product?.image_url;
  
  // My Images that i add at Supabase is (JSON string or array)
  const galleryImages = React.useMemo(() => {
    if (!product?.['gallery-images']) return [];
    try {
      return typeof product['gallery-images'] === 'string'
        ? JSON.parse(product['gallery-images'])
        : product['gallery-images'];
    } catch { return []; }
  }, [product]);

 
  const allThumbs = [mainImg, ...galleryImages].filter(Boolean);

  return (
    <div className={`pulse-details-container ${isAr ? 'rtl-text' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
      <SEO 
        title={seoData ? (isAr ? seoData.title_ar : seoData.title_en) : (isAr ? 'بولس' : 'Pulse')}
        description={seoData ? (isAr ? seoData.description_ar : seoData.description_en) : ''}
        slug="shop/pulse"
      />
      <DynamicBackground />
  
      {loading ? (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '8px', color: '#ffffff' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '400', margin: 0, letterSpacing: '0.5px' }}>
            {isAr ? 'جاري تحميل تفاصيل بولس...' : 'Loading Pulse Details...'}
          </h2>
          <div className="faqs-loading">
            <span className="faqs-loading-dot" />
            <span className="faqs-loading-dot" />
            <span className="faqs-loading-dot" />
          </div>
        </div>
      ) : (
       
        <div className="pulse-content-wrapper">
          
          <Link to="/shop/bracelet" className="back-btn scroll-animate">
            <ArrowLeft size={20} style={lang === 'ar' ? {transform: 'rotate(180deg)'} : {}} />
            {t('pulseDetails.back')}
          </Link>
          
          <div className="pulse-product-top">
            
            <div className="pulse-gallery-side scroll-animate stag-1">
              <div className="pulse-gallery">
                <div className="main-image-wrapper">
                  <img src={selectedImg} alt={isAr ? product.name_ar : product.name_en} className="main-featured-img" />
                </div>
                <div className="thumbnail-group">
                  {allThumbs.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      className={`thumb ${selectedImg === imgUrl ? 'active' : ''}`}
                      onClick={() => setSelectedImg(imgUrl)}
                    >
                      <img src={imgUrl} alt={`Thumb ${idx + 1}`} />
                    </div>
                  ))}
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
                  <h1 className="pulse-title">{isAr ? product.name_ar : product.name_en}</h1>
                  <div className="pulse-subtitle">{isAr ? product.subtitle_ar : product.subtitle_en}</div>
                  <p className="pulse-desc">{isAr ? product.description_ar : product.description_en}</p>
                  
                  <div className="price-row">
                    <div className="price">{product.price} EGP</div>
                    <div className="reviews">
                      <span>★★★★★</span>
                      {t('pulseDetails.reviews')}
                    </div>
                  </div>
                </div>
                
                <div className="floating-side-actions">
    
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
                <button className="btn-buy" onClick={() => {
                  const selectedColor = colors.find(c => c.id === activeColor);
                  addToCart({
                    slug: 'qlink-pulse',
                    name: isAr ? product.name_ar : product.name_en,
                    color: activeColor,
                    colorName: selectedColor?.name || activeColor,
                    qty,
                    price: product.price,
                    image: product.image_url
                  });
                  navigate('/checkout');
                }}>
                  <Zap fill="white" size={20} />
                  {t('pulseDetails.buyNow')}
                </button>
                <button className="btn-cart" onClick={() => {
                  const selectedColor = colors.find(c => c.id === activeColor);
                  addToCart({
                    slug: 'qlink-pulse',
                    name: isAr ? product.name_ar : product.name_en,
                    color: activeColor,
                    colorName: selectedColor?.name || activeColor,
                    qty,
                    price: product.price,
                    image: product.image_url
                  });
                  navigate('/cart');
                }}>
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
      )}
    </div>
  );
};

export default PulseDetails;