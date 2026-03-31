import React from 'react';
import './PricingCard.css';

function PricingCard({ headerIcon: HeaderIcon, headerText, box1Title, box1Text, box2Title, box2Text, box2HighlightColor, box1Icon: Box1Icon, box2Icon: Box2Icon }) {
  return (
    <div className="pricing-card scroll-animate">
      <div className="pricing-header">
        {HeaderIcon && <HeaderIcon size={28} color="var(--text-muted)" />}
        {headerText}
      </div>
      <div className="pricing-box">
        <h5>
          {Box1Icon && <Box1Icon size={18} color="var(--color-success)" style={{ marginRight: '6px' }} />}
          {box1Title}
        </h5>
        <p>{box1Text}</p>
        
      </div>
      <div className="pricing-box" style={box2HighlightColor ? { borderLeft: `2px solid ${box2HighlightColor}` } : {}}>
        <h5 style={box2HighlightColor ? { color: box2HighlightColor } : {}}>
          {Box2Icon && <Box2Icon size={18} color="var(--color-success)" style={{ marginRight: '6px' }} />}
          {box2Title}
        </h5>
        <p>{box2Text}</p>
      </div>
    </div>
  );
}

export default PricingCard;
