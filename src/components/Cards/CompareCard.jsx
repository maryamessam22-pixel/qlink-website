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
    
      <div className="card-top-section">
        {icon && <img src={icon} alt={title} className="card-custom-icon" />}
        
        <h2 className="card-main-title">{title}</h2>
        <p className="card-sub-title" style={{ color: accentColor }}>{subTitle}</p>

        <div className="features-list-wrapper">
          {features.map((item, index) => (
            <div key={index} className="feature-row">
              <span className="feature-label-text">{item.label}</span>
              <div className="feature-value-container">
                {item.valueIcon && (
                  <span className="value-icon">
                    <img src={item.valueIcon} alt="" className="feature-inline-icon" />
                  </span>
                )}
                <p className="feature-value-text">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <div className="card-bottom-section">
        <div className="price-display">
          <span className="currency-label">EGP</span>
          <span className="price-amount">{price}</span>
        </div>
        <Link 
          to={to}
          className="action-button" 
          style={{ backgroundColor: accentColor, textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default CompareCard;