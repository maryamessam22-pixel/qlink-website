import React, { useContext, useEffect } from 'react';
import SEO from '../../components/common/SEO';
import { LanguageContext } from '../../context/LanguageContext';
import DynamicBackground from '../../components/common/DynamicBackground';
import ContactSection from '../../components/Sections/ContactSection';
import { HelpCircle, Apple, Play } from 'lucide-react';
import './Contact.css';

// Assets
import mobileVisuals from '../../assets/images/2mobiles.png';

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

      {/* 3. Questions CTA */}
      <section className="questions-cta-section scroll-animate stag-2">
        <div className="q-icon">
          <HelpCircle size={32} />
        </div>
        <h2>{lang === 'ar' ? 'لا تزال لديك أسئلة؟' : 'Still have questions?'}</h2>
        <p>{lang === 'ar' ? 'لا تجد الإجابة التي تبحث عنها؟ تحقق من قسم الأسئلة الشائعة الشامل للحصول على معلومات مفصلة عن كيو لينك.' : 'Can\'t find the answer you\'re looking for? Check out our comprehensive FAQ section for detailed information about Qlink.'}</p>
        <button className="btn-cta" onClick={() => window.location.href = '/support/faqs'}>
          {lang === 'ar' ? 'عرض الأسئلة الشائعة' : 'View FAQs'}
        </button>
      </section>

      {/* 4. Stay Updated (Newsletter) */}
      <section className="newsletter-section scroll-animate stag-3">
        <h2>{lang === 'ar' ? 'ابق على اطلاع' : 'Stay Updated'}</h2>
        <p>{lang === 'ar' ? 'اشترك في نشرتنا الإخبارية للحصول على أحدث نصائح الأمان وتحديثات المنتجات والعروض الحصرية.' : 'Subscribe to our newsletter for the latest safety tips, product updates, and exclusive offers.'}</p>
        <div className="newsletter-form">
          <input type="email" placeholder={lang === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'} />
          <button className="btn-sub">{lang === 'ar' ? 'اشترك' : 'Subscribe'}</button>
        </div>
      </section>

      {/* 5. Install App (Visuals on right) */}
      <section className="install-app-section scroll-animate stag-4">
        <div className="ia-content">
          <h2>{lang === 'ar' ? 'ثبت التطبيق ' : 'Install the App '}<span>{lang === 'ar' ? 'الآن!' : 'Now!'}</span></h2>
          <p>{lang === 'ar' ? 'تحكم بشكل كامل في سلامتك. أدر الملفات الشخصية، واحصل على تنبيهات فورية، والمزيد.' : 'Take full control of your safety. Manage profiles, get real-time alerts, and more.'}</p>
          <div className="ia-buttons">
            <div className="ia-btn white">
               <Apple size={24} fill="black" />
               <div className="btn-text">
                 <span>{lang === 'ar' ? 'حمله من' : 'Download on the'}</span>
                 <strong>App Store</strong>
               </div>
            </div>
            <div className="ia-btn">
               <Play size={24} fill="#E03232" color="#E03232" />
               <div className="btn-text">
                 <span>{lang === 'ar' ? 'احصل عليه من' : 'Get it on'}</span>
                 <strong>Google Play</strong>
               </div>
            </div>
          </div>
        </div>
        <div className="ia-visuals">
          <img src={mobileVisuals} alt="Qlink App Mockup" className="ia-mobiles" />
        </div>
      </section>

    </div>
  );
}

export default Contact;
