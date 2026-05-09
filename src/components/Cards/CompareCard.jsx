import { Link } from 'react-router-dom';
import './CompareCard.css';

const CompareCard = ({ 
  icon, 
  title, 
  subTitle, 
  features, 
  price, 
  buttonText, 
  accentColor,
  to
}) => {
  return (
    <div className="compare-card">
    
      <div className="compare-card-top">
        {icon && <img src={icon} alt={title} className="compare-card-icon" />}
        
        <h2 className="compare-card-title">{title}</h2>
        <p className="compare-card-subtitle" style={{ color: accentColor }}>{subTitle}</p>

        <div className="compare-features-list">
          {features.map((item, index) => (
            <div key={index} className="compare-feature-row">
              <span className="compare-feature-label">{item.label}</span>
              <div className="compare-feature-value">
                {item.valueIcon && (
                  <span className="compare-value-icon">
                    <img src={item.valueIcon} alt="" className="compare-feature-icon" />
                  </span>
                )}
                <p className="compare-feature-text">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <div className="compare-card-bottom">
        <div className="compare-price-display">
          <span className="compare-currency-label">EGP</span>
          <span className="compare-price-amount">{price}</span>
        </div>
        <Link 
          to={to}
          className="compare-action-button"
          style={{ backgroundColor: accentColor, textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default CompareCard;
