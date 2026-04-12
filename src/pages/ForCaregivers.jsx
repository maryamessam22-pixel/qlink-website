import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { LanguageContext } from '../context/LanguageContext';
import { ShieldCheck, MapPin, BellRing, HeartPulse } from 'lucide-react';
import { supabase } from '../lib/Supabase';
import './ForCaregivers.css';

import heroImage from '../assets/images/hero-caregivers.png';
import stayConnectedImg from '../assets/images/stay-pic.png';
import elderlyParentsImg from '../assets/images/one.png';
import chronicConditionsImg from '../assets/images/two.png';
import activeChildrenImg from '../assets/images/three.png';
import promoMobiles from '../assets/images/2mobiles.png';
import AppPromoSection from '../components/Sections/AppPromoSection';

function ForCaregivers() {
  const { t, lang } = useContext(LanguageContext);
  const [seoData, setSeoData] = useState(null);
  const [cmsHero, setCmsHero] = useState(null);

  const isArabic = typeof lang === 'string' && lang.toLowerCase().includes('ar');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: seo } = await supabase
          .from('seo')
          .select('*')
          .eq('slug', 'caregivers')
          .single();
        if (seo) setSeoData(seo);

        const { data: cms } = await supabase
          .from('cms_content')
          .select('*')
          .eq('section_key', 'caregivers_hero')
          .single();
        if (cms) setCmsHero(cms);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.2, rootMargin: '-50px' });

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const heroMainTitle = cmsHero ? (isArabic ? cmsHero.title_ar : cmsHero.title_en) : t("reviews.caregivers.heroTitle");
  const heroDescription = cmsHero ? (isArabic ? cmsHero.content_ar : cmsHero.content_en) : t("reviews.caregivers.heroDesc");

  return (
    <div className="for-caregivers-page">
      <SEO 
        title={seoData ? (isArabic ? seoData.title_ar : seoData.title_en) : (isArabic ? 'لمقدمي الرعاية' : 'For Caregivers')}
        description={seoData ? (isArabic ? seoData.description_ar : seoData.description_en) : (isArabic ? 'حلول أمان متكاملة لمقدمي الرعاية.' : 'Empower caregivers with Qlink.')}
        slug={seoData ? seoData.slug : "caregivers"}
      />
      <main className="fc-container">
        <section className={`fc-hero ${isArabic ? 'rtl-text' : ''}`}>
          <div className="fc-hero-content">
            <div className="fc-hero-tag scroll-animate">{t("reviews.caregivers.heroTag")}</div>
            <h1 className="fc-hero-title scroll-animate stag-1">
              {heroMainTitle}
              <br />
              <span className="highlight-text">
                {isArabic ? 'موجودون في كل ثانية.' : 'There Every Second.'}
              </span>
            </h1>
            <p className="fc-hero-subtitle scroll-animate stag-2">{heroDescription}</p>
            <Link to="/shop/bracelet" className="btn btn-primary fc-hero-action scroll-animate stag-3" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              {t("reviews.caregivers.heroBtn")}
            </Link>
          </div>
          <div className="fc-hero-image scroll-animate stag-2">
            <img src={heroImage} alt={t("reviews.caregivers.heroAlt")} loading="lazy" />
          </div>
        </section>

        <section className="fc-connect">
          <div className="fc-connect-grid">
            <div className="fc-connect-image scroll-animate">
              <img src={stayConnectedImg} alt={t("reviews.caregivers.connectTitle")} loading="lazy" />
            </div>
            <div className="fc-connect-info">
              <h2 className="scroll-animate">{t("reviews.caregivers.connectTitle")}</h2>
              <p className="scroll-animate stag-1">{t("reviews.caregivers.connectDesc")}</p>
              
              <div className="fc-feature-list">
                <div className="fc-feature-item scroll-animate stag-1">
                  <div className="fc-feature-icon"><ShieldCheck size={24} /></div>
                  <div className="fc-feature-text">
                    <h4>{t("reviews.caregivers.f1Title")}</h4>
                    <p>{t("reviews.caregivers.f1Desc")}</p>
                  </div>
                </div>
                <div className="fc-feature-item scroll-animate stag-2">
                  <div className="fc-feature-icon"><MapPin size={24} /></div>
                  <div className="fc-feature-text">
                    <h4>{t("reviews.caregivers.f2Title")}</h4>
                    <p>{t("reviews.caregivers.f2Desc")}</p>
                  </div>
                </div>
                <div className="fc-feature-item scroll-animate stag-3">
                  <div className="fc-feature-icon"><BellRing size={24} /></div>
                  <div className="fc-feature-text">
                    <h4>{t("reviews.caregivers.f3Title")}</h4>
                    <p>{t("reviews.caregivers.f3Desc")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="fc-family">
          <div className="fc-family-badge scroll-animate">{t("reviews.caregivers.familySubtitle")}</div>
          <h2 className="fc-family-title scroll-animate stag-1">{t("reviews.caregivers.familyTitle")}</h2>
          
          <div className="fc-family-grid">
            <div className="fc-family-card scroll-animate stag-1">
              <div className="card-image"><img src={elderlyParentsImg} alt={t("reviews.caregivers.card1Title")} loading="lazy" /></div>
              <div className="card-body">
                <h3>{t("reviews.caregivers.card1Title")}</h3>
                <p>{t("reviews.caregivers.card1Desc")}</p>
              </div>
            </div>
            <div className="fc-family-card scroll-animate stag-2">
              <div className="card-image"><img src={chronicConditionsImg} alt={t("reviews.caregivers.card2Title")} loading="lazy" /></div>
              <div className="card-body">
                <h3>{t("reviews.caregivers.card2Title")}</h3>
                <p>{t("reviews.caregivers.card2Desc")}</p>
              </div>
            </div>
            <div className="fc-family-card scroll-animate stag-3">
              <div className="card-image"><img src={activeChildrenImg} alt={t("reviews.caregivers.card3Title")} loading="lazy" /></div>
              <div className="card-body">
                <h3>{t("reviews.caregivers.card3Title")}</h3>
                <p>{t("reviews.caregivers.card3Desc")}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="fc-steps-modern">
          <h2 className="scroll-animate">{t("reviews.caregivers.setupTitle")}</h2>
          <p className="scroll-animate stag-1">{t("reviews.caregivers.setupDesc")}</p>
          
          <div className="fc-timeline">
            <div className="fc-timeline-step scroll-animate stag-1">
              <div className="fc-circle-wrap">
                <div className="fc-step-circle">01</div>
              </div>
              <h4>{t("reviews.caregivers.step1Title")}</h4>
              <p>{t("reviews.caregivers.step1Desc")}</p>
            </div>
            <div className="fc-timeline-step scroll-animate stag-2">
              <div className="fc-circle-wrap">
                <div className="fc-step-circle">02</div>
              </div>
              <h4>{t("reviews.caregivers.step2Title")}</h4>
              <p>{t("reviews.caregivers.step2Desc")}</p>
            </div>
            <div className="fc-timeline-step scroll-animate stag-3">
              <div className="fc-circle-wrap">
                <div className="fc-step-circle">03</div>
              </div>
              <h4>{t("reviews.caregivers.step3Title")}</h4>
              <p>{t("reviews.caregivers.step3Desc")}</p>
            </div>
          </div>
        </section>

        <section className="fc-gift-cta scroll-animate">
          <div className="fc-gift-card">
            <div className="fc-gift-icon"><HeartPulse size={40} /></div>
            <h3>{t("reviews.caregivers.giftTitle")}</h3>
            <p>{t("reviews.caregivers.giftDesc")}</p>
            <Link to="/shop/bracelet" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              {t("reviews.caregivers.giftBtn")}
            </Link>
          </div>
        </section>
      </main>
      <AppPromoSection imageSrc={promoMobiles} imgClassName="promo-phones-img" />
    </div>
  );
}

export default ForCaregivers;