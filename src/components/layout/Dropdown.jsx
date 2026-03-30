import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function Dropdown({ label, items, isActive }) {
  const location = useLocation();
  const { pathname } = location;

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
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}


export default Dropdown;
