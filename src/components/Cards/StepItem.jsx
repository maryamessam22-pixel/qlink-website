import React from 'react';

function StepItem({ icon: Icon, iconColor, title, description }) {
  return (
    <div className="step-item scroll-animate">
      <div className="step-icon">
        {Icon && <Icon size={28} color={iconColor} />}
      </div>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
  
}

export default StepItem;
