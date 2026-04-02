import React, { useEffect, useState, useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';
import { 
  Book, 
  Wrench, 
  CreditCard,
  ChevronDown,
  Users,
  Send,
  CheckCircle2,
  Apple,
  Play
} from 'lucide-react';
import './HelpCenter.css';
import DynamicBackground from '../../components/common/DynamicBackground';
import appScreenImg from '../../assets/images/appscreen.png';

function HelpCenter() {
  const { lang, t } = useContext(LanguageContext);
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    { question: 'How does the emergency contact get notified?', answer: 'Your emergency contacts will receive an SMS and email with your location and a link to your medical profile once the QR code is scanned.' },
    { question: 'Is my medical data public?', answer: 'Only the information you choose to make public is visible on a scan. Sensitive data requires your secure PIN to unlock.' },
    { question: 'How often do I need to charge it?', answer: 'The Nova bracelet battery lasts up to 7 days on a single charge. The Pulse tactical model lasts up to 6 months.' },
    { question: 'Is it waterproof?', answer: 'Yes, all Qlink devices are IP68 waterproof rated, meaning you can shower, swim, and be active without taking them off.' }
  ];

  useEffect(() => {
    // Reusing the same IntersectionObserver logic from Home
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.15, rootMargin: '-50px' });

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="help-center-wrapper">
      <DynamicBackground />
      
      <div className={`help-center-content ${lang === 'ar' ? 'rtl-text' : ''}`}>
        
        {/* HEADER SECTION */}
        <section className="support-header-section scroll-animate stag-1">
          <h1 className="support-title">
            Support <span className="red-text">Center</span>
          </h1>
          <p className="support-subtitle">
            We're here to help. Find answers, contact our team, or check system status
          </p>
        </section>

        {/* SUPPORT CARDS */}
        <section className="support-cards-section scroll-animate stag-2">
          <div className="card-grid-3">
            <div className="support-card glass-panel">
              <div className="icon-wrap icon-wrap-glass" style={{ color: '#b0b8c8' }}>
                <Book size={24} />
              </div>
              <h3>Getting Started</h3>
              <p>Setup guides and tutorials</p>
            </div>
            
            <div className="support-card glass-panel card-active-glow">
              <div className="icon-wrap icon-wrap-red" style={{ color: '#E03232' }}>
                <Wrench size={24} />
              </div>
              <h3>Troubleshooting</h3>
              <p>Fix common technical issues</p>
            </div>

            <div className="support-card glass-panel">
              <div className="icon-wrap icon-wrap-glass" style={{ color: '#0d6efd' }}>
                <CreditCard size={24} />
              </div>
              <h3>Account & Billing</h3>
              <p>Manage your subscription</p>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="faq-section scroll-animate stag-3">
          <div className="faq-header">
            <h2>Frequently Asked Questions</h2>
            <span className="faq-badge red-text">FAQ</span>
          </div>
          
          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`faq-item glass-panel ${activeFaq === idx ? 'active' : ''}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className="faq-question">
                  <h4>{faq.question}</h4>
                  <ChevronDown 
                    size={20} 
                    className={`faq-icon ${activeFaq === idx ? 'rotate' : ''}`} 
                  />
                </div>
                <div className={`faq-answer ${activeFaq === idx ? 'open' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="faq-more">
            <button className="btn btn-primary">More questions?</button>
          </div>
        </section>

        {/* JOIN THE COMMUNITY */}
        <section className="community-section scroll-animate stag-1">
          <div className="community-icon icon-wrap icon-wrap-glass" style={{ color: 'var(--color-success)' }}>
            <Users size={32} />
          </div>
          <h2>Join The Community</h2>
          <p>
            Connect with other Qlink users, share stories, and get tips on how to maximize your safety setup.
          </p>
        </section>

        {/* CONTACT US SECTION */}
        <section className="contact-section scroll-animate stag-2 glass-panel">
          <div className="contact-info">
            <h2>Contact Us</h2>
            <p className="contact-desc">
              Have questions not covered in our FAQs? Drop us a line. We typically respond within 2 hours.
            </p>
            <div className="contact-methods">
              <div className="contact-method">
                <div className="cm-icon">
                  <Send size={18} />
                </div>
                <span>support@qlink.com</span>
              </div>
              <div className="contact-method">
                <div className="cm-icon">
                  <Wrench size={18} />
                </div>
                <span>+20 123 456 7890</span>
              </div>
              <div className="contact-method">
                <div className="cm-icon">
                  <Book size={18} />
                </div>
                <span>Cairo, Egypt</span>
              </div>
            </div>
          </div>
          
          <div className="contact-form">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="form-group">
                <label>Subject</label>
                <select className="form-control">
                  <option>Account & Billing</option>
                  <option>Technical Support</option>
                  <option>General Inquiry</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea className="form-control" rows="4"></textarea>
              </div>
              <button type="submit" className="btn btn-primary submit-btn">
                <Send size={18} style={{ marginRight: '8px' }} />
                Send Message
              </button>
            </form>
          </div>
        </section>

      </div>
    </div>
  );
}

export default HelpCenter;
