import React from 'react';
import './CompareCard.css';

const CompareCard = ({ 
  icon, 
  title, 
  subTitle, 
  features, 
  price, 
  buttonText, 
  accentColor 
}) => {
  return (
    <div className="compare-card">
      {/* الجزء العلوي: التفاصيل */}
      <div className="card-top-section">
        <div className="icon-box" style={{ color: accentColor, borderColor: accentColor }}>
          {icon}
        </div>
        
        <h2 className="card-main-title">{title}</h2>
        <p className="card-sub-title" style={{ color: accentColor }}>{subTitle}</p>

        <div className="features-list-wrapper">
          {features.map((item, index) => (
            <div key={index} className="feature-row">
              <span className="feature-label-text">{item.label}</span>
              <div className="feature-value-container">
                {item.valueIcon && <span className="value-icon">{item.valueIcon}</span>}
                <p className="feature-value-text">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* الجزء السفلي: السعر والزرار */}
      <div className="card-bottom-section">
        <div className="price-display">
          <span className="currency-label">EGP</span>
          <span className="price-amount">{price}</span>
        </div>
        <button 
          className="action-button" 
          style={{ backgroundColor: accentColor }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default CompareCard;