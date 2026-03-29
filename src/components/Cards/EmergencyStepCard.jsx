import React from 'react';

const EmergencyStepCard = (props) => {
  const IconComponent = props.IconComponent;
  return (
    <>
      <div className="es-step-card">
        <div className={`es-step-icon ${props.iconWrapClass}`}>
          {IconComponent && <IconComponent size={24} color={props.iconColor} />}
        </div>
        <h3>{props.title}</h3>
        <p>{props.desc}</p>
      </div>
    </>
  );
};


export default EmergencyStepCard;
