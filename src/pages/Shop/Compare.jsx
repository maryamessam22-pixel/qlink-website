import React, { useEffect, useState, useContext } from 'react';
import SEO from '../../components/common/SEO';
import './Compare.css';
import CompareCard from '../../components/Cards/CompareCard';
import { LanguageContext } from '../../context/LanguageContext';
import { supabase } from '../../lib/Supabase';
import novaIcon from '../../assets/icons/NOVA-ICON.png'; 
import pulseIcon from '../../assets/icons/PULSE-ICON.png';
import SetupSection from '../../components/Sections/SetupSection';
import AppPromoSection from '../../components/Sections/AppPromoSection';
import promoAltImg from '../../assets/images/mobile2.png';
import qlinkVideo from '../../assets/videos/vidd.mp4';
import ShopCTA from '../../components/Sections/ShopCTA';

function Compare() {
  const { t, lang } = useContext(LanguageContext);
  
  
  const [seoData, setSeoData] = useState(null);
  const [novaProduct, setNovaProduct] = useState(null);
  const [pulseProduct, setPulseProduct] = useState(null);

  
  useEffect(() => {
    const fetchCompareData = async () => {
      try {
    
        const { data: seo } = await supabase
          .from('seo')
          .select('*')
          .eq('slug', 'shop/compare')
          .single();
        if (seo) setSeoData(seo);

       
        const { data: prods } = await supabase
          .from('products')
          .select('*')
          .in('slug', ['qlink-nova-touch', 'qlink-pulse']);

        if (prods && prods.length > 0) {
          const nova = prods.find(p => p.slug === 'qlink-nova-touch');
          const pulse = prods.find(p => p.slug === 'qlink-pulse');
          
          if (nova) setNovaProduct(nova);
          if (pulse) setPulseProduct(pulse);
        }
      } catch (err) {
        console.error("Error fetching compare data:", err);
      }
    };

    fetchCompareData();
  }, []);


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.15, rootMargin: '-50px' });

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  const novaFeatures = [
    { label: t('compare.fInterface'), value: t('compare.fInterfaceV1'), valueIcon: novaIcon },
    { label: t('compare.fEmergency'), value: t('compare.fEmergencyV1') },
    { label: t('compare.fMedical'), value: t('compare.fMedicalV') },
    { label: t('compare.fPrivacy'), value: t('compare.fPrivacyV1') },
    { label: t('compare.fFeedback'), value: t('compare.fFeedbackV1') },
    { label: t('compare.fDesign'), value: t('compare.fDesignV1') },
    { label: t('compare.fBestFor'), value: t('compare.fBestForV1') },
  ];

  const pulseFeatures = [
    { label: t('compare.fInterface'), value: t('compare.fInterfaceV2'), valueIcon: pulseIcon },
    { label: t('compare.fEmergency'), value: t('compare.fEmergencyV2') },
    { label: t('compare.fMedical'), value: t('compare.fMedicalV') },
    { label: t('compare.fPrivacy'), value: t('compare.fPrivacyV2') },
    { label: t('compare.fFeedback'), value: t('compare.fFeedbackV2') },
    { label: t('compare.fDesign'), value: t('compare.fDesignV2') },
    { label: t('compare.fBestFor'), value: t('compare.fBestForV2') },
  ];

  return (
    <div className={`compare-page ${lang === 'ar' ? 'rtl-text' : ''}`}>
      <SEO 
        title={seoData ? (lang === 'ar' ? seoData.title_ar : seoData.title_en) : (lang === 'ar' ? 'مقارنة الميزات' : 'Compare Models')}
        description={seoData ? (lang === 'ar' ? seoData.description_ar : seoData.description_en) : ''}
        slug="shop/compare"
      />
  
      <div className="compare-hero scroll-animate">
        <h1 className="compare-title">
          {t('compare.heroTitleTop')}
          <span className="compare-highlight">{t('compare.heroTitleHighlight')}</span>
          {t('compare.heroTitleBottom')}
        </h1>
        <p className="compare-subtitle" style={lang === 'ar' ? {} : { whiteSpace: 'pre-wrap' }}>
          {t('compare.heroSubtitle')}
        </p>
      </div>
      <div className="compare-page-container scroll-animate stag-1">
        
   
        <CompareCard
          title={novaProduct ? (lang === 'ar' ? novaProduct.name_ar : novaProduct.name_en) : t('compare.novaTitle')}
          subTitle={t('compare.novaSub')}
          icon={novaIcon}
          features={novaFeatures}

          price={novaProduct ? novaProduct.price : "1,499"}
          buttonText={t('compare.novaBtn')}
          accentColor="#0097b2"
          to="/shop/nova"
        />

        <div className="compare-vs-divider">
          <div className="compare-vs-line" />
          <div className="compare-vs-circle">VS</div>
          <div className="compare-vs-line" />
        </div>

        <CompareCard
          title={pulseProduct ? (lang === 'ar' ? pulseProduct.name_ar : pulseProduct.name_en) : t('compare.pulseTitle')}
          subTitle={t('compare.pulseSub')}
          icon={pulseIcon}
          features={pulseFeatures}
          price={pulseProduct ? pulseProduct.price : "1,199"}
          buttonText={t('compare.pulseBtn')}
          accentColor="#00c853"
          to="/shop/pulse"
        />

      </div>
      <div className="compare-video-section scroll-animate">
        <div className="compare-video-left">
          <h3 className="cvs-heading">Built for Those<br />Who Matter Most</h3>
          <p className="cvs-text">Q-Link is designed to keep your loved ones safe — whether at home or on the go. One tap connects them to help instantly.</p>
          <p className="cvs-text">Trusted by families across the region to deliver peace of mind, every single day.</p>
        </div>
        <video
          src={qlinkVideo}
          autoPlay
          loop
          muted
          playsInline
          className="compare-video"
        />
        <div className="compare-video-right">
          <h3 className="cvs-heading">Smart Tech,<br />Simple Safety</h3>
          <p className="cvs-text">Powered by real-time GPS and emergency alerts, Q-Link bracelets respond the moment they're needed most.</p>
          <p className="cvs-text">Two models. One mission — protecting the people you love with cutting-edge, wearable technology.</p>
        </div>
      </div>
      <SetupSection />
      <ShopCTA />
      <AppPromoSection imageSrc={promoAltImg} imgClassName="compare-promo-large" />
    </div>

  );
}

export default Compare;