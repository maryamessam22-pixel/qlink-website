import React from 'react';
import './CompareCard.css';

const CompareCard = ({ title, price, feature1, feature2, buttonText }) => {
  return (
    <div className="compare-card">
      <h3>{title}</h3>
      <div className="price">${price}</div>
      <ul>
        <li>{feature1}</li>
        <li>{feature2}</li>
      </ul>
      <button>{buttonText}</button>
    </div>
  );
};

export default CompareCard;