import React, { useState, useEffect, useContext } from 'react';
import SEO from '../../components/common/SEO';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Star, Droplets, Zap, Shield, HeartPulse, 
  ShoppingCart, Truck, ShieldCheck, Undo2, WifiOff, Sparkles, Waves
} from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import DynamicBackground from '../../components/common/DynamicBackground';
import { supabase } from '../../lib/Supabase';
import './NovaDetails.css';


const checkIsVideo = (url) => {
  if (!url) return false;
  return url.toLowerCase().match(/\.(mp4|webm|ogg)$/i);
};

const NovaDetails = () => {
  const { productId } = useParams();
  const { t, lang } = useContext(LanguageContext);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const isAr = lang === 'ar';
  
  const [qty, setQty] = useState(1);
  const [activeColor, setActiveColor] = useState('black');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  
  const [product, setProduct] = useState(null);
  const [seoData, setSeoData] = useState(null);
  const [selectedImg, setSelectedImg] = useState('');
  const [loading, setLoading] = useState(true);

  const colors = [
    { id: 'black', name: t('novaDetails.colorBlack'), hex: '#111' },
    { id: 'grey', name: t('novaDetails.colorGrey'), hex: '#9ca3af' },
    { id: 'red', name: t('novaDetails.colorRed'), hex: '#E03232' },
    { id: 'blue', name: t('novaDetails.colorBlue'), hex: '#3b82f6' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: prodData } = await supabase
          .from('products')
          .select('*')
          .eq('slug', 'qlink-nova-touch')
          .single();
          
        if (prodData) {
          setProduct(prodData);
          
          let gImages = prodData['gallery-images'] || prodData.gallery_images || [];
          if (typeof gImages === 'string') {
            try { gImages = JSON.parse(gImages); } catch { gImages = []; }
          }
          
          setSelectedImg(gImages.length > 0 ? gImages[0] : prodData.image_url);
        }

        const { data: seo } = await supabase
          .from('seo')
          .select('*')
          .eq('slug', 'shop/nova')
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

  const galleryImages = React.useMemo(() => {
    const images = product?.['gallery-images'] || product?.gallery_images;
    if (!images) return [];
    try {
      return typeof images === 'string'
        ? JSON.parse(images)
        : images;
    } catch { return []; }
  }, [product]);

  const allThumbs = galleryImages.filter(Boolean);
  const imgAltText = product?.featured_image_alt || (isAr ? product?.name_ar : product?.name_en);


  const isSelectedVideo = checkIsVideo(selectedImg);

  return (
    <div className={`nova-details-container ${isAr ? 'rtl-text' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
      <SEO 
        title={seoData ? (isAr ? seoData.title_ar : seoData.title_en) : (isAr ? 'نوفا' : 'Nova')}
        description={seoData ? (isAr ? seoData.description_ar : seoData.description_en) : ''}
        slug="shop/nova"
      />
      <DynamicBackground />
      
      {loading ? (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1px', color: '#ffffff' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '400', margin: 0, letterSpacing: '0.5px' }}>
            {isAr ? 'جاري تحميل تفاصيل نوفا...' : 'Loading Nova Details...'}
          </h2>
          <div className="faqs-loading">
            <span className="faqs-loading-dot" />
            <span className="faqs-loading-dot" />
            <span className="faqs-loading-dot" />
          </div>
        </div>
      ) : (

        <div className="nova-content-wrapper">
          
          <Link to="/shop/bracelet" className="back-btn scroll-animate">
            <ArrowLeft size={20} style={lang === 'ar' ? {transform: 'rotate(180deg)'} : {}} />
            {t('novaDetails.back')}
          </Link>
     
          <div className="nova-product-top">
            
            <div className="nova-gallery-side scroll-animate stag-1">
              <div className="nova-gallery">
                <div className="main-image-wrapper">
                 
                  {isSelectedVideo ? (
                    <video 
                      src={selectedImg} 
                      controls 
                      autoPlay 
                      muted 
                      loop 
                      className="main-featured-img"
                    />
                  ) : (
                    <img src={selectedImg} alt={imgAltText} className="main-featured-img" />
                  )}
                </div>
                
                <div className="thumbnail-group">
                  {allThumbs.map((mediaUrl, idx) => {
                    const isVid = checkIsVideo(mediaUrl);
                    return (
                      <div
                        key={idx}
                        className={`thumb ${selectedImg === mediaUrl ? 'active' : ''}`}
                        onClick={() => setSelectedImg(mediaUrl)}
                      >
           
                        {isVid ? (
                          <video 
                            src={mediaUrl} 
                            muted 
                            playsInline
                            className="thumb-media"
                          />
                        ) : (
                          <img src={mediaUrl} alt={`Thumb ${idx + 1}`} className="thumb-media" />
                        )}
                      </div>
                    );
                  })}
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
            
            <div className="nova-info scroll-animate stag-2">
              <h1 className="nova-title">{isAr ? product.name_ar : product.name_en}</h1>
              <div className="nova-subtitle">{isAr ? product.subtitle_ar : product.subtitle_en}</div>
              <p className="nova-desc">{isAr ? product.description_ar : product.description_en}</p>
              
              <div className="price-row">
                <div className="price">{product.price} EGP</div>
                <div className="reviews-section">
                  <div className="dynamic-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={18}
                        className={`rating-star ${(hoverRating || rating) >= star ? 'filled' : ''}`}
                        fill={(hoverRating || rating) >= star ? "gold" : "none"}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        style={{ cursor: 'pointer', transition: 'transform 0.2s ease' }}
                      />
                    ))}
                  </div>
                  <span className="reviews-count">
                    {t('novaDetails.reviews')}
                  </span>
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
                <button className="btn-buy" onClick={() => {
                  const selectedColor = colors.find(c => c.id === activeColor);
                  addToCart({
                    slug: 'qlink-nova-touch',
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
                  {t('novaDetails.buyNow')}
                </button>
                <button className="btn-cart" onClick={() => {
                  const selectedColor = colors.find(c => c.id === activeColor);
                  addToCart({
                    slug: 'qlink-nova-touch',
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
      )}
    </div>
  );
};

export default NovaDetails;