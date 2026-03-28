import React from 'react';

function InfoCard({ icon: Icon, iconColor, iconBgColor, title, description, style, iconWrapperStyle, iconSize = 32 }) {
  return (
    <div className="info-card scroll-animate" style={style}>
      <div className="icon-wrap" style={{ color: iconColor, background: iconBgColor, ...iconWrapperStyle }}>
        {Icon && <Icon size={iconSize} />}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default InfoCard;
