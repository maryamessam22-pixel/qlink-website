import React, { useEffect, useState, useContext, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import { LanguageContext } from '../../context/LanguageContext';
import DynamicBackground from '../../components/common/DynamicBackground';
import { Quote, AlertCircle, CheckCircle, Shield, Globe, Zap, Users } from 'lucide-react';
import { supabase } from '../../lib/Supabase';

import './OurStory.css';

function OurStory() {
  const { t, lang } = useContext(LanguageContext);
  const [seoData, setSeoData] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [cmsData, setCmsData] = useState({ founder: null, vision: null });

  const isArabic = typeof lang === 'string' && lang.toLowerCase().includes('ar');
  const rawStats = useMemo(() => t('ourStory.stats', { returnObjects: true }) || [], [lang, t]);
  const [animatedStats, setAnimatedStats] = useState(rawStats.map((stat) => stat.value));
  const statsSectionRef = useRef(null);
  const statsStartedRef = useRef(false);

  useEffect(() => {
    setAnimatedStats(rawStats.map((stat) => stat.value));
    statsStartedRef.current = false;
  }, [rawStats]);

  useEffect(() => {
    const parseStat = (value) => {
      const raw = String(value || '');
      const match = raw.match(/(-?[\d,.]+)/);
      if (!match) return null;
      const numeric = parseFloat(match[1].replace(/,/g, ''));
      if (Number.isNaN(numeric)) return null;
      return {
        prefix: raw.slice(0, match.index),
        suffix: raw.slice(match.index + match[1].length),
        target: numeric,
        precision: match[1].includes('.') ? match[1].split('.')[1].length : 0,
      };
    };

    const statsMeta = rawStats.map((stat) => ({ value: String(stat.value), parsed: parseStat(stat.value) }));

    const animateStat = (index, parsed) => {
      if (!parsed) return;
      const duration = 900;
      const startTime = performance.now();

      const step = (time) => {
        const progress = Math.min(1, (time - startTime) / duration);
        const current = parsed.target * progress;
        const displayNumber = parsed.precision > 0
          ? current.toFixed(parsed.precision)
          : Math.round(current).toString();

        setAnimatedStats((prev) => {
          const next = [...prev];
          next[index] = `${parsed.prefix}${displayNumber}${parsed.suffix}`;
          return next;
        });

        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsStartedRef.current) {
          statsStartedRef.current = true;
          statsMeta.forEach((item, index) => {
            animateStat(index, item.parsed);
          });
        }
      });
    }, { threshold: 0.5 });

    if (statsSectionRef.current) observer.observe(statsSectionRef.current);
    return () => observer.disconnect();
  }, [rawStats]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: seo } = await supabase
          .from('seo')
          .select('*')
          .eq('slug', 'about/our-story')
          .single();

        if (seo) setSeoData(seo);

        const { data: cms } = await supabase
          .from('cms_content')
          .select('*')
          .in('section_key', ['about_founder', 'about_vision']);

        if (cms) {
          const founder = cms.find(c => c.section_key === 'about_founder');
          const vision = cms.find(c => c.section_key === 'about_vision');
          setCmsData({ founder, vision });
        }

        const { data: team } = await supabase
          .from('team_members')
          .select('*')
          .order('display_order', { ascending: true });

        if (team) setTeamMembers(team);
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
        }
      });
    }, { threshold: 0.15, rootMargin: '-50px' });

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const { founder, vision } = cmsData;
  const missionTitle = vision ? (isArabic ? vision.title_ar : vision.title_en) : t('ourStory.missionTitle');
  const missionQuote = vision ? (isArabic ? vision.content_ar : vision.content_en) : t('ourStory.missionQuote');
  const founderName = founder ? (isArabic ? founder.title_ar : founder.title_en) : t('ourStory.founderName');
  const founderRole = founder ? (isArabic ? founder.subtitle_ar : founder.subtitle_en) : t('ourStory.founderRole');
  const founderMissionText = founder ? (isArabic ? founder.content_ar : founder.content_en) : null;

  return (
    <div className={`our-story-detailed-page ${isArabic ? 'rtl-text' : ''}`}>
      <SEO 
        title={seoData ? (isArabic ? seoData.title_ar : seoData.title_en) : (isArabic ? 'قصتنا' : 'Our Story')}
        description={seoData ? (isArabic ? seoData.description_ar : seoData.description_en) : (isArabic ? 'تعرف على قصة كيو لينك.' : 'Discover the story behind Qlink.')}
        slug={seoData ? seoData.slug : "about/our-story"}
      />
      <DynamicBackground />
      
      <div className="story-content-container">
        <header className="story-page-header scroll-animate stag-1">
          <span className="badge-red">{t('ourStory.heroBadge')}</span>
          <h1 className="main-title">{t('ourStory.heroTitle').split('QLink')[0]}<span>QLink</span>{t('ourStory.heroTitle').split('QLink')[1]}</h1>
        </header>

        <section className="story-step-section scroll-animate stag-2">
          <div className="step-number">1</div>
          <div className="step-content">
            <h2 className="step-title">{t('ourStory.sparkTitle')}</h2>
            <p className="step-paragraph">{t('ourStory.sparkText')}</p>
            <div className="dark-quote-box">
              <p>"{t('ourStory.sparkQuote')}"</p>
            </div>
          </div>
        </section>

        <section className="case-study-section scroll-animate stag-3">
          <div className="case-card-main">
            <div className="case-grid">
              <div className="case-info-side">
                <div className="case-title-row">
                  <div className="case-icon-bg red">
                    <Zap size={24} />
                  </div>
                  <h3>{t('ourStory.caseTitle')}</h3>
                </div>
                <p>{t('ourStory.caseText')}</p>
                <div className="case-quote-tag">
                  "{t('ourStory.sparkQuote')}"
                </div>
              </div>
              <div className="case-details-side">
                <div className="detail-item red">
                  <div className="detail-header">
                    <AlertCircle size={20} />
                    <h4>{t('ourStory.caseProblemTitle')}</h4>
                  </div>
                  <p>{t('ourStory.caseProblemDesc')}</p>
                </div>
                <div className="detail-item green">
                  <div className="detail-header">
                    <CheckCircle size={20} />
                    <h4>{t('ourStory.caseSolutionTitle')}</h4>
                  </div>
                  <p>{t('ourStory.caseSolutionDesc')}</p>
                </div>
                <button className="learn-tech-btn">{t('ourStory.caseBtn')}</button>
              </div>
            </div>
          </div>
        </section>

        <section className="story-step-section scroll-animate stag-1">
          <div className="step-number">2</div>
          <div className="step-content">
            <h2 className="step-title">{t('ourStory.innovationTitle')}</h2>
            <p className="step-paragraph">{t('ourStory.innovationText')}</p>
            <div className="innovation-extra-box">
               <p>{t('ourStory.innovationExtra')}</p>
            </div>
          </div>
        </section>

        {/* التعديل هنا: استخدام dangerouslySetInnerHTML للنص اللي جاي من الـ CMS */}
        <section className="founder-mission-section scroll-animate stag-2">
          <div className="mission-glass-box">
            <Quote size={40} className="mission-quote-icon" />
            <h2 className="mission-title">{missionTitle}</h2>
            {vision ? (
                <div className="mission-text" style={{ fontStyle: 'italic' }} dangerouslySetInnerHTML={{ __html: missionQuote }} />
            ) : (
                <p className="mission-text" style={{ fontStyle: 'italic' }}>"{missionQuote}"</p>
            )}
            
            {founderMissionText && (
                <div className="mission-text-secondary" style={{ marginTop: '20px', fontSize: '15px' }} dangerouslySetInnerHTML={{ __html: founderMissionText }} />
            )}

            <div className="founder-footer">
               <div className="founder-line"></div>
               <h4 className="founder-name">{founderName}</h4>
               <p className="founder-role">{founderRole}</p>
            </div>
          </div>
        </section>

        <section className="core-values-section scroll-animate stag-3">
          <span className="badge-red-small">{t('ourStory.valuesTitle')}</span>
          <h2 className="values-main-title">{t('ourStory.valuesSubtitle')}</h2>
          <div className="values-grid-new">
             {t('ourStory.values', { returnObjects: true }).map((val, idx) => (
               <div key={val.id} className="value-card-dark">
                 <div className="value-icon-circle">
                   {idx === 0 && <Shield size={24} />}
                   {idx === 1 && <Globe size={24} />}
                   {idx === 2 && <Zap size={24} />}
                 </div>
                 <h3>{val.title}</h3>
                 <p>{val.desc}</p>
               </div>
             ))}
          </div>
        </section>

        <section className="team-section scroll-animate stag-1">
           <div className="team-header">
              <span className="badge-red-small">{t('ourStory.teamTitle')}</span>
              <h2>{t('ourStory.teamSubtitle')}</h2>
           </div>
           <div className="team-grid">
              {teamMembers.map((m) => (
                <div key={m.id} className="team-member">
                   <div className="member-photo-wrapper">
                      <img src={m.image_url} alt={m.name} loading="lazy" />
                   </div>
                   <h4 className="member-name">{m.name}</h4>
                   <p className="member-role">{isArabic ? m.role_ar : m.role_en}</p>
                </div>
              ))}
           </div>
        </section>

      </div>

      <section className="story-stats-section scroll-animate stag-2">
         <div ref={statsSectionRef} className="stats-grid-story">
            {rawStats.map((s, i) => (
              <div key={i} className="stat-item-story">
                 <h3>{animatedStats[i]}</h3>
                 <p>{s.label}</p>
              </div>
            ))}
         </div>
      </section>

      <div className="story-content-container">
        <section className="story-final-cta scroll-animate stag-3">
           <h2>{t('ourStory.ctaTitle')}</h2>
           <p>{t('ourStory.ctaSubtitle')}</p>
           <Link to="/support/contact" className="contact-btn-red">
             {t('ourStory.ctaBtn')}
           </Link>
        </section>
      </div>
    </div>
  );
}

export default OurStory;