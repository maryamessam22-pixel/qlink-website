import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import Dropdown from './Dropdown';
import Logo from './Logo';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const { pathname } = location;

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
            <Link to="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>
          </li>
          <li>
            <Dropdown
              label="How It Works"
              isActive={pathname.startsWith('/how-it-works')}
              items={[
                { name: 'How Qlink Works', href: '/how-it-works/qlink' },
                { name: 'Emergency Scenario', href: '/how-it-works/emergency' },
              ]}
            />
          </li>
          <li>
            <Dropdown
              label="Shop"
              isActive={pathname.startsWith('/shop')}
              items={[
                { name: 'The Bracelet', href: '/shop/bracelet' },
                { name: 'Compare', href: '/shop/compare' },
                { name: 'Reviews', href: '/shop/reviews' },
              ]}
            />
          </li>
          <li>
            <Link to="/for-caregivers" className={`nav-link ${pathname.startsWith('/for-caregivers') ? 'active' : ''}`}>For Caregivers</Link>
          </li>
          <li>
            <Dropdown
              label="About"
              isActive={pathname.startsWith('/about')}
              items={[
                { name: 'Our Story', href: '/about/our-story' },
                { name: 'Privacy & Security', href: '/about/privacy' },
              ]}
            />
          </li>
          <li>
            <Dropdown
              label="Support"
              isActive={pathname.startsWith('/support')}
              items={[
                { name: 'Help Center', href: '/support/help-center' },
                { name: 'FAQs', href: '/support/faqs' },
                { name: 'Contact', href: '/support/contact' },
                { name: 'App Download', href: '/support/download' },
              ]}
            />
          </li>
        </ul>
      </div>

      <div className="navbar-actions">
        <button className="lang-btn">AR</button>
        <button className="icon-btn"><ShoppingCart size={22} color="#fff" /></button>
        <Link to="/auth" className="icon-btn"><User size={22} color="#fff" /></Link>
      </div>
    </nav>
  );
}


export default Navbar;
