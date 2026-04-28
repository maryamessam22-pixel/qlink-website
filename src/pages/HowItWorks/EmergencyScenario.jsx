import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import './EmergencyScenario.css';
import { LanguageContext } from '../../context/LanguageContext';
import { supabase } from '../../lib/Supabase';

import heroImg from '../../assets/images/hero-emergency.png';
import img1 from '../../assets/images/1img.png';
import img2 from '../../assets/images/2img.png';
import img3 from '../../assets/images/3img.png';
import w1 from '../../assets/images/w1.png';
import w2 from '../../assets/images/w2.png';
import w3 from '../../assets/images/w3.png';
import w4 from '../../assets/images/w4.png';
import w5 from '../../assets/images/w5.png';
import mobiles from '../../assets/images/2mobiles.png';

import EmergencyFeatureCard from '../../components/Cards/EmergencyFeatureCard';
import EmergencyStepCard from '../../components/Cards/EmergencyStepCard';
import AppPromoSection from '../../components/Sections/AppPromoSection';

import { ArrowLeft, ArrowRight, ShieldAlert, ScanLine, FileText, BellRing, Apple, Play } from 'lucide-react';

const watchImages = [w1, w2, w3, w4, w5];

const EmergencyScenario = () => {
  const [currentWatch, setCurrentWatch] = useState(0);
  const { t, lang } = useContext(LanguageContext);
  
 
  const [seoData, setSeoData] = useState(null);

  
  useEffect(() => {
    const fetchSEO = async () => {
      try {
        const { data: seo } = await supabase
          .from('seo')
          .select('*')
          .eq('slug', 'how-it-works/emergency')
          .single();
        if (seo) setSeoData(seo);
      } catch (err) {
        console.error("Error fetching SEO:", err);
      }
    };

    fetchSEO();
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

  const handleNextWatch = () => {
    setCurrentWatch((prev) => (prev + 1) % watchImages.length);
  };

  const handlePrevWatch = () => {
    setCurrentWatch((prev) => (prev === 0 ? watchImages.length - 1 : prev - 1));
  };

  return (
    <div className="es-page">
 
      <SEO 
        title={seoData ? (lang === 'ar' ? seoData.title_ar : seoData.title_en) : (lang === 'ar' ? 'سيناريو الطوارئ' : 'Emergency Scenario')}
        description={seoData ? (lang === 'ar' ? seoData.description_ar : seoData.description_en) : ''}
        slug="how-it-works/emergency"
      />
      
     
      <section className={`es-hero scroll-animate ${lang === 'ar' ? 'rtl-text' : ''}`} style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="es-hero-overlay"></div>
        <div className="es-hero-content scroll-animate stag-1">
          <div className="es-badge">
            <ShieldAlert size={16} color="var(--color-primary-red)" /> <span style={{color: 'var(--color-primary-red)', fontWeight: 600, fontSize: '12px'}}>{t('emergency.heroBadge')}</span>
          </div>
          <h1 className="es-hero-title" style={lang === 'ar' ? {} : { whiteSpace: 'pre-wrap' }}>{t('emergency.heroTitleTop')}<span className="red-text">{t('emergency.heroTitleHighlight')}</span></h1>
          <p className="es-hero-subtitle">
            {t('emergency.heroSubtitle')}
          </p>
          <div className={`es-hero-buttons ${lang === 'ar' ? 'rtl-buttons' : ''}`}>
            <Link to="/how-it-works/qlink" className="btn btn-secondary">{t('emergency.btnHow')}</Link>
            <Link to="/shop/bracelet" className="btn btn-primary">{t('emergency.btnProtect')}</Link>
          </div>
        </div>
      </section>

   
      <section className={`es-features ${lang === 'ar' ? 'rtl-text' : ''}`}>
        <EmergencyFeatureCard
          subtitle={t('emergency.f1Sub')}
          title={t('emergency.f1Title')}
          desc={t('emergency.f1Desc')}
          img={img1}
        />
        <EmergencyFeatureCard
          subtitle={t('emergency.f2Sub')}
          title={t('emergency.f2Title')}
          desc={t('emergency.f2Desc')}
          img={img2}
          reverse={true}
        />
        <EmergencyFeatureCard
          subtitle={t('emergency.f3Sub')}
          title={t('emergency.f3Title')}
          desc={t('emergency.f3Desc')}
          img={img3}
        />
      </section>

  
      <div className="es-marquee-container">
        <div className="es-marquee">
          <span>{t('emergency.marquee')}</span>
          <span>&bull;</span>
          <span>{t('emergency.marquee')}</span>
          <span>&bull;</span>
          <span>{t('emergency.marquee')}</span>
          <span>&bull;</span>
          <span>{t('emergency.marquee')}</span>
        </div>
      </div>

      
      <section className={`es-steps-section scroll-animate ${lang === 'ar' ? 'rtl-text' : ''}`}>
        <EmergencyStepCard
          IconComponent={ScanLine}
          iconWrapClass="es-icon-blue"
          iconColor="var(--color-primary-red)"
          title={t('emergency.s1Title')}
          desc={t('emergency.s1Desc')}
        />
        <EmergencyStepCard
          IconComponent={FileText}
          iconWrapClass="es-icon-gray"
          iconColor="var(--text-secondary)"
          title={t('emergency.s2Title')}
          desc={t('emergency.s2Desc')}
        />
        <EmergencyStepCard
          IconComponent={BellRing}
          iconWrapClass="es-icon-red"
          iconColor="var(--color-primary-red)"
          title={t('emergency.s3Title')}
          desc={t('emergency.s3Desc')}
        />
      </section>

   
      <section className="es-carousel-section scroll-animate">
        <div className="es-carousel-inner">
          <button className="es-arrow-btn" onClick={handlePrevWatch} aria-label="Previous Watch">
            <ArrowLeft size={24} />
          </button>
          <div className="es-watch-display">
            <img src={watchImages[currentWatch]} alt="Qlink Watch Component" />
          </div>
          <button className="es-arrow-btn" onClick={handleNextWatch} aria-label="Next Watch">
            <ArrowRight size={24} />
          </button>
        </div>
      </section>

    
      <section className={`es-cta-box-section scroll-animate ${lang === 'ar' ? 'rtl-text' : ''}`}>
        <div className="es-cta-box">
          <div className="es-cta-icon">
             <ShieldAlert size={36} color="var(--color-primary-red)" />
          </div>
          <h2 style={lang === 'ar' ? {} : { whiteSpace: 'pre-wrap' }}>{t('emergency.ctaSubtitle')}</h2>
          <p>{t('emergency.ctaDesc')}</p>
          <Link
            to="/shop/bracelet"
            className="es-cta-shop-btn"
          >
            {t('emergency.ctaBtn')} {lang === 'ar' ? <ArrowLeft size={16}/> : <ArrowRight size={16}/>}
          </Link>
        </div>
      </section>

    
      <div className="aPPP">
        <AppPromoSection imageSrc={mobiles} />
      </div>

    </div>
  );
}

export default EmergencyScenario;