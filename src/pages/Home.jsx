import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { supabase } from "../lib/Supabase";
import {
  WifiOff,
  QrCode,
  Lock,
  Wifi,
  ShieldCheck,
  Smartphone,
  HeartPulse,
  Users,
  Activity,
  Baby,
  MousePointerClick,
  Settings,
  ShoppingCart,
  Truck,
  CheckCircle2,
  ArrowUp,
  Zap,
  Apple,
  Play,
  Watch,
  FileText
} from 'lucide-react';
import './Home.css';

import InfoCard from '../components/Cards/InfoCard';
import WhyCard from '../components/Cards/WhyCard';
import StepItem from '../components/Cards/StepItem';
import HalfCard from '../components/Cards/HalfCard';


import watchImg from '../assets/images/watch.png';
import twoWatchesImg from '../assets/images/2 watches.png';
import appScreenImg from '../assets/images/appscreen.png';

function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [heroTitleEn, setHeroTitleEn] = useState('');
  const { t, lang } = useContext(LanguageContext);

  useEffect(() => {
    const fetchHeroTitle = async () => {
      try {
        const { data, error } = await supabase
          .from('cms_content')
          .select('title_en')
          .eq('id', 7) // row 7
          .single();

        if (error) {
          console.error('Supabase hero title fetch error:', error);
          return;
        }

        if (data?.title_en) {
          setHeroTitleEn(data.title_en);
        }
      } catch (err) {
        console.error('Unexpected error fetching hero title:', err);
      }
    };

    fetchHeroTitle();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    }, { threshold: 0.15, rootMargin: '-50px' });

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  return (
    <div className="home-wrapper">
      {/* Liquid background effect */}
      <div className="home-liquid-bg">
        <div className="home-glow home-glow-1"></div>
        <div className="home-glow home-glow-2"></div>
        <div className="home-glow home-glow-3"></div>
      </div>

      <div className="home-content">
        {/* HERO SECTION */}
        <section className={`hero-section scroll-animate ${lang === 'ar' ? 'rtl-text' : ''}`}>
          <div className="hero-text">
            <h1 className={`hero-title scroll-animate stag-1 ${lang === 'ar' ? '' : 'hero-title-eng'}`}>
              {heroTitleEn ? (
                heroTitleEn
              ) : (
                <>
                  {t('hero.titleTop')}<span className="red-text">{t('hero.titleHighlight')}</span><br />
                  {t('hero.titleBottom')}
                </>
              )}
            </h1>
            <p className="hero-desc scroll-animate stag-2">
              {t('hero.desc')}
            </p>
            <div className={`hero-buttons scroll-animate stag-3 ${lang === 'ar' ? 'rtl-buttons' : ''}`}>
              <button className="btn btn-secondary">{t('hero.btnHow')}</button>
              <button className="btn btn-primary">{t('hero.btnExplore')}</button>
            </div>
          </div>
          <div className="hero-image">
            <img src={watchImg} alt="Qlink Bracelets" className="hero-img-element" />
          </div>
        </section>

        {/* WHAT IS QLINK */}
        <section className={`what-section scroll-animate ${lang === 'ar' ? 'rtl-text' : ''}`}>
          <h2 className="section-title">{t('whatIs.title')}</h2>
          <p className="section-subtitle">
            {t('whatIs.subtitle')}
          </p>

          <div className="card-grid-3">
            <InfoCard
              className="bg-success-light"
              icon={Zap}
              iconColor="var(--color-success)"
              title={t('whatIs.c1Title')}
              description={t('whatIs.c1Desc')}
            />
            <InfoCard
              className="bg-blue-light"
              icon={QrCode}
              iconColor="var(--color-primary-blue)"
              title={t('whatIs.c2Title')}
              description={t('whatIs.c2Desc')}
            />
            <InfoCard
              className="bg-error-light"
              icon={Lock}
              iconColor="var(--color-error)"
              title={t('whatIs.c3Title')}
              description={t('whatIs.c3Desc')}
            />
          </div>
        </section>

        {/* WHY CHOOSE QLINK */}
        <section className={`why-section scroll-animate ${lang === 'ar' ? 'rtl-text' : ''}`}>
          <h2 className="section-title">{t('whyChoose.title')}</h2>
          <p className="section-subtitle">
            {t('whyChoose.subtitle')}
          </p>

          <div className="card-grid-4">
            <WhyCard
              icon={Wifi}
              title={t('whyChoose.w1Title')}
              description={t('whyChoose.w1Desc')}
            />
            <WhyCard
              icon={ShieldCheck}
              title={t('whyChoose.w2Title')}
              description={t('whyChoose.w2Desc')}
            />
            <WhyCard
              icon={Smartphone}
              title={t('whyChoose.w3Title')}
              description={t('whyChoose.w3Desc')}
            />
            <WhyCard
              icon={HeartPulse}
              title={t('whyChoose.w4Title')}
              description={t('whyChoose.w4Desc')}
            />
          </div>
        </section>

        {/* SPLIT FEATURE 1 */}
        <section className={`split-feature scroll-animate ${lang === 'ar' ? 'rtl-text' : ''}`}>
          <div className="split-text">
            <h2 className="split-title">{t('splitFeature.title')}</h2>
            <p className="split-desc">
              {t('splitFeature.desc1')}
            </p>
            <p className="split-desc">
              {t('splitFeature.desc2')}
            </p>
            <Link to="/about" className="btn btn-primary link-btn-inline">{t('splitFeature.btn')}</Link>
          </div>
          <div className="split-image">
            <img src={twoWatchesImg} alt="2 Qlink Bracelets" />
          </div>
        </section>

        {/* WHO IS QLINK FOR */}
        <section className={`what-section scroll-animate ${lang === 'ar' ? 'rtl-text' : ''}`}>
          <h2 className="section-title">{t('whoIsFor.title')}</h2>
          <p className="section-subtitle">
            {t('whoIsFor.subtitle')}
          </p>

          <div className="card-grid-3">
            <InfoCard
              className="pad-40-24"
              iconWrapperClassName="icon-wrap-glass"
              icon={Users}
              iconSize={24}
              iconColor="#b0b8c8"
              title={t('whoIsFor.c1Title')}
              description={t('whoIsFor.c1Desc')}
            />
            <InfoCard
              className="pad-40-24"
              iconWrapperClassName="icon-wrap-red"
              icon={Activity}
              iconSize={24}
              iconColor="#E03232"
              title={t('whoIsFor.c2Title')}
              description={t('whoIsFor.c2Desc')}
            />
            <InfoCard
              className="pad-40-24"
              iconWrapperClassName="icon-wrap-glass"
              icon={Baby}
              iconSize={24}
              iconColor="#b0b8c8"
              title={t('whoIsFor.c3Title')}
              description={t('whoIsFor.c3Desc')}
            />
          </div>
        </section>

        {/* JOURNEY SECTION */}
        <section className={`journey-section scroll-animate ${lang === 'ar' ? 'rtl-text' : ''}`}>
          <h2 className="section-title">{t('journey.title')}</h2>
          <p className="section-subtitle">
            {t('journey.subtitle')}
          </p>

          <div className="step-grid">
            <StepItem
              icon={Watch}
              iconColor="#E03232"
              title={t('journey.s1Title')}
              description={t('journey.s1Desc')}
            />
            <StepItem
              icon={FileText}
              iconColor="#E03232"
              title={t('journey.s2Title')}
              description={t('journey.s2Desc')}
            />
            <StepItem
              icon={CheckCircle2}
              iconColor="#E03232"
              title={t('journey.s3Title')}
              description={t('journey.s3Desc')}
            />
            <StepItem
              icon={Truck}
              iconColor="#E03232"
              title={t('journey.s4Title')}
              description={t('journey.s4Desc')}
            />
          </div>
        </section>

        {/* HALF CARDS */}
        <section className={`half-cards-section scroll-animate ${lang === 'ar' ? 'rtl-text' : ''}`}>
          <HalfCard
            title={t('halfCards.c1Title')}
            description={t('halfCards.c1Desc')}
          />
          <HalfCard
            title={t('halfCards.c2Title')}
            description={t('halfCards.c2Desc')}
          />
        </section>

        {/* APP MOCKUP SECTION */}
        <div className={`app-section-wrapper scroll-animate ${lang === 'ar' ? 'rtl-text' : ''}`}>
          <section className="app-section">
            <div className="app-text">
              <h2 className="split-title">{t('appSection.title')}</h2>
              <p className="split-desc">
                {t('appSection.desc')}
              </p>
              <ul className="app-list">
                <li className="app-list-item"><CheckCircle2 size={18} className="check" /> {t('appSection.l1')}</li>
                <li className="app-list-item"><CheckCircle2 size={18} className="check" /> {t('appSection.l2')}</li>
                <li className="app-list-item"><CheckCircle2 size={18} className="check" /> {t('appSection.l3')}</li>
              </ul>
              <div className={`store-buttons ${lang === 'ar' ? 'rtl-buttons' : ''}`}>
                <a href="#" className="store-btn">
                  <Apple size={28} />
                  <div className="store-btn-text">
                    <span className="store-btn-sub">{t('appSection.appStore')}</span>
                    <span className="store-btn-title">{t('appSection.appStoreTitle')}</span>
                  </div>
                </a>
                <a href="#" className="store-btn store-btn-google">
                  <Play size={28} />
                  <div className="store-btn-text">
                    <span className="store-btn-sub">{t('appSection.googlePlay')}</span>
                    <span className="store-btn-title">{t('appSection.googlePlayTitle')}</span>
                  </div>
                </a>
              </div>
            </div>
            <div className="app-image">
              <img src={appScreenImg} alt="Qlink App" className="floating-app-screen img-shadow-dark" />
            </div>
          </section>
        </div>

        {/* CTA */}
        <section className={`cta-section scroll-animate ${lang === 'ar' ? 'rtl-text' : ''}`}>
          <h2 className={`cta-title ${lang === 'ar' ? '' : 'cta-title-eng'}`}>{t('cta.title')}</h2>
          <button className="btn btn-primary btn-large-pad">{t('cta.btn')}</button>

          <div className="cta-line"></div>

          <p className="cta-footer-text">
            {t('cta.footer')}
          </p>
        </section>
      </div>
    </div>
  );
}

export default Home;
