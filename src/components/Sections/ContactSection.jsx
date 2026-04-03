import React, { useEffect, useState, useContext } from 'react';
import { Send, MapPin, Mail, Phone } from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import { supabase } from '../../lib/Supabase';
import './ContactSection.css';

/**
 * Functional, dynamic Contact Section.
 * Fetches contact information from Supabase cms_content table (section_key: 'contact_info').
 * Maintains 100% design fidelity with the side-by-side layout.
 */
const ContactSection = () => {
  const { lang, t } = useContext(LanguageContext);
  const [cmsData, setCmsData] = useState(null);

  // Helper to pick translated fields from Supabase row
  const pick = (field) => {
    if (!cmsData) return null;
    return lang === 'ar' ? cmsData[`${field}_ar`] : cmsData[`${field}_en`];
  };

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const { data, error } = await supabase
          .from('cms_content')
          .select('*')
          .eq('section_key', 'contact_info')
          .single();

        if (error) {
          console.error('Supabase fetch error:', error);
          return;
        }

        if (data) setCmsData(data);
      } catch (err) {
        console.error('Unexpected error fetching contact info:', err);
      }
    };

    fetchContactData();
  }, [lang]);

  // Dynamic Content + Fallbacks
  const title    = pick('title')    || t('supportCenter.contactTitle');
  const subtitle = pick('subtitle') || t('supportCenter.contactDesc');
  const extra    = cmsData?.extra_data || {};
  const email    = extra.email   || 'support@qlink.com';
  const phone    = extra.phone   || '+20 123 456 7890';
  const address  = extra.address || 'Cairo, Egypt';

  return (
    <section className={`contact-wrapper scroll-animate stag-2 ${lang === 'ar' ? 'rtl-text' : ''}`}>
      <div className="contact-panel">
        <div className="contact-info-col">
          <h2>{title}</h2>
          <p>{subtitle}</p>
          <div className="contact-method-row">
            <span className="cm-icon"><Mail size={16} /></span>
            <span className="cm-text">{email}</span>
          </div>
          <div className="contact-method-row">
            <span className="cm-icon"><Phone size={16} /></span>
            <span className="cm-text" dir="ltr">{phone}</span>
          </div>
          <div className="contact-method-row">
            <span className="cm-icon"><MapPin size={16} /></span>
            <span className="cm-text">{address}</span>
          </div>
        </div>
        
        <div className="contact-form-col">
          <form className="cf-form" onSubmit={(e) => e.preventDefault()}>
            <div className="cf-row">
              <div className="cf-group">
                <label>{t('supportCenter.formName') || 'Name'}</label>
                <input className="cf-input" placeholder={lang === 'ar' ? 'الاسم الخاص بك' : 'Your name'} defaultValue="" />
              </div>
              <div className="cf-group">
                <label>{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
                <input className="cf-input" placeholder="your@email.com" defaultValue="" />
              </div>
            </div>
            <div className="cf-group">
              <label>{t('supportCenter.formSubject') || 'Subject'}</label>
              <select className="cf-input cf-select">
                <option value="">{lang === 'ar' ? 'اختر موضوعًا...' : 'Select a topic...'}</option>
                <option>{lang === 'ar' ? 'البدء' : 'Getting Started'}</option>
                <option>{lang === 'ar' ? 'استكشاف الأخطاء وإصلاحها' : 'Troubleshooting'}</option>
                <option>{lang === 'ar' ? 'الحساب والفواتير' : 'Account & Billing'}</option>
                <option>{lang === 'ar' ? 'أخرى' : 'Other'}</option>
              </select>
            </div>
            <div className="cf-group cf-textarea-group">
              <label>{t('supportCenter.formMessage') || 'Messages'}</label>
              <textarea className="cf-input cf-textarea" placeholder={lang === 'ar' ? 'كيف يمكننا المساعدة؟' : 'How can we help?'}></textarea>
            </div>
            <button className="cf-submit" type="submit">
              ✈ {t('supportCenter.formSubmit') || 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
