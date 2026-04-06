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

import mobilesImg from '../../assets/images/2mobiles.png';

const TheBracelet = () => {
  const { t, lang } = useContext(LanguageContext);
  const { productId } = useParams();
  
  const [seoData, setSeoData] = useState(null);
  const [products, setProducts] = useState([]);

  const isAr = lang === 'ar';

  useEffect(() => {
    const fetchData = async () => {
      try {
   
        const { data: seo } = await supabase
          .from('seo')
          .select('*')
          .eq('slug', 'shop/bracelet')
          .single();
        if (seo) setSeoData(seo);

     
        const { data: prods } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: true }); 
        if (prods) setProducts(prods);

      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

 
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

     
      <div className="bracelet-header-section">
        <h1 className="bracelet-title">
          {t('bracelet.title').includes('Your') ? (
            <>
              {t('bracelet.title').split('Your')[0]}
              <span className="title-highlight">Your</span>
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

  
      <div className="bracelet-products-grid">
        {products.map((product, idx) => {
 
          const isNova = product.slug.includes('nova');

          return (
            <div key={product.id} className="bracelet-product-card">
              <div className={`bracelet-card-img-wrapper ${isNova ? 'is-nova' : 'is-pulse'}`}>
                <img 
                  src={product.image_url} 
                  alt={isAr ? product.name_ar : product.name_en} 
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

      <div>
        <SetupSection />
      </div>

      <div>
        <AppPromoSection imageSrc={mobilesImg} imgClassName="promo-phones-img" />
      </div>
    </div>
  );
};

export default TheBracelet;