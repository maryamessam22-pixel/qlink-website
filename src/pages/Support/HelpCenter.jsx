import React, { useEffect, useState, useContext } from 'react';
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
import './HelpCenter.css';
import DynamicBackground from '../../components/common/DynamicBackground';
import ContactSection from '../../components/Sections/ContactSection';
import appScreenImg from '../../assets/images/appscreen.png';

function HelpCenter() {
  const { lang, t } = useContext(LanguageContext);
  const [activeFaq, setActiveFaq] = useState(null);

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
    // Reusing the same IntersectionObserver logic from Home
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

  const F = '"Roboto", sans-serif';
  const steps = [
    { num: '01', title: t('supportCenter.step1Title'), desc: t('supportCenter.step1Desc') },
    { num: '02', title: t('supportCenter.step2Title'), desc: t('supportCenter.step2Desc') },
    { num: '03', title: t('supportCenter.step3Title'), desc: t('supportCenter.step3Desc') },
  ];

  return (
    <div className="help-center-wrapper">
      <DynamicBackground />

      <div className={`help-center-content ${lang === 'ar' ? 'rtl-text' : ''}`}>

        {/* HEADER SECTION */}
        <section className="support-header-section scroll-animate stag-1">
          <h1 className="support-title">
            {t('supportCenter.heroTitle')} <span className="red-text">{t('supportCenter.heroHighlight')}</span>
          </h1>
          <p className="support-subtitle">
            {t('supportCenter.heroDesc')}
          </p>
        </section>

        {/* SUPPORT CARDS */}
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

        {/* FAQ SECTION */}
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
            <button className="btn btn-primary">{t('supportCenter.faqMoreBtn')}</button>
          </div>
        </section>

        {/* JOIN THE COMMUNITY */}
        <section className="community-section scroll-animate stag-1">
          <div className="community-icon">
            <Users size={32} />
          </div>
          <h2>{t('supportCenter.communityTitle')}</h2>
          <p>
            {t('supportCenter.communityDesc')}
          </p>
        </section>

        {/* CONTACT US SECTION */}
        <ContactSection />

        {/* APP MOCKUP SECTION (Reused from Home) */}
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

        {/* INSTALL APP TIMELINE SECTION */}
        <section className="scroll-animate stag-3" style={{padding:"60px 48px",textAlign:"center",background:"#0f1625"}}>
          <h2 style={{fontFamily:F,fontSize:"1.8rem",fontWeight:800,color:"#ddeeff",marginBottom:"6px"}}>
            {t('supportCenter.installTitle')} <span style={{color:"#e8453c"}}>{t('supportCenter.installHighlight')}</span>
          </h2>
          <p style={{fontFamily:F,fontSize:"0.85rem",color:"#6b82aa",marginBottom:"44px"}}>
            {t('supportCenter.installDesc')}
          </p>
          <div style={{position:"relative",display:"flex",justifyContent:"center",maxWidth:"700px",margin:"0 auto"}}>
            <div style={{position:"absolute",top:"28px",left:"15%",right:"15%",height:"2px",background:"linear-gradient(90deg,#e8453c,rgba(59,130,246,0.4))",zIndex:0}}/>
            {steps.map(({num,title,desc})=>(
              <div key={num} style={{flex:1,textAlign:"center",position:"relative",zIndex:1,padding:"0 12px"}}>
                <div style={{
                  width:"56px",height:"56px",borderRadius:"50%",
                  background:"linear-gradient(135deg,#161f35,#0f1c3a)",
                  border:`2px solid ${num==="01"?"#e8453c":"rgba(59,130,246,0.3)"}`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  margin:"0 auto 16px",
                  fontFamily:F,fontSize:"0.9rem",fontWeight:700,
                  color:num==="01"?"#e8453c":"#3b82f6",
                }}>{num}</div>
                <div style={{fontFamily:F,fontSize:"0.9rem",fontWeight:700,color:"#ddeeff",marginBottom:"6px"}}>{title}</div>
                <div style={{fontFamily:F,fontSize:"0.78rem",color:"#6b82aa",lineHeight:1.5}}>{desc}</div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

export default HelpCenter;
