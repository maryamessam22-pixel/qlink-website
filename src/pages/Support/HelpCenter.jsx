import React, { useEffect, useState, useContext } from 'react';
import SEO from '../../components/common/SEO';
import { LanguageContext } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';
import {
  Book,
  Wrench,
  CreditCard,
  ChevronDown,
  Users,
  Send,
  CheckCircle2,
  Apple,
  Play
} from 'lucide-react';
import { supabase } from '../../lib/Supabase';
import './HelpCenter.css';
import DynamicBackground from '../../components/common/DynamicBackground';
import ContactSection from '../../components/Sections/ContactSection';
import appScreenImg from '../../assets/images/appscreen.png';

function HelpCenter() {
  const { lang, t } = useContext(LanguageContext);
  const [activeFaq, setActiveFaq] = useState(null);
  const [seoData, setSeoData] = useState(null);

  const isArabic = typeof lang === 'string' && lang.toLowerCase().includes('ar');

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    { question: 'How does the emergency contact get notified?', answer: 'Your emergency contacts will receive an SMS and email with your location and a link to your medical profile once the QR code is scanned.' },
    { question: 'Is my medical data public?', answer: 'Only the information you choose to make public is visible on a scan. Sensitive data requires your secure PIN to unlock.' },
    { question: 'How often do I need to charge it?', answer: 'The Nova bracelet battery lasts up to 7 days on a single charge. The Pulse tactical model lasts up to 6 months.' },
    { question: 'Is it waterproof?', answer: 'Yes, all Qlink devices are IP68 waterproof rated, meaning you can shower, swim, and be active without taking them off.' }
  ];

  useEffect(() => {
    const fetchSeo = async () => {
      try {
        const { data, error } = await supabase
          .from('seo')
          .select('*')
          .eq('slug', 'support/help-center')
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Supabase HelpCenter SEO fetch error:', error);
        } else if (data) {
          console.log("SEO DATA GAT YAAAAY (HelpCenter): ", data);
          setSeoData(data);
        }
      } catch (err) {
        console.error('Unexpected error fetching HelpCenter SEO:', err);
      }
    };

    fetchSeo();
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

  const steps = [
    { num: '01', title: t('supportCenter.step1Title'), desc: t('supportCenter.step1Desc') },
    { num: '02', title: t('supportCenter.step2Title'), desc: t('supportCenter.step2Desc') },
    { num: '03', title: t('supportCenter.step3Title'), desc: t('supportCenter.step3Desc') },
  ];

  return (
    <div className="help-center-wrapper">
      <SEO 
        title={
          seoData 
            ? (isArabic ? seoData.title_ar : seoData.title_en) 
            : (isArabic ? 'مركز المساعدة' : 'Help Center')
        }
        description={
          seoData 
            ? (isArabic ? seoData.description_ar : seoData.description_en) 
            : (isArabic ? 'هل تحتاج إلى مساعدة؟ مركز المساعدة في كيو لينك يوفر لك كل ما تحتاجه من إرشادات ودعم فني.' : 'Need help? The Qlink Help Center provides guidance.')
        }
        slug={seoData ? seoData.slug : "support/help-center"}
      />
      <DynamicBackground />

      <div className={`help-center-content ${isArabic ? 'rtl-text' : ''}`}>

        <section className="support-header-section scroll-animate stag-1">
          <h1 className="support-title">
            {t('supportCenter.heroTitle')} <span className="red-text">{t('supportCenter.heroHighlight')}</span>
          </h1>
          <p className="support-subtitle">
            {t('supportCenter.heroDesc')}
          </p>
        </section>

        <section className="support-cards-section scroll-animate stag-2">
          <div className="card-grid-3">
            <div className="support-card card-purple">
              <div className="icon-wrap icon-wrap-glass" style={{ color: '#8a2be2' }}>
                <Book size={24} />
              </div>
              <h3>{t('supportCenter.card1Title')}</h3>
              <p>{t('supportCenter.card1Desc')}</p>
            </div>

            <div className="support-card card-red">
              <div className="icon-wrap icon-wrap-red" style={{ color: '#E03232' }}>
                <Wrench size={24} />
              </div>
              <h3>{t('supportCenter.card2Title')}</h3>
              <p>{t('supportCenter.card2Desc')}</p>
            </div>

            <div className="support-card card-blue">
              <div className="icon-wrap icon-wrap-glass" style={{ color: '#0d6efd' }}>
                <CreditCard size={24} />
              </div>
              <h3>{t('supportCenter.card3Title')}</h3>
              <p>{t('supportCenter.card3Desc')}</p>
            </div>
          </div>
        </section>

        <section className="faq-section scroll-animate stag-3">
          <div className="faq-header">
            <h2>{t('supportCenter.faqTitle')}</h2>
            <span className="faq-badge red-text">{t('supportCenter.faqBadge')}</span>
          </div>

          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`faq-item glass-panel ${activeFaq === idx ? 'active' : ''}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className="faq-question">
                  <h4>{faq.question}</h4>
                  <ChevronDown
                    size={20}
                    className={`faq-icon ${activeFaq === idx ? 'rotate' : ''}`}
                  />
                </div>
                <div className={`faq-answer ${activeFaq === idx ? 'open' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-more">
            <Link to="/support/faqs" className="btn btn-primary">
              {t('supportCenter.faqMoreBtn')}
            </Link>
          </div>
        </section>

        <section className="community-section scroll-animate stag-1">
          <div className="community-icon">
            <Users size={32} />
          </div>
          <h2>{t('supportCenter.communityTitle')}</h2>
          <p>
            {t('supportCenter.communityDesc')}
          </p>
        </section>

      </div> 

      <ContactSection />

      <div className={`app-section-wrapper scroll-animate ${isArabic ? 'rtl-text' : ''}`}>
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
              <img src={appScreenImg} alt="Qlink App" className="floating-app-screen img-shadow-dark" />
            </div>
          </section>
        </div>

      <section className="timeline-section-fw scroll-animate stag-3">
        <div className="timeline-content-fw">
          <h2 className="timeline-title-fw">
            {t('supportCenter.installTitle')} <span className="highlight-red">{t('supportCenter.installHighlight')}</span>
          </h2>
          <p className="timeline-desc-fw">
            {t('supportCenter.installDesc')}
          </p>
          <div className="timeline-steps-fw">
            <div className="timeline-line-fw" />
            {steps.map(({num,title,desc})=>(
              <div key={num} className="timeline-step-fw">
                <div className={`step-circle-fw ${num==="01"?"active-step":""}`}>
                  {num}
                </div>
                <div className="step-title-fw">{title}</div>
                <div className="step-desc-fw" dir={isArabic ? 'rtl' : 'ltr'}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default HelpCenter;