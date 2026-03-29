import React from 'react';
import './SetupCard.css';

function SetupCard({ icon: Icon, title, description, iconBgColor, iconColor }) {
  return (
    <div className="setup-card scroll-animate">
      <div className="setup-icon" style={{ background: iconBgColor, color: iconColor }}>
        {Icon && <Icon size={24} />}
      </div>
      <h5>{title}</h5>
      <p>{description}</p>
    </div>
  );
}


export default SetupCard;
