import React, { useEffect, useState, useContext } from 'react';
import { Send, MapPin, Mail, Phone } from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import { supabase } from '../../lib/Supabase';
import './ContactSection.css';

const ContactSection = () => {
  const { lang, t } = useContext(LanguageContext);
  const [cmsData, setCmsData] = useState(null);

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
        if (error) { console.error('Supabase contact fetch error:', error); return; }
        if (data) setCmsData(data);
      } catch (err) {
        console.error('Unexpected error fetching contact info:', err);
      }
    };
    fetchContactData();
  }, [lang]);

  const title    = pick('title')    || t('supportCenter.contactTitle');
  const subtitle = pick('subtitle') || t('supportCenter.contactDesc');
  const extra    = cmsData?.extra_data || {};
  const email    = extra.email   || 'support@qlink.com';
  const phone    = extra.phone   || '+20 123 456 7890';
  const address  = extra.address || 'Cairo, Egypt';

  return (
    <section className={`cs-wrapper scroll-animate stag-2 ${lang === 'ar' ? 'rtl-text' : ''}`}>

      {/* ── LEFT PANEL ── */}
      <div className="cs-left">
        <p className="cs-badge">{lang === 'ar' ? 'تواصل معنا' : 'REACH OUT'}</p>
        <h2 className="cs-title">{title}</h2>
        <p className="cs-sub">{subtitle}</p>

        <div className="cs-cards">
          <div className="cs-card">
            <div className="cs-card-icon"><Mail size={20} /></div>
            <div>
              <span className="cs-card-label">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</span>
              <span className="cs-card-val">{email}</span>
            </div>
          </div>

          <div className="cs-card">
            <div className="cs-card-icon"><Phone size={20} /></div>
            <div>
              <span className="cs-card-label">{lang === 'ar' ? 'الهاتف' : 'Phone'}</span>
              <span className="cs-card-val" dir="ltr">{phone}</span>
            </div>
          </div>

          <div className="cs-card">
            <div className="cs-card-icon"><MapPin size={20} /></div>
            <div>
              <span className="cs-card-label">{lang === 'ar' ? 'العنوان' : 'Address'}</span>
              <span className="cs-card-val">{address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL (form) ── */}
      <div className="cs-right">
        <form className="cs-form" onSubmit={(e) => e.preventDefault()}>
          <div className="cs-form-row">
            <div className="cs-fg">
              <label>{t('supportCenter.formName')}</label>
              <input type="text" className="cs-input" placeholder={lang === 'ar' ? 'أدخل اسمك' : 'Your name'} />
            </div>
            <div className="cs-fg">
              <label>{t('supportCenter.formPhone')}</label>
              <input type="text" className="cs-input" placeholder={lang === 'ar' ? 'رقم الهاتف' : 'Phone number'} />
            </div>
          </div>

          <div className="cs-fg">
            <label>{t('supportCenter.formSubject')}</label>
            <select className="cs-input cs-select">
              <option value="">{t('supportCenter.formOptions')[0]}</option>
              <option value="">{t('supportCenter.formOptions')[1]}</option>
              <option value="">{t('supportCenter.formOptions')[2]}</option>
            </select>
          </div>

          <div className="cs-fg">
            <label>{t('supportCenter.formMessage')}</label>
            <textarea
              className="cs-input cs-textarea"
              rows="5"
              placeholder={lang === 'ar' ? 'كيف يمكننا مساعدتك؟' : 'How can we help you?'}
            />
          </div>

          <button type="submit" className="cs-submit-btn">
            <Send size={16} />
            {t('supportCenter.formSubmit')}
          </button>
        </form>
      </div>

    </section>
  );
};

export default ContactSection;
