import React from 'react';
import qlinkLogo from '../../assets/logos/QLINK.png';
import qlinkLogoLight from '../../assets/logos/QLINK-light.png';
import { useTheme } from '../../context/ThemeContext';
import './Logo.css';

const Logo = ({ className = '', style }) => {
  const { isLight } = useTheme();
  return (
    <img
      src={isLight ? qlinkLogoLight : qlinkLogo}
      alt="Qlink Logo"
      className={`qlink-logo ${className}`.trim()}
      style={style}
    />
  );
};

export default Logo;
