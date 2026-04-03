import React, { useContext } from 'react';
import SEO from '../../components/common/SEO';
import { LanguageContext } from '../../context/LanguageContext';
import DynamicBackground from '../../components/common/DynamicBackground';
import ContactSection from '../../components/Sections/ContactSection';
import './HelpCenter.css'; // Reusing HelpCenter/ContactSection styles

function Contact() {
  const { lang, t } = useContext(LanguageContext);

  return (
    <div className="help-center-page">
      <SEO 
        title={lang === 'ar' ? 'اتصل بنا' : 'Contact Us'}
        description="Get in touch with the Qlink team for any inquiries or support."
        slug="support/contact"
      />
      <DynamicBackground />
      <div style={{ paddingTop: '100px' }}>
        <ContactSection />
      </div>
    </div>
  );
}

export default Contact;
