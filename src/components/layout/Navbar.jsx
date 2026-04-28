import React, { useContext, useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import { AuthContext } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { enToAr } from '../../routeMap';
import Dropdown from './Dropdown';
import Logo from './Logo';
import ThemeToggleButton from '../common/ThemeToggleButton';
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

  const p = (enPath) => lang === 'ar' ? (enToAr[enPath] ?? enPath) : enPath;


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
              isActive={pathname.startsWith('/how-it-works') || pathname.startsWith('/كيف-يعمل')}
              items={[
                { name: t('nav.drop.howQlink'), href: p('/how-it-works/qlink') },
                { name: t('nav.drop.emergency'), href: p('/how-it-works/emergency') },
              ]}
              onItemClick={closeMobileMenu}
            />
          </li>
          <li>
            <Dropdown
              label={t('nav.shop')}
              isActive={pathname.startsWith('/shop') || pathname.startsWith('/تسوق')}
              items={[
                { name: t('nav.drop.bracelet'), href: p('/shop/bracelet') },
                { name: t('nav.drop.compare'), href: p('/shop/compare') },
                { name: t('nav.drop.reviews'), href: p('/shop/reviews') },
              ]}
              onItemClick={closeMobileMenu}
            />
          </li>


          <li>
            <Link
              to={p('/for-caregivers')}
              className={`nav-link ${pathname.startsWith('/for-caregivers') || pathname.startsWith('/لمقدمي-الرعاية') ? 'active' : ''}`}
              onClick={(e) => handleGuardedNav(e, p('/for-caregivers'))}
            >
              {t('nav.forCaregivers')}
            </Link>
          </li>

          <li>
            <Dropdown
              label={t('nav.about')}
              isActive={pathname.startsWith('/about') || pathname.startsWith('/عن')}
              items={[
                { name: t('nav.drop.story'), href: p('/about/our-story') },
                { name: t('nav.drop.privacy'), href: p('/about/privacy') },
              ]}
              onItemClick={closeMobileMenu}
            />
          </li>
          <li>
            <Dropdown
              label={t('nav.support')}
              isActive={pathname.startsWith('/support') || pathname.startsWith('/الدعم')}
              items={[
                { name: t('nav.drop.help'), href: p('/support/help-center') },
                { name: t('nav.drop.faqs'), href: p('/support/faqs') },
                { name: t('nav.drop.contact'), href: p('/support/contact') },
                { name: t('nav.drop.download'), href: p('/support/download') },
              ]}
              onItemClick={closeMobileMenu}
            />
          </li>
        </ul>
      </div>

      <div className="navbar-actions">
        <button
          className="icon-btn cart-icon-wrapper"
          onClick={() => {
            if (isAuthenticated) navigate(p('/cart'));
            else openModalWithRoute(p('/cart'));
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
