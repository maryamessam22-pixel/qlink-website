import React, { useContext } from 'react';
import './EmergencyFeatureCard.css';
import { LanguageContext } from '../../context/LanguageContext';

const EmergencyFeatureCard = (props) => {
  const { t } = useContext(LanguageContext);
  
  return (
    <div className={`es-feature-row ${props.reverse ? 'reverse' : ''}`}>
      <div className="es-feature-text scroll-animate">
        <div className="es-f-subtitle">{props.subtitle}</div>
        <h2 className="es-f-title">{props.title}</h2>
        <p className="es-f-desc">{props.desc}</p>
        <button className="es-f-btn">{t('emergency.fBtn')}</button>
      </div>
      <div className="es-feature-img scroll-animate">
        <img src={props.img} alt={props.title} />
      </div>
    </div>
  );
};

export default EmergencyFeatureCard;
