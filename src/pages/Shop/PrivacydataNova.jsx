import React, { useState, useEffect, useContext } from 'react';
import SEO from '../../components/common/SEO';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Droplets, Zap, ShoppingCart,
  Truck, ShieldCheck, Undo2, HeartPulse, Sparkles, CheckCircle2, Lock
} from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { supabase } from '../../lib/Supabase';
import {
  resolveNovaGalleryUrl,
  formatNovaCartColorName,
  inferNovaSelectionFromGalleryIndex,
  novaGallerySlotFilled,
  getMergedNovaGallery,
} from './novaGalleryMap';
import './ProductSubPage.css';

const checkIsVideo = (url) => {
  if (!url) return false;
  return url.toLowerCase().match(/\.(mp4|webm|ogg)$/i);
};

const PrivacydataNova = () => {
  const { t, lang } = useContext(LanguageContext);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const isAr = lang === 'ar';

  const [qty, setQty] = useState(1);
  const [activeColor, setActiveColor] = useState('black');
  const [strapType, setStrapType] = useState('solid');
  
  const [product, setProduct] = useState(null);
  const [seoData, setSeoData] = useState(null);
  const [selectedImg, setSelectedImg] = useState('');
  const [loading, setLoading] = useState(true);

  const colors = [
    { id: 'black', name: t('novaDetails.colorBlack'), hex: '#111' },
    { id: 'grey',  name: t('novaDetails.colorGrey'),  hex: '#9ca3af' },
    { id: 'red',   name: t('novaDetails.colorRed'),   hex: '#E03232' },
    { id: 'blue',  name: t('novaDetails.colorBlue'),  hex: '#3b82f6' },
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
          const merged = getMergedNovaGallery(prodData);
          setSelectedImg(
            resolveNovaGalleryUrl(merged, 'black', 'solid') || prodData.image_url
          );
        }

        const { data: seo } = await supabase
          .from('seo')
          .select('*')
          .eq('slug', 'shop/nova/privacy')
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

  const galleryImages = React.useMemo(() => getMergedNovaGallery(product), [product]);

  const imgAltText = product?.featured_image_alt || (isAr ? product?.name_ar : product?.name_en);

  const handleColorChange = (colorId) => {
    setActiveColor(colorId);
    const url = resolveNovaGalleryUrl(galleryImages, colorId, strapType);
    if (url) setSelectedImg(url);
  };

  const handleStrapChange = (type) => {
    setStrapType(type);
    const url = resolveNovaGalleryUrl(galleryImages, activeColor, type);
    if (url) setSelectedImg(url);
  };

  const handleGalleryThumbClick = (mediaUrl, idx) => {
    setSelectedImg(mediaUrl);
    const sel = inferNovaSelectionFromGalleryIndex(idx);
    if (sel) {
      setActiveColor(sel.color);
      setStrapType(sel.strap);
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
        title={seoData ? (isAr ? seoData.title_ar : seoData.title_en) : (isAr ? 'نوفا - بيانات الخصوصية' : 'Nova – Privacy Data')}
        description={seoData ? (isAr ? seoData.description_ar : seoData.description_en) : ''}
        slug="shop/nova/privacy"
      />

      <div className="subpage-wrapper">
        <Link to="/shop/bracelet" className="back-btn scroll-animate">
          <ArrowLeft size={20} style={isAr ? { transform: 'rotate(180deg)' } : {}} />
          {t('novaDetails.back')}
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
              {galleryImages.map((img, i) => {
                if (!novaGallerySlotFilled(img)) return null;
                return (
                  <div
                    key={i}
                    className={`thumb ${selectedImg === img ? 'active' : ''}`}
                    onClick={() => handleGalleryThumbClick(img, i)}
                  >
                    {checkIsVideo(img) ? (
                      <video src={img} muted playsInline className="thumb-media" />
                    ) : (
                      <img src={img} alt={`Thumb ${i + 1}`} />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="perks-row">
              <div className="perk-box"><Droplets size={22} color="#E03232" /><span className="perk-text">{t('novaDetails.perk1')}</span></div>
              <div className="perk-box"><HeartPulse size={22} color="#10b981" /><span className="perk-text">{t('novaDetails.perk2')}</span></div>
              <div className="perk-box"><Sparkles size={20} color="#E03232" /><span className="perk-text">{t('novaDetails.perk3')}</span></div>
            </div>
          </div>

          <div className="subpage-info scroll-animate stag-2">
            <h1 className="subpage-title">{isAr ? product.name_ar : product.name_en}</h1>
            <div className="subpage-subtitle">{isAr ? product.subtitle_ar : product.subtitle_en}</div>
            <p className="subpage-desc">{isAr ? product.description_ar : product.description_en}</p>
            <div className="price-row">
              <div className="price">{product.price} EGP</div>
              <div className="reviews"><span>★★★★★</span> {t('novaDetails.reviews')}</div>
            </div>
            <div className="finish-selector">
              <span className="finish-label">{t('novaDetails.finish')}: <strong>{colors.find(c => c.id === activeColor)?.name}</strong></span>
              <div className="finish-options">
                {colors.map(c => (
                  <div key={c.id} className={`color-circle ${activeColor === c.id ? 'active' : ''}`}
                    style={{ backgroundColor: c.hex }} onClick={() => handleColorChange(c.id)} />
                ))}
              </div>
            </div>

            <div className="strap-selector animate-fade-in">
              <span className="finish-label">
                {isAr ? 'نوع الحزام' : 'Strap Type'}:{' '}
                <strong>
                  {strapType === 'solid' ? (isAr ? 'ناعم' : 'Solid') : isAr ? 'منسوج' : 'Woven'}
                </strong>
              </span>
              <div className="strap-options">
                <button
                  type="button"
                  className={`strap-btn ${strapType === 'solid' ? 'active' : ''}`}
                  onClick={() => handleStrapChange('solid')}
                >
                  {isAr ? 'ناعم' : 'Solid'}
                </button>
                <button
                  type="button"
                  className={`strap-btn ${strapType === 'woven' ? 'active' : ''}`}
                  onClick={() => handleStrapChange('woven')}
                >
                  {isAr ? 'منسوج' : 'Woven'}
                </button>
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
              <button className="btn-buy" onClick={() => {
                addToCart({
                  slug: 'qlink-nova-touch',
                  name: isAr ? product.name_ar : product.name_en,
                  color: activeColor,
                  colorName: formatNovaCartColorName(activeColor, colors, strapType, isAr),
                  strap: strapType,
                  qty,
                  price: product.price,
                  image: selectedImg || product.image_url
                });
                navigate('/checkout');
              }}>
                <Zap fill="white" size={18} /> {t('novaDetails.buyNow')}
              </button>
              <button className="btn-cart" onClick={() => {
                addToCart({
                  slug: 'qlink-nova-touch',
                  name: isAr ? product.name_ar : product.name_en,
                  color: activeColor,
                  colorName: formatNovaCartColorName(activeColor, colors, strapType, isAr),
                  strap: strapType,
                  qty,
                  price: product.price,
                  image: selectedImg || product.image_url
                });
                navigate('/cart');
              }}>
                <ShoppingCart size={18} /> {t('novaDetails.addCart')}
              </button>
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
            <button className="tab-btn active">{t('novaDetails.tabPrivacy')}</button>
            <button className="tab-btn" onClick={() => goTab('/shop/nova/inbox')}>{t('novaDetails.tabInbox')}</button>
          </div>

          <div className="privacy-panel">
            <div className="privacy-icon-wrap">
              <Lock size={32} color="#fff" strokeWidth={1.8} />
            </div>
            <h2>{t('novaDetails.privacyTitle')}</h2>
            <ul className="privacy-list">
              <li><CheckCircle2 size={18} className="privacy-check" /><span>{t('novaDetails.privacyItem1')}</span></li>
              <li><CheckCircle2 size={18} className="privacy-check" /><span>{t('novaDetails.privacyItem2')}</span></li>
              <li><CheckCircle2 size={18} className="privacy-check" /><span>{t('novaDetails.privacyItem3')}</span></li>
              <li><CheckCircle2 size={18} className="privacy-check" /><span>{t('novaDetails.privacyItem4')}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacydataNova;
