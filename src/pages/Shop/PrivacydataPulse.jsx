import React, { useState, useEffect, useContext } from 'react';
import SEO from '../../components/common/SEO';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Droplets, Zap, Shield, ShoppingCart,
  Truck, ShieldCheck, Undo2, CheckCircle2, Lock
} from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { supabase } from '../../lib/Supabase';
import './ProductSubPage.css';

const checkIsVideo = (url) => {
  if (!url) return false;
  return url.toLowerCase().match(/\.(mp4|webm|ogg)$/i);
};

const PrivacydataPulse = () => {
  const { t, lang } = useContext(LanguageContext);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const isAr = lang === 'ar';

  const [qty, setQty] = useState(1);
  const [activeColor, setActiveColor] = useState('gray');
  const [strapType, setStrapType] = useState('solid'); // 'solid' or 'woven'
  
  const [product, setProduct] = useState(null);
  const [seoData, setSeoData] = useState(null);
  const [selectedImg, setSelectedImg] = useState('');
  const [loading, setLoading] = useState(true);

  const colors = [
    { id: 'gray', name: t('pulseDetails.colorGray'), hex: '#5C5C5C' },
    { id: 'dark', name: t('pulseDetails.colorDark'), hex: '#1C1C24' },
    { id: 'ruby', name: t('pulseDetails.colorRuby'), hex: '#9B1B30' },
    { id: 'blue', name: t('pulseDetails.colorBlue'), hex: '#2B6CB0' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: prodData } = await supabase
          .from('products')
          .select('*')
          .eq('slug', 'qlink-pulse')
          .single();
          
        if (prodData) {
          setProduct(prodData);
          setSelectedImg(prodData.image_url);
        }

        const { data: seo } = await supabase
          .from('seo')
          .select('*')
          .eq('slug', 'shop/pulse/privacy')
          .single();
        if (seo) setSeoData(seo);

      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    const savedY = sessionStorage.getItem('tabScrollY');
    if (savedY) {
      window.scrollTo(0, parseInt(savedY, 10));
      sessionStorage.removeItem('tabScrollY');
    }
  }, []);

  useEffect(() => {
    if (loading || !product) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
    }, { threshold: 0.15, rootMargin: '-50px' });
    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [loading, product]);

  const goTab = (path) => {
    sessionStorage.setItem('tabScrollY', window.scrollY);
    navigate(path);
  };

  const galleryImages = React.useMemo(() => {
    if (!product?.['gallery-images']) return [];
    try {
      return typeof product['gallery-images'] === 'string'
        ? JSON.parse(product['gallery-images'])
        : product['gallery-images'];
    } catch { return []; }
  }, [product]);

  const allThumbs = [product?.image_url, ...galleryImages].filter(Boolean);
  const imgAltText = product?.featured_image_alt || (isAr ? product?.name_ar : product?.name_en);

  const handleColorChange = (colorId) => {
    setActiveColor(colorId);
    if (colorId === 'gray' && allThumbs[0]) setSelectedImg(allThumbs[0]);
    else if (colorId === 'dark' && allThumbs[1]) setSelectedImg(allThumbs[1]);
    else if (colorId === 'ruby' && allThumbs[2]) setSelectedImg(allThumbs[2]);
    else if (colorId === 'blue') {
      if (strapType === 'woven' && allThumbs[4]) setSelectedImg(allThumbs[4]);
      else if (allThumbs[3]) setSelectedImg(allThumbs[3]);
    }
  };

  const handleStrapChange = (type) => {
    setStrapType(type);
    if (activeColor === 'blue') {
      if (type === 'woven' && allThumbs[4]) setSelectedImg(allThumbs[4]);
      else if (allThumbs[3]) setSelectedImg(allThumbs[3]);
    }
  };

  if (loading) {
    return (
      <div className="subpage-loading-container">
        <h2 className="subpage-loading-text">
          {isAr ? 'جاري تحميل التفاصيل...' : 'Loading Details...'}
        </h2>
        <div className="loading-dots">
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`subpage-container ${isAr ? 'rtl-text' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
      <SEO
        title={seoData ? (isAr ? seoData.title_ar : seoData.title_en) : (isAr ? 'بالس - بيانات الخصوصية' : 'Pulse – Privacy Data')}
        description={seoData ? (isAr ? seoData.description_ar : seoData.description_en) : ''}
        slug="shop/pulse/privacy"
      />

      <div className="subpage-wrapper">
        <Link to="/shop/bracelet" className="back-btn scroll-animate">
          <ArrowLeft size={20} style={isAr ? { transform: 'rotate(180deg)' } : {}} />
          {t('pulseDetails.back')}
        </Link>

        <div className="subpage-product-top">
          <div className="subpage-gallery scroll-animate stag-1">
            <div className="main-image-wrapper">
              {checkIsVideo(selectedImg) ? (
                <video src={selectedImg} controls autoPlay muted loop />
              ) : (
                <img src={selectedImg} alt={imgAltText} />
              )}
            </div>
            <div className="thumbnail-group">
              {allThumbs.map((img, i) => (
                <div key={i} className={`thumb ${selectedImg === img ? 'active' : ''}`} onClick={() => setSelectedImg(img)}>
                  {checkIsVideo(img) ? (
                    <video src={img} muted playsInline className="thumb-media" />
                  ) : (
                    <img src={img} alt={`Thumb ${i}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="perks-row">
              <div className="perk-box"><Droplets size={22} color="#3b82f6" /><span className="perk-text">{t('pulseDetails.perk1')}</span></div>
              <div className="perk-box"><Zap size={22} color="#10b981" /><span className="perk-text">{t('pulseDetails.perk2')}</span></div>
              <div className="perk-box"><Shield size={22} color="#E03232" /><span className="perk-text">{t('pulseDetails.perk3')}</span></div>
            </div>
          </div>

          <div className="subpage-info scroll-animate stag-2">
            <h1 className="subpage-title">{isAr ? product.name_ar : product.name_en}</h1>
            <div className="subpage-subtitle">{isAr ? product.subtitle_ar : product.subtitle_en}</div>
            <p className="subpage-desc">{isAr ? product.description_ar : product.description_en}</p>
            <div className="price-row">
              <div className="price">{product.price} EGP</div>
              <div className="reviews"><span>★★★★★</span> {t('pulseDetails.reviews')}</div>
            </div>
            <div className="finish-selector">
              <span className="finish-label">{t('pulseDetails.finish')}: <strong>{colors.find(c => c.id === activeColor)?.name}</strong></span>
              <div className="finish-options">
                {colors.map(c => (
                  <div key={c.id} className={`color-circle ${activeColor === c.id ? 'active' : ''}`}
                    style={{ backgroundColor: c.hex }} onClick={() => handleColorChange(c.id)} />
                ))}
              </div>
            </div>

            {activeColor === 'blue' && (
              <div className="strap-selector animate-fade-in" style={{ marginBottom: '32px' }}>
                <span className="finish-label">
                  {isAr ? 'نوع الحزام' : 'Strap Type'}: <strong>{strapType === 'solid' ? (isAr ? 'ناعم' : 'Solid') : (isAr ? 'منسوج' : 'Woven')}</strong>
                </span>
                <div className="strap-options" style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <button 
                    className={`strap-btn ${strapType === 'solid' ? 'active' : ''}`}
                    onClick={() => handleStrapChange('solid')}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '20px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: strapType === 'solid' ? 'var(--color-primary-red)' : 'rgba(255,255,255,0.05)',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '13px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {isAr ? 'ناعم' : 'Solid'}
                  </button>
                  <button 
                    className={`strap-btn ${strapType === 'woven' ? 'active' : ''}`}
                    onClick={() => handleStrapChange('woven')}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '20px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: strapType === 'woven' ? 'var(--color-primary-red)' : 'rgba(255,255,255,0.05)',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '13px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {isAr ? 'منسوج' : 'Woven'}
                  </button>
                </div>
              </div>
            )}

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
              <button className="btn-buy" onClick={() => {
                const selectedColor = colors.find(c => c.id === activeColor);
                addToCart({
                  slug: 'qlink-pulse',
                  name: isAr ? product.name_ar : product.name_en,
                  color: activeColor,
                  colorName: (colors.find(c => c.id === activeColor)?.name || activeColor) + (activeColor === 'blue' ? ` (${strapType === 'solid' ? (isAr ? 'ناعم' : 'Solid') : (isAr ? 'منسوج' : 'Woven')})` : ''),
                  strap: strapType,
                  qty,
                  price: product.price,
                  image: selectedImg || product.image_url
                });
                navigate('/checkout');
              }}>
                <Zap fill="white" size={18} /> {t('pulseDetails.buyNow')}
              </button>
              <button className="btn-cart" onClick={() => {
                const selectedColor = colors.find(c => c.id === activeColor);
                addToCart({
                  slug: 'qlink-pulse',
                  name: isAr ? product.name_ar : product.name_en,
                  color: activeColor,
                  colorName: (colors.find(c => c.id === activeColor)?.name || activeColor) + (activeColor === 'blue' ? ` (${strapType === 'solid' ? (isAr ? 'ناعم' : 'Solid') : (isAr ? 'منسوج' : 'Woven')})` : ''),
                  strap: strapType,
                  qty,
                  price: product.price,
                  image: selectedImg || product.image_url
                });
                navigate('/cart');
              }}>
                <ShoppingCart size={18} /> {t('pulseDetails.addCart')}
              </button>
            </div>
            <div className="guarantees">
              <div className="guarantee-item"><Truck size={15} /> {t('pulseDetails.ships')}</div>
              <div className="guarantee-item"><ShieldCheck size={15} /> {t('pulseDetails.warranty')}</div>
              <div className="guarantee-item"><Undo2 size={15} /> {t('pulseDetails.returns')}</div>
            </div>
          </div>
        </div>

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
