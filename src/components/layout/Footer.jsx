import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import Logo from './Logo';
import './Footer.css';

const Footer = () => {
  const { t, lang } = useContext(LanguageContext);
  const isAr = lang === 'ar';

  return (
    <footer className="footer-container" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="footer-content">
        <div className="footer-brand">
          <Logo className="footer-logo" />
          <p>
            {t('footer.brandDesc')}
          </p>
          <div className="footer-socials">
         
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
       
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
        
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </div>
        </div>

        <div className="footer-links-group">
          <div className="footer-links-col">
            <h4>{t('footer.productTitle')}</h4>
            <ul>
              <li><a href="/shop/bracelet">{t('footer.productLink1')}</a></li>
              <li><a href="/how-it-works/qlink">{t('footer.productLink2')}</a></li>
              <li><a href="/">{t('footer.productLink3')}</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>{t('footer.supportTitle')}</h4>
            <ul>
              <li><a href="/support/faqs">{t('footer.supportLink1')}</a></li>
              <li><a href="/about/privacy">{t('footer.supportLink2')}</a></li>
              <li><a href="/support/contact">{t('footer.supportLink3')}</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-subscribe">
          <h4>{t('footer.subscribeTitle')}</h4>
          <div className="subscribe-form">
            <input type="email" placeholder={t('footer.subscribePlaceholder')} />
            <button type="button">{t('footer.subscribeBtn')}</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        {t('footer.copyright')}
      </div>
    </footer>
  );
};

export default Footer;
