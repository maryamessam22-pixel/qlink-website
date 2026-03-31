import React from 'react';
import './Compare.css';
import CompareCard from '../../components/Cards/CompareCard';
import { LanguageContext } from '../../context/LanguageContext';


function Compare() {
  const { t, lang } = React.useContext(LanguageContext);

  const novaFeatures = [
    { label: t('compare.fInterface'), value: t('compare.fInterfaceV1'), valueIcon: "📱" },
    { label: t('compare.fEmergency'), value: t('compare.fEmergencyV1') },
    { label: t('compare.fMedical'), value: t('compare.fMedicalV') },
    { label: t('compare.fPrivacy'), value: t('compare.fPrivacyV1') },
    { label: t('compare.fFeedback'), value: t('compare.fFeedbackV1') },
    { label: t('compare.fDesign'), value: t('compare.fDesignV1') },
    { label: t('compare.fBestFor'), value: t('compare.fBestForV1') },
  ];

  const pulseFeatures = [
    { label: t('compare.fInterface'), value: t('compare.fInterfaceV2'), valueIcon: "🔘" },
    { label: t('compare.fEmergency'), value: t('compare.fEmergencyV2') },
    { label: t('compare.fMedical'), value: t('compare.fMedicalV') },
    { label: t('compare.fPrivacy'), value: t('compare.fPrivacyV2') },
    { label: t('compare.fFeedback'), value: t('compare.fFeedbackV2') },
    { label: t('compare.fDesign'), value: t('compare.fDesignV2') },
    { label: t('compare.fBestFor'), value: t('compare.fBestForV2') },
  ];

  return (
    <div className={`compare-page ${lang === 'ar' ? 'rtl-text' : ''}`}>
  
      <div className="compare-hero">
        <h1 className="compare-title">
          {t('compare.heroTitleTop')}
          <span className="compare-highlight">{t('compare.heroTitleHighlight')}</span>
          {t('compare.heroTitleBottom')}
        </h1>
        <p className="compare-subtitle" style={lang === 'ar' ? {} : { whiteSpace: 'pre-wrap' }}>
          {t('compare.heroSubtitle')}
        </p>
      </div>

      <div className="compare-page-container">
        <CompareCard 
          title={t('compare.novaTitle')}
          subTitle={t('compare.novaSub')}
          icon="📱"
          features={novaFeatures}
          price="1,499"
          buttonText={t('compare.novaBtn')}
          accentColor="#0097b2" 
        />

        <CompareCard 
          title={t('compare.pulseTitle')}
          subTitle={t('compare.pulseSub')}
          icon="🔘"
          features={pulseFeatures}
          price="1,199"
          buttonText={t('compare.pulseBtn')}
          accentColor="#00c853" 
        />
      </div>
    </div>
  );
}

export default Compare;
