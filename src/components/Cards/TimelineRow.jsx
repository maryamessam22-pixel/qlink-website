import React from 'react';

function TimelineRow({ title, description, icon: Icon, isRight }) {
  return (
    <div className="timeline-row scroll-animate">
      {!isRight ? (
        <div className="timeline-card timeline-card-left">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      ) : null}

      <div className="timeline-marker">
        <div className="timeline-marker-inner">
          {Icon && <Icon size={20} />}
        </div>
      </div>

      {isRight ? (
        <div className="timeline-card timeline-card-right">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      ) : null}
    </div>
  );
  
}

export default TimelineRow;
