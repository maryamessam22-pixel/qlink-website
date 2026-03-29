import React, { useState } from 'react';
import './EmergencyScenario.css';

// Importing assets
import heroImg from '../../assets/images/hero-emergency.png';
import img1 from '../../assets/images/1img.png';
import img2 from '../../assets/images/2img.png';
import img3 from '../../assets/images/3img.png';
import w1 from '../../assets/images/w1.png';
import w2 from '../../assets/images/w2.png';
import w3 from '../../assets/images/w3.png';
import w4 from '../../assets/images/w4.png';
import w5 from '../../assets/images/w5.png';
import mobiles from '../../assets/images/2mobiles.png';

// Components
import EmergencyFeatureCard from '../../components/Cards/EmergencyFeatureCard';
import EmergencyStepCard from '../../components/Cards/EmergencyStepCard';

// Icons 
import { ArrowLeft, ArrowRight, ShieldAlert, ScanLine, FileText, BellRing, Apple, Play } from 'lucide-react';

const watchImages = [w1, w2, w3, w4, w5];

function EmergencyScenario({
  titleTop = "Every Second",
  titleBottom = "Matters",
  subtitle = "When you're out running, riding, going to the gym, or traveling, accidents happen. You shouldn't have to leave without access to your vital medical data when it counts the most.",
  btn1Text = "How It Works",
  btn2Text = "Get Protected Now!",
  ...props
}) {
  const [currentWatch, setCurrentWatch] = useState(0);

  const handleNextWatch = () => {
    setCurrentWatch((prev) => (prev + 1) % watchImages.length);
  };

  const handlePrevWatch = () => {
    setCurrentWatch((prev) => (prev === 0 ? watchImages.length - 1 : prev - 1));
  };

  return (
    <div className="es-page">
      {/* HERO */}
      <section className="es-hero" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="es-hero-overlay"></div>
        <div className="es-hero-content">
          <div className="es-badge">
            <ShieldAlert size={16} color="#E03232" /> <span style={{color: '#E03232', fontWeight: 600, fontSize: '12px'}}>CRITICAL RESPONSE SYSTEM</span>
          </div>
          <h1 className="es-hero-title">{titleTop}<br/><span className="red-text">{titleBottom}</span></h1>
          <p className="es-hero-subtitle">
            {subtitle}
          </p>
          <div className="es-hero-buttons">
            <button className="btn btn-secondary">{btn1Text}</button>
            <button className="btn btn-primary">{btn2Text}</button>
          </div>
        </div>
      </section>

      {/* THREE FEATURE ROWS */}
      <section className="es-features">
        <EmergencyFeatureCard
          subtitle="NO ID. NO PHONE. NO WALLET."
          title="Sudden Collapse"
          desc="You are out for your morning run when you collapse. Bystanders try to help, but no one knows you. The paramedics arrive and don't know your medical history or who to contact. You have no phone or ID on you."
          img={img1}
        />
        <EmergencyFeatureCard
          subtitle="PARAMEDICS SCANS THE BRACELET"
          title="Instant Identification"
          desc="A paramedic arriving on the scene sees the Qlink bracelet. They scan the code on your bracelet using their smartphone, safely revealing your profile without an app."
          img={img2}
          reverse={true}
        />
        <EmergencyFeatureCard
          subtitle="PARAMEDICS READ VITAL DATA"
          title="Life-Saving Information"
          desc="A single glance reveals your critical profile: Blood type, allergies, medications, and emergency contacts. The treatment protocol changes quickly in line with medical protocol."
          img={img3}
        />
      </section>

      {/* MARQUEE */}
      <div className="es-marquee-container">
        <div className="es-marquee">
          <span>Qlink. Always Connected. Always Protected.</span>
          <span>&bull;</span>
          <span>Qlink. Always Connected. Always Protected.</span>
          <span>&bull;</span>
          <span>Qlink. Always Connected. Always Protected.</span>
          <span>&bull;</span>
          <span>Qlink. Always Connected. Always Protected.</span>
        </div>
      </div>

      {/* 3 STEPS CARDS */}
      
      <section className="es-steps-section">
        <EmergencyStepCard
          IconComponent={ScanLine}
          iconWrapClass="es-icon-blue"
          iconColor="#38bdf8"
          title="1. Scan"
          desc="First responders scan the QR code on your Qlink bracelet in any mobile or phone camera."
        />
        <EmergencyStepCard
          IconComponent={FileText}
          iconWrapClass="es-icon-gray"
          iconColor="#94A3B8"
          title="2. Access"
          desc="Your secure medical profile is instantly displayed on their screen alongside medical contacts."
        />
        <EmergencyStepCard
          IconComponent={BellRing}
          iconWrapClass="es-icon-red"
          iconColor="#E03232"
          title="3. Notify"
          desc="Your emergency contacts are automatically notified with your exact GPS location."
        />
      </section>

      {/* WATCH CAROUSEL */}
      <section className="es-carousel-section">
        <div className="es-carousel-inner">
          <button className="es-arrow-btn" onClick={handlePrevWatch} aria-label="Previous Watch">
            <ArrowLeft size={24} />
          </button>
          <div className="es-watch-display">
            <img src={watchImages[currentWatch]} alt="Qlink Watch Component" />
          </div>
          <button className="es-arrow-btn" onClick={handleNextWatch} aria-label="Next Watch">
            <ArrowRight size={24} />
          </button>
        </div>
      </section>

      {/* CTA PREPARED */}
      <section className="es-cta-box-section">
        <div className="es-cta-box">
          <div className="es-cta-icon">
             <ShieldAlert size={36} color="#38bdf8" />
          </div>
          <h2>Be Prepared<br/>Before It Happens!</h2>
          <p>Emergencies rarely give warnings. Yet, only 1 in 10 adults carry emergency info. Empower yourself, protect those you love.</p>
          <button className="btn btn-primary">Shop Qlink Now <ArrowRight size={16}/></button>
        </div>
      </section>

      {/* GET PROTECTED FOOTER CALL */}
      <section className="es-footer-promo">
        <div className="es-promo-content">
          <h2>Get Protected <span className="red-text">Today!</span></h2>
          <p>Download the Qlink app and experience the future of personal safety.</p>
          <div className="es-app-buttons">
            <button className="app-btn">
               <Apple size={24} />
               <div className="btn-text"><span>Download on the</span><strong>App Store</strong></div>
            </button>
            <button className="app-btn" style={{background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)'}}>
               <Play size={24} />
               <div className="btn-text"><span>Get it on</span><strong>Google Play</strong></div>
            </button>
          </div>
        </div>
        <div className="es-promo-img">
          <img src={mobiles} alt="Qlink Mobile Apps" />
        </div>
      </section>

    </div>
  );
}

export default EmergencyScenario;
