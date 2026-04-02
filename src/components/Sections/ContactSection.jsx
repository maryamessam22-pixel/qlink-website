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
    <section className={`scroll-animate stag-2 ${lang === 'ar' ? 'rtl-text' : ''}`} style={{ padding: '64px 48px' }}>
      <section style={{ background: 'linear-gradient(135deg, rgb(22, 31, 53) 0%, rgba(15, 22, 37, 0.95) 100%)', border: '1px solid rgba(59, 130, 246, 0.18)', borderRadius: '16px', padding: '40px', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '48px', maxWidth: '900px', margin: '0px auto' }}>
        <div>
          <h2 style={{ fontFamily: 'Roboto, sans-serif', fontSize: '1.6rem', fontWeight: 800, color: 'rgb(221, 238, 255)', marginBottom: '12px' }}>
            {title}
          </h2>
          <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '0.85rem', color: 'rgb(107, 130, 170)', lineHeight: '1.7', marginBottom: '28px' }}>
            {subtitle}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <span style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(232, 69, 60, 0.12)', border: '1px solid rgba(232, 69, 60, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', flexShrink: 0 }}>📧</span>
            <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '0.85rem', color: 'rgb(107, 130, 170)' }}>{email}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <span style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(232, 69, 60, 0.12)', border: '1px solid rgba(232, 69, 60, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', flexShrink: 0 }}>📞</span>
            <span dir="ltr" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '0.85rem', color: 'rgb(107, 130, 170)' }}>{phone}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <span style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(232, 69, 60, 0.12)', border: '1px solid rgba(232, 69, 60, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', flexShrink: 0 }}>📍</span>
            <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '0.85rem', color: 'rgb(107, 130, 170)' }}>{address}</span>
          </div>
        </div>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div>
              <label style={{ fontFamily: 'Roboto, sans-serif', fontSize: '0.78rem', color: 'rgb(107, 130, 170)', display: 'block', marginBottom: '6px' }}>{t('supportCenter.formName') || 'Name'}</label>
              <input placeholder={lang === 'ar' ? 'الاسم الخاص بك' : 'Your name'} defaultValue="" style={{ width: '100%', padding: '10px 14px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(59, 130, 246, 0.18)', borderRadius: '8px', color: 'rgb(221, 238, 255)', fontFamily: 'Roboto, sans-serif', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontFamily: 'Roboto, sans-serif', fontSize: '0.78rem', color: 'rgb(107, 130, 170)', display: 'block', marginBottom: '6px' }}>{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
              <input placeholder="your@email.com" defaultValue="" style={{ width: '100%', padding: '10px 14px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(59, 130, 246, 0.18)', borderRadius: '8px', color: 'rgb(221, 238, 255)', fontFamily: 'Roboto, sans-serif', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontFamily: 'Roboto, sans-serif', fontSize: '0.78rem', color: 'rgb(107, 130, 170)', display: 'block', marginBottom: '6px' }}>{t('supportCenter.formSubject') || 'Subject'}</label>
            <select style={{ width: '100%', padding: '10px 14px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(59, 130, 246, 0.18)', borderRadius: '8px', color: 'rgb(221, 238, 255)', fontFamily: 'Roboto, sans-serif', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box', appearance: 'none' }}>
              <option value="">{lang === 'ar' ? 'اختر موضوعًا...' : 'Select a topic...'}</option>
              <option>{lang === 'ar' ? 'البدء' : 'Getting Started'}</option>
              <option>{lang === 'ar' ? 'استكشاف الأخطاء وإصلاحها' : 'Troubleshooting'}</option>
              <option>{lang === 'ar' ? 'الحساب والفواتير' : 'Account & Billing'}</option>
              <option>{lang === 'ar' ? 'أخرى' : 'Other'}</option>
            </select>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontFamily: 'Roboto, sans-serif', fontSize: '0.78rem', color: 'rgb(107, 130, 170)', display: 'block', marginBottom: '6px' }}>{t('supportCenter.formMessage') || 'Messages'}</label>
            <textarea placeholder={lang === 'ar' ? 'كيف يمكننا المساعدة؟' : 'How can we help?'} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(59, 130, 246, 0.18)', borderRadius: '8px', color: 'rgb(221, 238, 255)', fontFamily: 'Roboto, sans-serif', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box', height: '100px', resize: 'vertical' }}></textarea>
          </div>
          <button style={{ width: '100%', padding: '13px', border: 'none', borderRadius: '10px', background: 'rgb(232, 69, 60)', color: 'rgb(255, 255, 255)', fontFamily: 'Roboto, sans-serif', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', transition: '0.3s' }}>
            ✈ {t('supportCenter.formSubmit') || 'Send Message'}
          </button>
        </div>
      </section>
    </section>
  );
};

export default ContactSection;
