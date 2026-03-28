import React from 'react';
import { ChevronDown } from 'lucide-react';

function Dropdown({ label, items }) {
  return (
    <div className="dropdown">
      <button className="dropbtn">
        {label} <ChevronDown size={16} className="dropdown-chevron" />
      </button>
      <div className="dropdown-content">
        {items.map((item, index) => (
          <a key={index} href={item.href}>
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
  
}
export default Dropdown;
