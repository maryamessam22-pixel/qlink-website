import React from 'react';

function CompareCard({ headerIcon: HeaderIcon, headerText, box1Title, box1Text, box2Title, box2Text, box2HighlightColor, box1Icon: Box1Icon, box2Icon: Box2Icon }) {
  return (
    <div className="compare-card scroll-animate">
      <div className="compare-header">
        {HeaderIcon && <HeaderIcon size={28} color="#b0b8c8" />}
        {headerText}
      </div>
      <div className="compare-box">
        <h5>
          {Box1Icon && <Box1Icon size={18} color="#10B981" style={{ marginRight: '6px' }} />}
          {box1Title}
        </h5>
        <p>{box1Text}</p>
      </div>
      <div className="compare-box" style={box2HighlightColor ? { borderLeft: `2px solid ${box2HighlightColor}` } : {}}>
        <h5 style={box2HighlightColor ? { color: box2HighlightColor } : {}}>
          {Box2Icon && <Box2Icon size={18} color="#10B981" style={{ marginRight: '6px' }} />}
          {box2Title}
        </h5>
        <p>{box2Text}</p>
      </div>
    </div>
  );
}

export default CompareCard;
