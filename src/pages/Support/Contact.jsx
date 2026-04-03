import React, { useContext, useEffect } from 'react';
import SEO from '../../components/common/SEO';
import { LanguageContext } from '../../context/LanguageContext';
import DynamicBackground from '../../components/common/DynamicBackground';
import ContactSection from '../../components/Sections/ContactSection';
import AppPromoSection from '../../components/Sections/AppPromoSection';
import { HelpCircle } from 'lucide-react';
import './Contact.css';

// Assets
import mobileVisuals from '../../assets/images/mobile3rd.png';

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

      {/* 5. Install App (Now using AppPromoSection with mobile3rd) */}
      <AppPromoSection 
        imageSrc={mobileVisuals}
        customTitle={lang === 'ar' ? 'ثبت التطبيق ' : 'Install the App '}
        customFocus={lang === 'ar' ? 'الآن!' : 'Now!'}
        customDesc={lang === 'ar' ? 'تحكم بشكل كامل في سلامتك. أدر الملفات الشخصية، واحصل على تنبيهات فورية، والمزيد.' : 'Take full control of your safety. Manage profiles, get real-time alerts, and more.'}
      />

    </div>
  );
}

export default Contact;
