import React from 'react';
import './Compare.css';
import CompareCard from '../../components/Cards/CompareCard';

function Compare() {

  const novaFeatures = [
    { label: "Interface", value: "Smart Touchscreen", valueIcon: "📱" },
    { label: "Emergency Activation", value: "Touchscreen emergency interface" },
    { label: "Medical Info Access", value: "Instant QR medical access" },
    { label: "Privacy & Security", value: "Privacy-first protection system" },
    { label: "Alert Feedback", value: "Real-time alert animation" },
    { label: "Design Style", value: "Modern, interactive" },
    { label: "Best For", value: "Tech-savvy users" },
  ];

  
  const pulseFeatures = [
    { label: "Interface", value: "Tactical Button", valueIcon: "🔘" },
    { label: "Emergency Activation", value: "One-press SOS activation" },
    { label: "Medical Info Access", value: "Instant QR medical access" },
    { label: "Privacy & Security", value: "Same protection core system" },
    { label: "Alert Feedback", value: "Simple & reliable alert design" },
    { label: "Design Style", value: "Minimalist, Tactical" },
    { label: "Best For", value: "Users who prefer quick activation" },
  ];

  return (
    <div className="compare-page">
  
      <div className="compare-hero">
        <h1 className="compare-title">
          Choose Your <span className="compare-highlight">Safety</span> Companion
        </h1>
        <p className="compare-subtitle">
          Compare the Nova Touchscreen Bracelet and Pulse Tactical Button Bracelet<br />
          to find the perfect fit for your lifestyle.
        </p>
      </div>

      <div className="compare-page-container">
        <CompareCard 
          title="Nova"
          subTitle="Touchscreen Bracelet"
          icon="📱"
          features={novaFeatures}
          price="1,499"
          buttonText="Shop Nova"
          accentColor="#0097b2" 
        />

        <CompareCard 
          title="Pulse"
          subTitle="Tactical Button Bracelet"
          icon="🔘"
          features={pulseFeatures}
          price="1,199"
          buttonText="Shop Pulse"
          accentColor="#00c853" 
        />
      </div>
    </div>
  );
}

export default Compare;
