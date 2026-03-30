import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';
import Dropdown from './Dropdown';
import Logo from './Logo';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const { pathname } = location;
  const { lang, toggleLanguage, t } = useContext(LanguageContext);

  return (
    <nav className="navbar-wrapper">
      <div className="navbar-brand">
        <Link to="/">
          <Logo style={{ height: '35px', display: 'block' }} />
        </Link>
      </div>

      <div className="navbar-pill">
        <ul className="navbar-links">
          <li>
            <Link to="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>{t('nav.home')}</Link>
          </li>
          <li>
            <Dropdown
              label={t('nav.howItWorks')}
              isActive={pathname.startsWith('/how-it-works')}
              items={[
                { name: t('nav.drop.howQlink'), href: '/how-it-works/qlink' },
                { name: t('nav.drop.emergency'), href: '/how-it-works/emergency' },
              ]}
            />
          </li>
          <li>
            <Dropdown
              label={t('nav.shop')}
              isActive={pathname.startsWith('/shop')}
              items={[
                { name: t('nav.drop.bracelet'), href: '/shop/bracelet' },
                { name: t('nav.drop.compare'), href: '/shop/compare' },
                { name: t('nav.drop.reviews'), href: '/shop/reviews' },
              ]}
            />
          </li>
          <li>
            <Link to="/for-caregivers" className={`nav-link ${pathname.startsWith('/for-caregivers') ? 'active' : ''}`}>{t('nav.forCaregivers')}</Link>
          </li>
          <li>
            <Dropdown
              label={t('nav.about')}
              isActive={pathname.startsWith('/about')}
              items={[
                { name: t('nav.drop.story'), href: '/about/our-story' },
                { name: t('nav.drop.privacy'), href: '/about/privacy' },
              ]}
            />
          </li>
          <li>
            <Dropdown
              label={t('nav.support')}
              isActive={pathname.startsWith('/support')}
              items={[
                { name: t('nav.drop.help'), href: '/support/help-center' },
                { name: t('nav.drop.faqs'), href: '/support/faqs' },
                { name: t('nav.drop.contact'), href: '/support/contact' },
                { name: t('nav.drop.download'), href: '/support/download' },
              ]}
            />
          </li>
        </ul>
      </div>

      <div className="navbar-actions">
        <button className="lang-btn" onClick={toggleLanguage}>{lang === 'en' ? 'AR' : 'EN'}</button>
        <button className="icon-btn"><ShoppingCart size={22} color="var(--text-primary)" /></button>
        <Link to="/auth" className="icon-btn"><User size={22} color="var(--text-primary)" /></Link>
      </div>
    </nav>
  );
}



export default Navbar;
