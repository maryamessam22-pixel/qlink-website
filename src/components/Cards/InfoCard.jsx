import React from 'react';
import './InfoCard.css';

function InfoCard({ icon: Icon, iconColor, iconBgColor, title, description, className = '', iconWrapperClassName = '', iconSize = 32 }) {
  return (
    <div className={`info-card scroll-animate ${className}`.trim()}>
      <div className={`icon-wrap ${iconWrapperClassName}`.trim()} style={{ color: iconColor }}>
        {Icon && <Icon size={iconSize} />}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}


export default InfoCard;
