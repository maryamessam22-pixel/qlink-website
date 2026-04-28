import React, { useContext, useEffect, useState } from 'react';
import SEO from '../../components/common/SEO';
import { LanguageContext } from '../../context/LanguageContext';
import ContactSection from '../../components/Sections/ContactSection';
import AppPromoSection from '../../components/Sections/AppPromoSection';
import { HelpCircle } from 'lucide-react';
import { supabase } from '../../lib/Supabase';
import './Contact.css';

import mobileVisuals from '../../assets/images/mobile3rd.png';

function Contact() {
  const { lang, t } = useContext(LanguageContext);
  
  const [seoData, setSeoData] = useState(null);
  const [cms, setCms] = useState({});

  const isArabic = typeof lang === 'string' && lang.toLowerCase().includes('ar');

  const pick = (row, field) => {
    if (!row) return null;
    return isArabic ? row[`${field}_ar`] : row[`${field}_en`];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: seo } = await supabase
          .from('seo')
          .select('*')
          .eq('slug', 'support/contact')
          .single();
        if (seo) setSeoData(seo);

        const { data: content } = await supabase
          .from('cms_content')
          .select('*')
          .in('section_key', ['contact_info', 'home_app_section']);

        if (content) {
          const map = {};
          content.forEach(item => { map[item.section_key] = item; });
          setCms(map);
        }
      } catch (err) {
        console.error('Error fetching Contact data:', err);
      }
    };

    fetchData();
  }, [lang]);

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
    <div className={`contact-page ${isArabic ? 'rtl-text' : ''}`}>
   
      <SEO 
        title={seoData ? pick(seoData, 'title') : (isArabic ? 'اتصل بنا' : 'Contact Us')}
        description={seoData ? pick(seoData, 'description') : (isArabic ? 'تواصل معنا لأي استفسار' : 'Get in touch')}
        slug={seoData ? seoData.slug : "support/contact"}
      />
      
      <section className="contact-hero scroll-animate stag-1">
        <h1>
          {cms['contact_info'] ? pick(cms['contact_info'], 'title') : (isArabic ? 'تواصل معنا' : 'Get in Touch')}
        </h1>
        <p dangerouslySetInnerHTML={{ __html: cms['contact_info'] ? pick(cms['contact_info'], 'subtitle') : (isArabic ? 'هل لديك أسئلة؟' : 'Have questions?') }} />
      </section>

      <div className="contact-main-wrapper">
        <ContactSection />
      </div>

      <section className="questions-cta-section scroll-animate stag-2">
        <div className="q-icon">
          <HelpCircle size={32} />
        </div>
        <h2>{isArabic ? 'لا تزال لديك أسئلة؟' : 'Still have questions?'}</h2>
        <p>{isArabic ? 'تحقق من قسم الأسئلة الشائعة للحصول على معلومات مفصلة.' : 'Check out our comprehensive FAQ section.'}</p>
        <button className="btn-cta" onClick={() => window.location.href = '/support/faqs'}>
          {isArabic ? 'عرض الأسئلة الشائعة' : 'View FAQs'}
        </button>
      </section>

      <section className="newsletter-section scroll-animate stag-3">
        <h2>{isArabic ? 'ابق على اطلاع' : 'Stay Updated'}</h2>
        <p>{isArabic ? 'اشترك في نشرتنا الإخبارية للحصول على أحدث نصائح الأمان.' : 'Subscribe for the latest safety tips.'}</p>
        <div className="newsletter-form">
          <input type="email" placeholder={isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email'} />
          <button className="btn-sub">{isArabic ? 'اشترك' : 'Subscribe'}</button>
        </div>
      </section>

      <AppPromoSection
        imageSrc={mobileVisuals}
        customTitle={cms['home_app_section'] ? pick(cms['home_app_section'], 'title') : (isArabic ? 'ثبت التطبيق ' : 'Install the App ')}
        customFocus={isArabic ? 'الآن!' : 'Now!'}
        customDesc={cms['home_app_section'] ? pick(cms['home_app_section'], 'subtitle') : (isArabic ? 'تحكم بشكل كامل في سلامتك.' : 'Take full control of your safety.')}
      />

    </div>
  );
}

export default Contact;