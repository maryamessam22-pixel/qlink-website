import React, { useContext, useEffect } from 'react';
import SEO from '../../components/common/SEO';
import { LanguageContext } from '../../context/LanguageContext';
import DynamicBackground from '../../components/common/DynamicBackground';
import ContactSection from '../../components/Sections/ContactSection';
import { HelpCircle } from 'lucide-react';
import './Contact.css';

function Contact() {
  const { lang, t } = useContext(LanguageContext);

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

  return (
    <div className={`contact-page ${lang === 'ar' ? 'rtl-text' : ''}`}>
      <SEO 
        title={lang === 'ar' ? 'اتصل بنا' : 'Contact Us'}
        description={lang === 'ar' ? 'تواصل مع فريق كيو لينك لأي استفسارات أو دعم.' : 'Get in touch with the Qlink team for any inquiries or support.'}
        slug="support/contact"
      />
      <DynamicBackground />
      
      {/* 1. Hero */}
      <section className="contact-hero scroll-animate stag-1">
        <h1>{lang === 'ar' ? 'تواصل ' : 'Get in '}<span>{lang === 'ar' ? 'معنا' : 'Touch'}</span></h1>
        <p>{lang === 'ar' ? 'هل لديك أسئلة حول كيو لينك؟ فريقنا هنا لمساعدتك في تأمين راحة بالك.' : 'Have questions about Qlink? Our team is here to help you secure your peace of mind.'}</p>
      </section>

      {/* 2. Contact Main (Form + Info) */}
      <div className="contact-main-wrapper">
        <ContactSection />
      </div>

    </div>
  );
}

export default Contact;
