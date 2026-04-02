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
    <section className={`contact-section scroll-animate stag-2 glass-panel ${lang === 'ar' ? 'rtl-text' : ''}`}>
      
      {/* ── INFO PANEL (Left) ── */}
      <div className="contact-info">
        <h2>{title}</h2>
        <p className="contact-desc">
          {subtitle}
        </p>
        
        <div className="contact-methods">
          <div className="contact-method">
            <div className="cm-icon"><Mail size={18} /></div>
            <span>{email}</span>
          </div>
          
          <div className="contact-method">
            <div className="cm-icon"><Phone size={18} /></div>
            <span dir="ltr">{phone}</span>
          </div>
          
          <div className="contact-method">
            <div className="cm-icon"><MapPin size={18} /></div>
            <span>{address}</span>
          </div>
        </div>
      </div>

      {/* ── FORM PANEL (Right) ── */}
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
              {t('supportCenter.formOptions').map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>{t('supportCenter.formMessage')}</label>
            <textarea className="form-control" rows="5"></textarea>
          </div>
          
          <button type="submit" className="submit-btn" id="contact-submit-bt">
            <Send size={18} />
            {t('supportCenter.formSubmit')}
          </button>
        </form>
      </div>

    </section>
  );
};

export default ContactSection;
