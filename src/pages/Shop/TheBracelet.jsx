import React, { useEffect, useContext, useState } from 'react';
import SEO from '../../components/common/SEO';
import { Link, useParams } from 'react-router-dom';
import { LanguageContext } from '../../context/LanguageContext';
import SetupSection from '../../components/Sections/SetupSection';
import AppPromoSection from '../../components/Sections/AppPromoSection';
import DynamicBackground from '../../components/common/DynamicBackground';
import NovaDetails from './NovaDetails';
import PulseDetails from './PulseDetails';
import { supabase } from '../../lib/Supabase';
import './TheBracelet.css';

// Images (lsa hane7taghom lel Promo w Setup section)
import mobilesImg from '../../assets/images/2mobiles.png';

const TheBracelet = () => {
  const { t, lang } = useContext(LanguageContext);
  const { productId } = useParams();
  
  // 1. Defina el state bta3t el SEO wel Products
  const [seoData, setSeoData] = useState(null);
  const [products, setProducts] = useState([]);

  const isAr = lang === 'ar';

  // 2. Fetch Data (Byeshtaghal mara wa7da lamma el page t-load)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch SEO
        const { data: seo } = await supabase
          .from('seo')
          .select('*')
          .eq('slug', 'shop/bracelet')
          .single();
        if (seo) setSeoData(seo);

        // Fetch Products
        const { data: prods } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: true }); // Bygeebhom btarteeb zohorhom
        if (prods) setProducts(prods);

      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  // 3. Animation Observer (Da el Ser! Byeshtaghal lamma el 'products' tetghayar w tenzel fel page)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.15, rootMargin: '-50px' });

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [products]); // <-- El [products] hena hya elly bt7el moshkelet en el cards tekh-tefy

  // Routing logic
  if (productId === 'nova') return <NovaDetails />;
  if (productId === 'pulse') return <PulseDetails />;

  return (
    <div className={`bracelet-page-container ${isAr ? 'rtl-text' : ''}`}>
      <SEO 
        title={seoData ? (isAr ? seoData.title_ar : seoData.title_en) : (isAr ? 'السوار الذكي' : 'The Smart Bracelet')}
        description={seoData ? (isAr ? seoData.description_ar : seoData.description_en) : ''}
        slug="shop/bracelet"
      />
      <DynamicBackground />

      {/* Header */}
      <div className="bracelet-header-section scroll-animate stag-1">
        <h1 className="bracelet-title">
          {t('bracelet.title').includes('Your') ? (
            <>
              {t('bracelet.title').split('Your')[0]}
              <span style={{ color: '#E03232' }}>Your</span>
              {t('bracelet.title').split('Your')[1]}
            </>
          ) : (
            t('bracelet.title')
          )}
        </h1>

        <p className="bracelet-subtitle">
          {t('bracelet.subtitle')
            .split('\n')
            .map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
        </p>
      </div>

      {/* Dynamic Products Grid */}
      <div className="bracelet-products-grid">
        {products.map((product, idx) => {
          // Bn-check law el product da Nova wla Pulse 3ashan el alwan
          const isNova = product.slug.includes('nova');

          return (
            <div key={product.id} className={`bracelet-product-card scroll-animate stag-${idx + 2}`}>
              <div
                className="bracelet-card-img-wrapper"
                style={{
                  background: isNova 
                    ? 'linear-gradient(135deg, rgba(80,80,100,0.8), rgba(40,40,50,0.9))' 
                    : 'linear-gradient(135deg, rgba(230,230,230,0.9), rgba(180,180,180,0.8))'
                }}
              >
                <img 
                  src={product.image_url} 
                  alt={isAr ? product.name_ar : product.name_en} 
                  style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))' }} 
                />
              </div>

              <h2 className="bracelet-card-title">{isAr ? product.name_ar : product.name_en}</h2>
              <p className="bracelet-card-subtitle">{isAr ? product.subtitle_ar : product.subtitle_en}</p>

              <ul className="bracelet-card-features">
                {(isAr ? product.features_ar : product.features_en)?.map((feature, fIdx) => (
                  <li key={fIdx}>{feature}</li>
                ))}
              </ul>

              <div className="bracelet-card-price">{product.price} EGP</div>

              <Link to={isNova ? "/shop/nova" : "/shop/pulse"} className="bracelet-card-btn">
                {t('bracelet.btnView')}
              </Link>
            </div>
          );
        })}
      </div>

      <div className="scroll-animate stag-1">
        <SetupSection />
      </div>

      <div className="scroll-animate stag-2">
        <AppPromoSection imageSrc={mobilesImg} imgClassName="promo-phones-img" />
      </div>
    </div>
  );
};

export default TheBracelet;