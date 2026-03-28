import React from 'react';

function HelpCard({ icon: Icon, iconColor, title, description, href = "#" }) {
  return (
    <a href={href} className="help-card">
      <div className="help-icon">
        {Icon && <Icon size={20} color={iconColor} />}
      </div>
      <div className="help-text">
        <h5>{title}</h5>
        <p>{description}</p>
      </div>
    </a>
  );
}

export default HelpCard;
