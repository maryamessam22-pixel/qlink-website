import React from 'react';

function WhyCard({ icon: Icon, title, description }) {
  return (
    <div className="why-card scroll-animate">
      <div className="icon-wrap">
        {Icon && <Icon size={20} />}
      </div>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
}

export default WhyCard;
