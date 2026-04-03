import React, { useEffect } from 'react';
import SEO from '../../components/common/SEO';
import './Compare.css';
import CompareCard from '../../components/Cards/CompareCard';
import { LanguageContext } from '../../context/LanguageContext';

// Place your new files in the icons folder named below!
import novaIcon from '../../assets/icons/NOVA-ICON.png'; 
import pulseIcon from '../../assets/icons/PULSE-ICON.png';
import SetupSection from '../../components/Sections/SetupSection';
import AppPromoSection from '../../components/Sections/AppPromoSection';
import promoAltImg from '../../assets/images/mobile2.png';
import DynamicBackground from '../../components/common/DynamicBackground';
import ShopCTA from '../../components/Sections/ShopCTA';


function Compare() {
  const { t, lang } = React.useContext(LanguageContext);

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
        title={lang === 'ar' ? 'مقارنة الميزات' : 'Compare Models'}
        description={lang === 'ar' ? 'قارن بين موديلات كيو لينك نوفا وبولس.' : 'Compare Qlink Nova and Pulse models.'}
        slug="shop/compare"
      />
      <DynamicBackground/>
  
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
          title={t('compare.novaTitle')}
          subTitle={t('compare.novaSub')}
          icon={novaIcon}
          features={novaFeatures}
          price="1,499"
          buttonText={t('compare.novaBtn')}
          accentColor="#0097b2" 
        />

        <CompareCard 
          title={t('compare.pulseTitle')}
          subTitle={t('compare.pulseSub')}
          icon={pulseIcon}
          features={pulseFeatures}
          price="1,199"
          buttonText={t('compare.pulseBtn')}
          accentColor="#00c853" 
        />
      </div>
      <SetupSection />
      <ShopCTA />
      <AppPromoSection imageSrc={promoAltImg} imgClassName="compare-promo-large" />
    </div>

  );
}

export default Compare;
