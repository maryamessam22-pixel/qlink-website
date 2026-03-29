import React from 'react';

const EmergencyFeatureCard = (props) => {
  return (
    <div className={`es-feature-row ${props.reverse ? 'reverse' : ''}`}>
      <div className="es-feature-text">
        <div className="es-f-subtitle">{props.subtitle}</div>
        <h2 className="es-f-title">{props.title}</h2>
        <p className="es-f-desc">{props.desc}</p>
      </div>
      <div className="es-feature-img">
        <img src={props.img} alt={props.title} />
      </div>
    </div>
  );
};

export default EmergencyFeatureCard;
