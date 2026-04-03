import React, { useContext } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Dropdown({ label, items, isActive, onItemClick }) {
  const location = useLocation();
  const navigate  = useNavigate();
  const { pathname } = location;
  const { isAuthenticated, requireAuth } = useContext(AuthContext);

  const handleItemClick = (e, href) => {
    e.preventDefault();
    if (requireAuth()) {
      onItemClick && onItemClick();
      navigate(href);
    }
  };

  return (
    <div className="dropdown">
      <button className={`dropbtn ${isActive ? 'active' : ''}`}>
        {label} <ChevronDown size={16} className="dropdown-chevron" />
      </button>
      <div className="dropdown-content">
        {items.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className={pathname === item.href ? 'submenu-active' : ''}
            onClick={(e) => handleItemClick(e, item.href)}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dropdown;
