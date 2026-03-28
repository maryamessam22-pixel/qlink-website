import React from 'react';

function FeatureBlock({ title, description }) {
  return (
    <div className="feature-block scroll-animate active">
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );

  
}

export default FeatureBlock;
