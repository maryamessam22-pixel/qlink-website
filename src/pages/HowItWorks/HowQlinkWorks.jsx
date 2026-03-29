import React, { useRef, useEffect } from 'react';
import './HowQlinkWorks.css';
import {
  ShieldCheck,
  Database,
  Shield,
  Smartphone,
  Bell,
  WifiOff,
  MonitorSmartphone,
  CheckCircle2,
  Check,
  LogIn,
  Package,
  HelpCircle,
  PhoneCall
} from 'lucide-react';

import TimelineRow from '../../components/Cards/TimelineRow';
import FeatureBlock from '../../components/Cards/FeatureBlock';
import CompareCard from '../../components/Cards/CompareCard';
import SetupCard from '../../components/Cards/SetupCard';
import HelpCard from '../../components/Cards/HelpCard';

import watchVidSrc from '../../assets/videos/watch vid.mp4';
import qlinkVideoSrc from '../../assets/videos/qlink-video.mp4';

function HowQlinkWorks() {
  const lensRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.15, rootMargin: '-50px' });

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  // Placeholder images/videos
  const centerVideoSrc = watchVidSrc;

  useEffect(() => {
    const wrapper = lensRef.current;
    if (!wrapper) return;

    let currentX = wrapper.offsetWidth / 2;
    let currentY = wrapper.offsetHeight / 2;
    let targetX = currentX;
    let targetY = currentY;
    let rafId;

    const onMouseMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    const updatePosition = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      wrapper.style.setProperty('--lens-x', `${currentX}px`);
      wrapper.style.setProperty('--lens-y', `${currentY}px`);

      rafId = requestAnimationFrame(updatePosition);
    };

    wrapper.addEventListener('mousemove', onMouseMove);
    updatePosition();

    return () => {
      wrapper.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="how-works-page">
      {/* Liquid background effect */}
      <div className="hw-liquid-bg">
        <div className="hw-glow hw-glow-1"></div>
        <div className="hw-glow hw-glow-2"></div>
        <div className="hw-glow hw-glow-3"></div>
      </div>

      {/* HERO SECTION */}
      <section className="hw-hero scroll-animate">
        <video className="hw-hero-video" src={qlinkVideoSrc} autoPlay loop muted playsInline />
        <div className="hw-hero-overlay"></div>
        <div className="hw-hero-content">
          <h1>How <span className="red-text">Qlink</span> Works</h1>
          <p>A deep dive into the technology that keeps you safe.</p>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="hw-timeline-section scroll-animate">
        <div className="timeline-container">
          <TimelineRow 
            title="1. Setup Your Profile"
            description="Download the Qlink app or scan your own bracelet, enter your medical history, emergency contacts, and insurance details."
            icon={Database}
            isRight={false}
          />
          <TimelineRow 
            title="2. Set Privacy Layers"
            description="Mask sensitive data (HIV status, mental health history) vs Public Data (Allergies, Diabetes) so vital info is hidden unless needed."
            icon={Shield}
            isRight={true}
          />
          <TimelineRow 
            title="3. Wear The Band"
            description="Put on your Qlink bracelet. It requires zero monthly charging, pairs in 3 seconds, is fully waterproof, and easily locked."
            icon={Smartphone}
            isRight={false}
          />
          <TimelineRow 
            title="4. Emergency Event"
            description="In an accident, a bystander or paramedic scans the QR code or scans it using an emergency mobile camera."
            icon={Bell}
            isRight={true}
          />
        </div>
      </section>

      {/* SPLIT FEATURES VIDEO SECTION */}
      <section className="hw-features-section scroll-animate">
        <div className="features-col">
          <FeatureBlock 
            title="Instant Emergency Identity"
            description="Qlink connects an emergency identity system that provides instant access to critical medical and contact information through a secure QR code."
          />
          <FeatureBlock 
            title="Privacy-First Technology"
            description="Qlink operates on a privacy-first system. Your data is protected, controlled, and only accessible when scanned in an emergency."
          />
        </div>


        <div className="features-video-wrapper scroll-animate" ref={lensRef}>
          {/* Layer 1: Blurred Background Pill */}
          <div className="hw-layer hw-blurred-layer">
            <video className="features-center-video" autoPlay loop muted playsInline>
              <source src={centerVideoSrc} type="video/mp4" />
            </video>
          </div>

          {/* Layer 2: Clear Lens Circle */}
          <div className="hw-layer hw-clear-layer">
            <video className="features-center-video" autoPlay loop muted playsInline>
              <source src={centerVideoSrc} type="video/mp4" />
            </video>
          </div>

          {/* Glass Lens Ring Overlay */}
          <div className="lens-ring-overlay"></div>
        </div>

        <div className="features-col">
          <FeatureBlock 
            title="Voice-Free Communication"
            description="It allows first responders or bystanders to access essential data in events where the patient is unconscious or unable to speak."
          />
          <FeatureBlock 
            title="Bridge Between Accident & Treatment"
            description="It bridges the critical gap between accident and medical response, reducing delays and enabling faster, safer intervention."
          />
        </div>
      </section>

      {/* COMPARISON CARDS */}
      <section className="hw-compare-section">
        <CompareCard 
          headerIcon={WifiOff}
          headerText="Offline vs online"
          box1Title="Online Mode"
          box1Text="A full scan instantly provides cloud-synced advanced conditions, doctors info, dynamic PDF reports and photos."
          box2Title="Offline Mode"
          box2Text="No internet required! Critical blood type and allergies are hardcoded dynamically into the chip."
          box2HighlightColor="#E03232"
        />

        <CompareCard 
          headerIcon={MonitorSmartphone}
          headerText="App vs no-app"
          box1Icon={CheckCircle2}
          box1Title="App (For User)"
          box1Text="Use the app to securely store and update medical records. Seamless control over your privacy layers."
          box2Icon={Check}
          box2Title="No App (For Rescuer)"
          box2Text="Scanning is natively supported by iOS and Android. No rescuer app install needed to rescue a life."
        />
      </section>

      {/* SETUP IN SECONDS */}
      <section className="hw-setup-section scroll-animate">
        <div className="hw-section-sub">Easy Steps</div>
        <h2 className="hw-section-title">Setup in seconds</h2>

        <div className="setup-grid">
          <SetupCard 
            icon={LogIn}
            iconBgColor="rgba(56, 189, 248, 0.15)"
            iconColor="#38bdf8"
            title="1. Login"
            description="Create your account and pair device."
          />
          <SetupCard 
            icon={ShieldCheck}
            iconBgColor="rgba(16, 185, 129, 0.15)"
            iconColor="#10B981"
            title="2. Create Profile"
            description="Drop your vital medical details securely."
          />
          <SetupCard 
            icon={Package}
            iconBgColor="rgba(224, 50, 50, 0.15)"
            iconColor="#E03232"
            title="3. Delivery"
            description="You are protected and ready on contact."
          />
        </div>
      </section>

      {/* HELP CENTER TILES */}
      <section className="hw-help-grid scroll-animate">
        <HelpCard 
          icon={HelpCircle}
          iconColor="#E03232"
          title="Help Center"
          description="How to setup in 5 Min"
        />
        <HelpCard 
          icon={PhoneCall}
          iconColor="#10B981"
          title="Help Center"
          description="How to setup in 5 Min"
        />
      </section>

      {/* CTA SECTION */}
      <section className="hw-cta-section scroll-animate">
        <h2 style={{ fontSize: '32px', fontWeight: '800' }}>Ready to get protected?</h2>
        <div className="hw-cta-buttons">
          <a href="#" className="btn btn-primary">Shop Now</a>
          <a href="#" className="btn btn-secondary" style={{ width: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>See Emergency Preview</a>
        </div>
      </section>

    </div>
  );
}

export default HowQlinkWorks;
