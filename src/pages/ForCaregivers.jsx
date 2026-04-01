import React, { useEffect, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import DynamicBackground from '../components/common/DynamicBackground';
import { Users, Activity, Baby, HeartPulse, ShieldCheck, MapPin, BellRing } from 'lucide-react';
import './ForCaregivers.css';
import heroImage from '../assets/images/hero-caregivers.png';
import AppPromoSection from '../components/Sections/AppPromoSection';

// New images for the redesign
import stayConnectedImg from '../assets/images/1img.png';
import elderlyParentsImg from '../assets/images/salma.png';
import chronicConditionsImg from '../assets/images/sarah.png';
import activeChildrenImg from '../assets/images/malak.png';

function ForCaregivers() {
  const { t, lang } = useContext(LanguageContext);

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

  return (
    <div className="for-caregivers-page">
      <DynamicBackground />
      <main className="fc-container">
        <section className={`fc-hero scroll-animate ${lang === 'ar' ? 'rtl-text' : ''}`}>
          <div className="fc-hero-content">
            <div className="fc-hero-tag">{t("reviews.caregivers.heroTag")}</div>
            <h1 className="fc-hero-title">
              {t("reviews.caregivers.heroTitle")}
              <br />
              <span className="highlight-text">{t("reviews.caregivers.heroHighlight")}</span>
            </h1>
            <p className="fc-hero-subtitle">{t("reviews.caregivers.heroDesc")}</p>
            <button className="btn btn-primary fc-hero-action">{t("reviews.caregivers.heroBtn")}</button>
          </div>
          <div className="fc-hero-image">
            <img src={heroImage} alt={t("reviews.caregivers.heroAlt")} />
          </div>
        </section>

        <section className="fc-connect scroll-animate">
          <div className="fc-connect-grid">
            <div className="fc-connect-image">
              <img src={stayConnectedImg} alt={t("reviews.caregivers.connectTitle")} />
            </div>
            <div className="fc-connect-info">
              <h2>{t("reviews.caregivers.connectTitle")}</h2>
              <p>{t("reviews.caregivers.connectDesc")}</p>
              
              <div className="fc-feature-list">
                <div className="fc-feature-item">
                  <div className="fc-feature-icon"><ShieldCheck size={24} /></div>
                  <div className="fc-feature-text">
                    <h4>{t("reviews.caregivers.f1Title")}</h4>
                    <p>{t("reviews.caregivers.f1Desc")}</p>
                  </div>
                </div>
                <div className="fc-feature-item">
                  <div className="fc-feature-icon"><MapPin size={24} /></div>
                  <div className="fc-feature-text">
                    <h4>{t("reviews.caregivers.f2Title")}</h4>
                    <p>{t("reviews.caregivers.f2Desc")}</p>
                  </div>
                </div>
                <div className="fc-feature-item">
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
        
        <section className="fc-family scroll-animate">
          <div className="fc-family-badge">{t("reviews.caregivers.familySubtitle")}</div>
          <h2 className="fc-family-title">{t("reviews.caregivers.familyTitle")}</h2>
          
          <div className="fc-family-grid">
            <div className="fc-family-card">
              <div className="card-image"><img src={elderlyParentsImg} alt={t("reviews.caregivers.card1Title")} /></div>
              <div className="card-body">
                <h3>{t("reviews.caregivers.card1Title")}</h3>
                <p>{t("reviews.caregivers.card1Desc")}</p>
              </div>
            </div>
            <div className="fc-family-card">
              <div className="card-image"><img src={chronicConditionsImg} alt={t("reviews.caregivers.card2Title")} /></div>
              <div className="card-body">
                <h3>{t("reviews.caregivers.card2Title")}</h3>
                <p>{t("reviews.caregivers.card2Desc")}</p>
              </div>
            </div>
            <div className="fc-family-card">
              <div className="card-image"><img src={activeChildrenImg} alt={t("reviews.caregivers.card3Title")} /></div>
              <div className="card-body">
                <h3>{t("reviews.caregivers.card3Title")}</h3>
                <p>{t("reviews.caregivers.card3Desc")}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="fc-steps scroll-animate">
          <h2>Simple Setup. Easy Management.</h2>
          <p>You don't need to be tech-savvy to use Qlink. We've designed the entire experience to be intuitive for caregivers of all ages.</p>
          <div className="fc-step-grid">
            <div className="fc-step-item">
              <div className="step-circle">01</div>
              <h4>Create Profile</h4>
              <p>Enter medical details on our secure portal.</p>
            </div>
            <div className="fc-step-item">
              <div className="step-circle">02</div>
              <h4>Link Device</h4>
              <p>Scan the band to link it to the profile.</p>
            </div>
            <div className="fc-step-item">
              <div className="step-circle">03</div>
              <h4>Stay Updated</h4>
              <p>Update info anytime from your phone.</p>
            </div>
          </div>
        </section>

        <section className="fc-cta scroll-animate">
          <h3>Give the Gift of Safety</h3>
          <p>Join thousands of caregivers who sleep better at night knowing their loved ones are protected.</p>
          <button className="btn btn-primary">Shop for your family now!</button>
        </section>
      </main>
    </div>
  );
}

export default ForCaregivers;
