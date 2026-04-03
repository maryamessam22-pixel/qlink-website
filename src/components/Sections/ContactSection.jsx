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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  
  const title    = pick('title')    || t('supportCenter.contactTitle');
  const subtitle = pick('subtitle') || t('supportCenter.contactDesc');
  const extra    = cmsData?.extra_data || {};
  const emailVal = extra.email   || 'support@qlink.com';
  const phone    = extra.phone   || '+20 123 456 7890';
  const address  = extra.address || 'Maadi, 223 st.';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const { error } = await supabase
        .from('support_messages')
        .insert([
          {
            id: crypto.randomUUID(), // Manually generate ID in case the table doesn't have a default
            sender_name: formData.name,
            subject: formData.subject,
            message_body: formData.message,
            status: 'Unread',
            received_at: new Date().toISOString(),
            date: new Date().toISOString().split('T')[0]
          }
        ]);

      if (error) {
        console.error('Submission error:', error);
        alert(lang === 'ar' ? `فشل إرسال الرسالة: ${error.message}` : `Failed to send message: ${error.message}`);
      } else {
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      console.error('Submission catch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`contact-wrapper scroll-animate stag-2 ${lang === 'ar' ? 'rtl-text' : ''}`}>
      <div className="contact-panel">
        <div className="contact-info-col">
          <h2>{title}</h2>
          <p>{subtitle}</p>
          <div className="contact-method-row">
            <span className="cm-icon"><Mail size={16} /></span>
            <span className="cm-text">{emailVal}</span>
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
          {success ? (
            <div className="contact-success-msg" style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ color: '#10B981', fontSize: '24px', marginBottom: '16px' }}>✓</div>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>{lang === 'ar' ? 'شكراً لتواصلك معنا!' : 'Thank You!'}</h3>
              <p style={{ color: '#94A3B8' }}>{lang === 'ar' ? 'لقد تم إرسال رسالتك بنجاح. سنرد عليك في أقرب وقت ممكن.' : 'Your message has been sent successfully. We\'ll get back to you soon.'}</p>
              <button 
                className="cf-submit" 
                style={{ marginTop: '24px', width: 'auto', padding: '10px 24px' }}
                onClick={() => setSuccess(false)}
              >
                {lang === 'ar' ? 'إرسال رسالة أخرى' : 'Send Another Message'}
              </button>
            </div>
          ) : (
            <form className="cf-form" onSubmit={handleSubmit}>
              <div className="cf-row">
                <div className="cf-group">
                  <label>{t('supportCenter.formName') || 'Name'}</label>
                  <input 
                    name="name"
                    required
                    className="cf-input" 
                    placeholder={lang === 'ar' ? 'الاسم الخاص بك' : 'Your name'} 
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="cf-group">
                  <label>{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
                  <input 
                    name="email"
                    type="email"
                    required
                    className="cf-input" 
                    placeholder="your@email.com" 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="cf-group">
                <label>{t('supportCenter.formSubject') || 'Subject'}</label>
                <select 
                  name="subject"
                  required
                  className="cf-input cf-select"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="">{lang === 'ar' ? 'اختر موضوعًا...' : 'Select a topic...'}</option>
                  <option value="Getting Started">{lang === 'ar' ? 'البدء' : 'Getting Started'}</option>
                  <option value="Troubleshooting">{lang === 'ar' ? 'استكشاف الأخطاء وإصلاحها' : 'Troubleshooting'}</option>
                  <option value="Account & Billing">{lang === 'ar' ? 'الحساب والفواتير' : 'Account & Billing'}</option>
                  <option value="Other">{lang === 'ar' ? 'أخرى' : 'Other'}</option>
                </select>
              </div>
              <div className="cf-group cf-textarea-group">
                <label>{t('supportCenter.formMessage') || 'Messages'}</label>
                <textarea 
                  name="message"
                  required
                  className="cf-input cf-textarea" 
                  placeholder={lang === 'ar' ? 'كيف يمكننا المساعدة؟' : 'How can we help?'}
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button className="cf-submit" type="submit" disabled={loading}>
                {loading ? (lang === 'ar' ? 'جاري الإرسال...' : 'Sending...') : (
                  <>✈ {t('supportCenter.formSubmit') || 'Send Message'}</>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
