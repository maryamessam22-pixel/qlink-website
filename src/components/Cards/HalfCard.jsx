import React from 'react';

function HalfCard({ title, description }) {
  return (
    <div className="half-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
  
}


export default HalfCard;
