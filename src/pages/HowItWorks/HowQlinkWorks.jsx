import React, { useRef, useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import './HowQlinkWorks.css';
import { LanguageContext } from '../../context/LanguageContext';
import { supabase } from '../../lib/Supabase';
import {
  ShieldCheck,
  Database,
  Shield,
  Smartphone,
  Bell,
  WifiOff,
  MonitorSmartphone,
  CheckCircle2,
  Check,
  LogIn,
  Package,
  HelpCircle,
  PhoneCall
} from 'lucide-react';

import TimelineRow from '../../components/Cards/TimelineRow';
import FeatureBlock from '../../components/Cards/FeatureBlock';
import PricingCard from '../../components/Cards/PricingCard';
import SetupCard from '../../components/Cards/SetupCard';
import HelpCard from '../../components/Cards/HelpCard';

import watchVidSrc from '../../assets/videos/watch vid.mp4';
import qlinkVideoSrc from '../../assets/videos/qlink-video.mp4';

function HowQlinkWorks() {
  const lensRef = useRef(null);
  const { t, lang } = useContext(LanguageContext);


  const [seoData, setSeoData] = useState(null);


  useEffect(() => {
    const fetchSEO = async () => {
      try {
        const { data: seo } = await supabase
          .from('seo')
          .select('*')
          .eq('slug', 'how-it-works')
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
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.15, rootMargin: '-50px' });

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const centerVideoSrc = watchVidSrc;

  // Single video + feathered lens: follow pointer (mouse / touch / pen)
  useEffect(() => {
    const wrapper = lensRef.current;
    if (!wrapper) return;

    let currentX = wrapper.offsetWidth / 2;
    let currentY = wrapper.offsetHeight / 2;
    let targetX = currentX;
    let targetY = currentY;
    let rafId;

    const setTargetFromClient = (clientX, clientY) => {
      const rect = wrapper.getBoundingClientRect();
      targetX = clientX - rect.left;
      targetY = clientY - rect.top;
    };

    const onPointerMove = (e) => {
      setTargetFromClient(e.clientX, e.clientY);
    };

    const onPointerLeave = () => {
      targetX = wrapper.offsetWidth / 2;
      targetY = wrapper.offsetHeight / 2;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      wrapper.style.setProperty('--lens-x', `${currentX}px`);
      wrapper.style.setProperty('--lens-y', `${currentY}px`);
      rafId = requestAnimationFrame(tick);
    };

    wrapper.addEventListener('pointermove', onPointerMove);
    wrapper.addEventListener('pointerdown', onPointerMove);
    wrapper.addEventListener('pointerleave', onPointerLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      wrapper.removeEventListener('pointermove', onPointerMove);
      wrapper.removeEventListener('pointerdown', onPointerMove);
      wrapper.removeEventListener('pointerleave', onPointerLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="how-works-page">

      <SEO
        title={seoData ? (lang === 'ar' ? seoData.title_ar : seoData.title_en) : (lang === 'ar' ? 'كيف يعمل' : 'How it Works')}
        description={seoData ? (lang === 'ar' ? seoData.description_ar : seoData.description_en) : ''}
        slug="how-it-works"
      />

      <div className="hw-liquid-bg">
        <div className="hw-glow hw-glow-1"></div>
        <div className="hw-glow hw-glow-2"></div>
        <div className="hw-glow hw-glow-3"></div>
      </div>


      <section className={`hw-hero scroll-animate ${lang === 'ar' ? 'rtl-text' : ''}`}>
        <video className="hw-hero-video" src={qlinkVideoSrc} autoPlay loop muted playsInline />
        <div className="hw-hero-overlay"></div>
        <div className="hw-hero-content">
          <h1>{t('howWorks.heroTitle')}<span className="red-text">{t('howWorks.heroHighlight')}</span>{t('howWorks.heroTitleEnd')}</h1>
          <p>{t('howWorks.heroSubtitle')}</p>
        </div>
      </section>

      <section className={`hw-timeline-section ${lang === 'ar' ? 'rtl-text' : ''}`}>
        <div className="timeline-container">
          <TimelineRow
            title={t('howWorks.t1Title')}
            description={t('howWorks.t1Desc')}
            icon={Database}
            isRight={lang === 'ar' ? true : false}
          />
          <TimelineRow
            title={t('howWorks.t2Title')}
            description={t('howWorks.t2Desc')}
            icon={Shield}
            isRight={lang === 'ar' ? false : true}
          />
          <TimelineRow
            title={t('howWorks.t3Title')}
            description={t('howWorks.t3Desc')}
            icon={Smartphone}
            isRight={lang === 'ar' ? true : false}
          />
          <TimelineRow
            title={t('howWorks.t4Title')}
            description={t('howWorks.t4Desc')}
            icon={Bell}
            isRight={lang === 'ar' ? false : true}
          />
        </div>
      </section>

      <section className={`hw-features-section ${lang === 'ar' ? 'rtl-text' : ''}`}>
        <div className="features-col">
          <FeatureBlock
            title={t('howWorks.f1Title')}
            description={t('howWorks.f1Desc')}
          />
          <FeatureBlock
            title={t('howWorks.f2Title')}
            description={t('howWorks.f2Desc')}
          />
        </div>

        <div
          className="features-video-wrapper scroll-animate hw-lens-wrapper"
          ref={lensRef}
          role="img"
          aria-label={lang === 'ar' ? 'معاينة فيديو تفاعلية' : 'Interactive product video preview'}
        >
          <video
            className="hw-lens-video"
            src={centerVideoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
          <div className="hw-blur-overlay" aria-hidden />
          <div className="hw-lens-soft-halo" aria-hidden />
        </div>

        <div className="features-col">
          <FeatureBlock
            title={t('howWorks.f3Title')}
            description={t('howWorks.f3Desc')}
          />
          <FeatureBlock
            title={t('howWorks.f4Title')}
            description={t('howWorks.f4Desc')}
          />
        </div>
      </section>

      <section className={`hw-compare-section ${lang === 'ar' ? 'rtl-text' : ''}`}>
        <PricingCard
          headerIcon={WifiOff}
          headerText={t('howWorks.c1Head')}
          box1Title={t('howWorks.c1Box1Title')}
          box1Text={t('howWorks.c1Box1Text')}
          box2Title={t('howWorks.c1Box2Title')}
          box2Text={t('howWorks.c1Box2Text')}
          box2HighlightColor="#E03232"
        />

        <PricingCard
          headerIcon={MonitorSmartphone}
          headerText={t('howWorks.c2Head')}
          box1Icon={CheckCircle2}
          box1Title={t('howWorks.c2Box1Title')}
          box1Text={t('howWorks.c2Box1Text')}
          box2Icon={Check}
          box2Title={t('howWorks.c2Box2Title')}
          box2Text={t('howWorks.c2Box2Text')}
        />
      </section>


      <section className={`hw-setup-section ${lang === 'ar' ? 'rtl-text' : ''}`}>
        <div className="hw-section-sub">{t('howWorks.setupSub')}</div>
        <h2 className="hw-section-title">{t('howWorks.setupTitle')}</h2>

        <div className="setup-grid">
          <SetupCard
            icon={LogIn}
            iconBgColor="rgba(56, 189, 248, 0.15)"
            iconColor="#38bdf8"
            title={t('howWorks.s1Title')}
            description={t('howWorks.s1Desc')}
          />
          <SetupCard
            icon={ShieldCheck}
            iconBgColor="rgba(16, 185, 129, 0.15)"
            iconColor="#10B981"
            title={t('howWorks.s2Title')}
            description={t('howWorks.s2Desc')}
          />
          <SetupCard
            icon={Package}
            iconBgColor="rgba(224, 50, 50, 0.15)"
            iconColor="#E03232"
            title={t('howWorks.s3Title')}
            description={t('howWorks.s3Desc')}
          />
        </div>
      </section>

      {/* <section className={`hw-help-grid ${lang === 'ar' ? 'rtl-text' : ''}`}>
        <HelpCard
          icon={HelpCircle}
          iconColor="#E03232"
          title={t('howWorks.helpTitle')}
          description={t('howWorks.helpDesc')}
        />
        <HelpCard
          icon={PhoneCall}
          iconColor="#10B981"
          title={t('howWorks.helpTitle')}
          description={t('howWorks.helpDesc')}
        />
      </section> */}

      <section className={`hw-cta-section ${lang === 'ar' ? 'rtl-text' : ''}`}>
        <h2 style={{ fontSize: '32px', fontWeight: '800' }}>{t('howWorks.ctaTitle')}</h2>
        <div className={`hw-cta-buttons ${lang === 'ar' ? 'rtl-buttons' : ''}`}>
          <Link to="/shop/bracelet" className="btn btn-primary">{t('howWorks.ctaBtn1')}</Link>
          <a href="#" className="btn btn-secondary" style={{ width: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>{t('howWorks.ctaBtn2')}</a>
        </div>
      </section>

    </div>
  );
}

export default HowQlinkWorks;
