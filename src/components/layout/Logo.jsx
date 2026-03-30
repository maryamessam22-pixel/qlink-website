import React from 'react';
import qlinkLogo from '../../assets/logos/QLINK.png';
import './Logo.css';

const Logo = ({ className = '', style }) => (
  <img 
    src={qlinkLogo} 
    alt="Qlink Logo" 
    className={`qlink-logo ${className}`.trim()} 
    style={style} 
  />
);

export default Logo;
