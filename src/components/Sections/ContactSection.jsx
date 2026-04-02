import React, { useEffect, useState, useContext } from 'react';
import { Send, MapPin, Mail, Phone } from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import { supabase } from '../../lib/Supabase';
import './ContactSection.css';

const ContactSection = () => {
  const { lang, t } = useContext(LanguageContext);
  const [cmsData, setCmsData] = useState(null);

  // Helper to pick translated fields
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
          console.error('Supabase contact fetch error:', error);
          return;
        }

        if (data) {
          setCmsData(data);
        }
      } catch (err) {
        console.error('Unexpected error fetching contact info:', err);
      }
    };

    fetchContactData();
  }, [lang]);

  // Fallbacks if DB is empty
  const title = pick('title') || t('supportCenter.contactTitle');
  const subtitle = pick('subtitle') || t('supportCenter.contactDesc');
  const extraData = cmsData?.extra_data || {};
  const email = extraData.email || 'support@qlink.com';
  const phone = extraData.phone || '+20 123 456 7890';
  const address = extraData.address || 'Cairo, Egypt';

  return (
    <section className={`contact-section scroll-animate stag-2 glass-panel ${lang === 'ar' ? 'rtl-text' : ''}`}>
      <div className="contact-info">
        <h2>{title}</h2>
        <p className="contact-desc">
          {subtitle}
        </p>
        <div className="contact-methods">
          <div className="contact-method">
            <div className="cm-icon">
              <Mail size={18} />
            </div>
            <span>{email}</span>
          </div>
          <div className="contact-method">
            <div className="cm-icon">
              <Phone size={18} />
            </div>
            <span dir="ltr">{phone}</span>
          </div>
          <div className="contact-method">
            <div className="cm-icon">
              <MapPin size={18} />
            </div>
            <span>{address}</span>
          </div>
        </div>
      </div>

      <div className="contact-form">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-row">
            <div className="form-group">
              <label>{t('supportCenter.formName')} *</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>{t('supportCenter.formPhone')}</label>
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className="form-group">
            <label>{t('supportCenter.formSubject')}</label>
            <select className="form-control">
              <option>{t('supportCenter.formOptions')[0]}</option>
              <option>{t('supportCenter.formOptions')[1]}</option>
              <option>{t('supportCenter.formOptions')[2]}</option>
            </select>
          </div>
          <div className="form-group">
            <label>{t('supportCenter.formMessage')}</label>
            <textarea className="form-control" rows="4"></textarea>
          </div>
          <button type="submit" className="btn btn-primary submit-btn">
            <Send size={18} style={{ marginRight: lang === 'ar' ? '0' : '8px', marginLeft: lang === 'ar' ? '8px' : '0' }} />
            {t('supportCenter.formSubmit')}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
