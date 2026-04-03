import React, { useContext } from 'react';
import SEO from '../../components/common/SEO';
import { LanguageContext } from '../../context/LanguageContext';
import DynamicBackground from '../../components/common/DynamicBackground';
import AppPromoSection from '../../components/Sections/AppPromoSection';
import promoMobiles from '../../assets/images/2mobiles.png';

function AppDownload() {
  const { lang, t } = useContext(LanguageContext);

  return (
    <div className="app-download-page">
      <SEO 
        title={lang === 'ar' ? 'تحميل التطبيق' : 'App Download'}
        description="Download the Qlink app for iOS and Android."
        slug="support/download"
      />
      <DynamicBackground />
      <div style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <AppPromoSection imageSrc={promoMobiles} />
      </div>
    </div>
  );
}

export default AppDownload;
