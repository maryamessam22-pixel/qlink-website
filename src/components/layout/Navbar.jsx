import React, { useContext, useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import { AuthContext } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Dropdown from './Dropdown';
import Logo from './Logo';
import './Navbar.css';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();
  const { pathname } = location;
  const { lang, toggleLanguage, t } = useContext(LanguageContext);
  const { isAuthenticated, openModalWithRoute, logout } = useContext(AuthContext);
  const { cartCount } = useCart();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);


  const handleGuardedNav = (e, href) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate(href);
      closeMobileMenu();
    } else {
      openModalWithRoute(href);
      closeMobileMenu();
    }
  };

  const handleLogout = useCallback(() => {
    logout();
    closeMobileMenu();
    navigate('/');
  }, [logout, navigate]);

  return (
    <nav className="navbar-wrapper">
      <div className="navbar-brand">
      
        <Link to="/" onClick={closeMobileMenu}>
          <Logo style={{ height: '35px', display: 'block' }} />
        </Link>
      </div>

      <div className={`navbar-pill ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <ul className="navbar-links">
        
          <li>
            <Link
              to="/"
              onClick={closeMobileMenu}
              className={`nav-link ${pathname === '/' ? 'active' : ''}`}
            >
              {t('nav.home')}
            </Link>
          </li>

          <li>
            <Dropdown
              label={t('nav.howItWorks')}
              isActive={pathname.startsWith('/how-it-works')}
              items={[
                { name: t('nav.drop.howQlink'), href: '/how-it-works/qlink' },
                { name: t('nav.drop.emergency'), href: '/how-it-works/emergency' },
              ]}
              onItemClick={closeMobileMenu}
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
              onItemClick={closeMobileMenu}
            />
          </li>

      
          <li>
            <Link
              to="/for-caregivers"
              className={`nav-link ${pathname.startsWith('/for-caregivers') ? 'active' : ''}`}
              onClick={(e) => handleGuardedNav(e, '/for-caregivers')}
            >
              {t('nav.forCaregivers')}
            </Link>
          </li>

          <li>
            <Dropdown
              label={t('nav.about')}
              isActive={pathname.startsWith('/about')}
              items={[
                { name: t('nav.drop.story'), href: '/about/our-story' },
                { name: t('nav.drop.privacy'), href: '/about/privacy' },
              ]}
              onItemClick={closeMobileMenu}
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
              onItemClick={closeMobileMenu}
            />
          </li>
        </ul>
      </div>

      <div className="navbar-actions">
        <button className="lang-btn" onClick={toggleLanguage}>
          {lang === 'en' ? 'AR' : 'EN'}
        </button>
        <button
          className="icon-btn cart-icon-wrapper"
          onClick={() => {
            if (isAuthenticated) navigate('/cart');
            else openModalWithRoute('/cart');
          }}
        >
          <ShoppingCart size={22} color="var(--text-primary)" />
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount > 99 ? '99+' : cartCount}</span>
          )}
        </button>

      
        <Link
          to="/auth"
          className="icon-btn"
          onClick={closeMobileMenu}
        >
          <User size={22} color="var(--text-primary)" />
        </Link>

    
        {isAuthenticated && (
          <button
            id="navbar-logout-btn"
            className="logout-btn"
            onClick={handleLogout}
          >
            <LogOut size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
            {lang === 'ar' ? 'تسجيل خروج' : 'Logout'}
          </button>
        )}

        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen
            ? <X    size={28} color="var(--text-primary)" />
            : <Menu size={28} color="var(--text-primary)" />
          }
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
