import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Qlink</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Dropdown
            label="How It Works"
            items={[
              { name: 'How Qlink Works', href: '/how-it-works/qlink' },
              { name: 'Emergency Scenario', href: '/how-it-works/emergency' },
            ]}
          />
        </li>
        <li>
          <Dropdown
            label="Shop"
            items={[
              { name: 'The Bracelet', href: '/shop/bracelet' },
              { name: 'Compare', href: '/shop/compare' },
              { name: 'Reviews', href: '/shop/reviews' },
            ]}
          />
        </li>
        <li>
          <Link to="/for-caregivers">For Caregivers</Link>
        </li>
        <li>
          <Dropdown
            label="About"
            items={[
              { name: 'Our Story', href: '/about/our-story' },
              { name: 'Privacy & Security', href: '/about/privacy' },
            ]}
          />
        </li>
        <li>
          <Dropdown
            label="Support"
            items={[
              { name: 'Help Center', href: '/support/help-center' },
              { name: 'FAQs', href: '/support/faqs' },
              { name: 'Contact', href: '/support/contact' },
              { name: 'App Download', href: '/support/download' },
            ]}
          />
        </li>
        <li>
          <Link to="/auth" style={{
            background: '#101726',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '6px',
            fontWeight: 'bold',
            marginLeft: '10px'
          }}>Sign In</Link>
        </li>
      </ul>
    </nav>
  );
}


export default Navbar;
