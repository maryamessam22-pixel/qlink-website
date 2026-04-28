import React, { useEffect, useContext, useState, useMemo } from 'react';
import SEO from '../../components/common/SEO';
import { LanguageContext } from '../../context/LanguageContext';
import { ShieldCheck, Lock, EyeOff, Activity, AlertCircle, CheckCircle2, Apple, Play } from 'lucide-react';
import { supabase } from '../../lib/Supabase';
import './PrivacySecurity.css';

import promoMobiles from '../../assets/images/appscreen.png';

function parsePointsColumn(raw) {
  if (raw == null) return [];
  if (Array.isArray(raw)) return raw.map(String).filter(Boolean);
  if (typeof raw === 'string') {
    try {
      const p = JSON.parse(raw);
      return Array.isArray(p) ? p.map(String).filter(Boolean) : [];
    } catch {
      return [];
    }
  }
  return [];
}

function pickLocalizedText(ar, en, isArabic) {
  const primary = isArabic ? ar : en;
  const secondary = isArabic ? en : ar;
  if (primary != null && String(primary).trim() !== '') return String(primary).trim();
  if (secondary != null && String(secondary).trim() !== '') return String(secondary).trim();
  return '';
}

const PrivacySecurity = () => {
  const { t, lang } = useContext(LanguageContext);
  const [seoData, setSeoData] = useState(null);
  const [cmsData, setCmsData] = useState({
    hero: null,
    control: null,
    protocol: null,
    legal: null
  });
  const [privacyCardRows, setPrivacyCardRows] = useState(null);

  const isArabic = typeof lang === 'string' && lang.toLowerCase().includes('ar');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: seo } = await supabase
          .from('seo')
          .select('*')
          .eq('slug', 'about/privacy')
          .single();
        if (seo) setSeoData(seo);

        const { data: cms } = await supabase
          .from('cms_content')
          .select('*')
          .in('section_key', ['privacy_hero', 'privacy_control', 'privacy_protocol', 'legal_privacy']);

        if (cms) {
          setCmsData({
            hero: cms.find(c => c.section_key === 'privacy_hero'),
            control: cms.find(c => c.section_key === 'privacy_control'),
            protocol: cms.find(c => c.section_key === 'privacy_protocol'),
            legal: cms.find(c => c.section_key === 'legal_privacy')
          });
        }

        const { data: psc, error: pscError } = await supabase
          .from('privacy_security_cards')
          .select('*');

        if (pscError) {
          console.error('privacy_security_cards:', pscError);
        } else if (psc?.length) {
          setPrivacyCardRows(psc);
        }
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
    }, { threshold: 0.1, rootMargin: '-50px' });

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const { hero, control, protocol, legal } = cmsData;

  const heroTitle = hero ? (isArabic ? hero.title_ar : hero.title_en) : t('privacy.heroTitle');
  const heroHighlight = hero ? (isArabic ? hero.subtitle_ar : hero.subtitle_en) : t('privacy.heroTitleHighlight');
  const heroDesc = hero ? (isArabic ? hero.content_ar : hero.content_en) : t('privacy.heroDesc');

  const legalTitle = legal ? (isArabic ? legal.title_ar : legal.title_en) : t('privacy.promiseTitle');
  const legalDesc = legal ? (isArabic ? legal.content_ar : legal.content_en) : t('privacy.promiseDesc');

  const controlTitle = control ? (isArabic ? control.title_ar : control.title_en) : t('privacy.controlTitle');
  const controlDesc = control ? (isArabic ? control.content_ar : control.content_en) : t('privacy.controlDesc');

  const protocolTitle = protocol ? (isArabic ? protocol.title_ar : protocol.title_en) : t('privacy.protocolTitle');
  const protocolDesc = protocol ? (isArabic ? protocol.content_ar : protocol.content_en) : t('privacy.protocolDesc');

  const { sharedTitle, notSharedTitle, sharedItems, notSharedItems } = useMemo(() => {
    const sharedRow = privacyCardRows?.find(r => r.card_type === 'shared');
    const notSharedRow = privacyCardRows?.find(r => r.card_type === 'not_shared');
    const fallbackShared = t('privacy.sharedItems', { returnObjects: true }) || [];
    const fallbackNot = t('privacy.notSharedItems', { returnObjects: true }) || [];

    if (!sharedRow || !notSharedRow) {
      return {
        sharedTitle: t('privacy.sharedTitle'),
        notSharedTitle: t('privacy.notSharedTitle'),
        sharedItems: Array.isArray(fallbackShared) ? fallbackShared : [],
        notSharedItems: Array.isArray(fallbackNot) ? fallbackNot : [],
      };
    }

    const sharedTitleText = pickLocalizedText(sharedRow.title_ar, sharedRow.title_en, isArabic) || t('privacy.sharedTitle');
    const notSharedTitleText =
      pickLocalizedText(notSharedRow.title_ar, notSharedRow.title_en, isArabic) || t('privacy.notSharedTitle');

    const sharedPts = parsePointsColumn(isArabic ? notSharedRow.points_ar : notSharedRow.points_en);
    const notSharedPts = parsePointsColumn(isArabic ? sharedRow.points_ar : sharedRow.points_en);
    const sharedPtsAlt = parsePointsColumn(isArabic ? notSharedRow.points_en : notSharedRow.points_ar);
    const notSharedPtsAlt = parsePointsColumn(isArabic ? sharedRow.points_en : sharedRow.points_ar);

    return {
      sharedTitle: sharedTitleText,
      notSharedTitle: notSharedTitleText,
      sharedItems: sharedPts.length ? sharedPts : sharedPtsAlt.length ? sharedPtsAlt : (Array.isArray(fallbackShared) ? fallbackShared : []),
      notSharedItems:
        notSharedPts.length ? notSharedPts : notSharedPtsAlt.length ? notSharedPtsAlt : (Array.isArray(fallbackNot) ? fallbackNot : []),
    };
  }, [privacyCardRows, isArabic, t]);

  return (
    <div className={`privacy-security-page ${isArabic ? 'rtl-text' : ''}`}>
      <SEO
        title={seoData ? (isArabic ? seoData.title_ar : seoData.title_en) : (isArabic ? 'الخصوصية والأمان' : 'Privacy & Security')}
        description={seoData ? (isArabic ? seoData.description_ar : seoData.description_en) : (isArabic ? 'خصوصيتك هي أولويتنا.' : 'Your privacy is our priority.')}
        slug={seoData ? seoData.slug : "about/privacy"}
      />
      <div className="ps-content-container">
        <header className="ps-header scroll-animate">
          <h1>
            {isArabic ? 'الخصوصية و' : 'Privacy & '}
            <span className="red-text">{isArabic ? 'الأمان' : 'Security'}</span>
          </h1>
          <p className="ps-hero-desc">{heroDesc}</p>
        </header>

        <section className="ps-promise-section scroll-animate stag-1">
          <div className="ps-promise-card">
            <div className="ps-icon-box red-glow">
              <ShieldCheck size={28} />
            </div>
            <div className="ps-promise-text">
              <h2>{legalTitle}</h2>
              <p>{legalDesc}</p>
            </div>
          </div>
        </section>

        <section className="ps-grid-section">
          <div className="ps-grid-band">
            <div className="ps-grid-band-inner">
              <div className="ps-grid-container">
                <div className="ps-shared-card scroll-animate stag-1">
                  <div className="ps-grid-header">
                    <div className="ps-small-icon green">
                      <Lock size={20} />
                    </div>
                    <h3>{sharedTitle}</h3>
                  </div>
                  <ul className="ps-list green">
                    {sharedItems.map((item, idx) => (
                      <li key={idx}><span className="dot"></span>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="ps-shared-card scroll-animate stag-2">
                  <div className="ps-grid-header">
                    <div className="ps-small-icon red">
                      <EyeOff size={20} />
                    </div>
                    <h3>{notSharedTitle}</h3>
                  </div>
                  <ul className="ps-list red">
                    {notSharedItems.map((item, idx) => (
                      <li key={idx}><span className="dot"></span>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ps-control-section scroll-animate">
          <div className="ps-control-box">
            <div className="ps-main-icon">
              <Activity size={32} />
            </div>
            <h2>{controlTitle}</h2>
            <p>{controlDesc}</p>
            <button className="ps-terms-btn">{t('privacy.controlBtn')}</button>
          </div>
        </section>

        <section className="ps-fallback-section">
          <div className="ps-fallback-band">
            <div className="ps-fallback-band-inner">
              <div className="ps-fallback-content scroll-animate">
                <h2>{protocolTitle}</h2>
                <p>{protocolDesc}</p>
              </div>

              <div className="ps-disclaimer-card scroll-animate stag-1">
                <div className="ps-disclaimer-header">
                  <div className="ps-disclaimer-icon-box">
                    <AlertCircle size={22} />
                  </div>
                  <h4>{t('privacy.disclaimerTitle')}</h4>
                </div>
                <p>{t('privacy.disclaimerDesc')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="ps-app-promo-wrap scroll-animate">
          <header className="ps-app-header">
            <div className="ps-app-header-inner">
              <h2>{t('privacy.installTitle')} <span className="red-text">{t('privacy.installTitleRed')}</span></h2>
              <p>{t('privacy.installSubtitle')}</p>
            </div>
          </header>

          <div className="ps-promo-inner">
            <div className="ps-promo-row">
              <div className="app-text">
                <h2 className="split-title">{t('appSection.title')}</h2>
                <p className="split-desc">{t('appSection.desc')}</p>
                <ul className="app-list">
                  <li className="app-list-item"><CheckCircle2 size={18} className="check" /> {t('appSection.l1')}</li>
                  <li className="app-list-item"><CheckCircle2 size={18} className="check" /> {t('appSection.l2')}</li>
                  <li className="app-list-item"><CheckCircle2 size={18} className="check" /> {t('appSection.l3')}</li>
                </ul>
                <div className={`store-buttons ${isArabic ? 'rtl-buttons' : ''}`}>
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
                <img src={promoMobiles} alt="Qlink App" className="floating-app-screen img-shadow-dark" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacySecurity;