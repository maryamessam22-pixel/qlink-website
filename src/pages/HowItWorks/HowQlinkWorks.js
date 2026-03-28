import React, { useRef, useEffect } from 'react';
import './HowQlinkWorks.css';
import {
  UserPlus,
  ShieldCheck,
  Watch,
  ScanLine,
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
import watchVidSrc from '../../assets/videos/watch vid.mp4';

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
  const heroImgSrc = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop";
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
        <img className="hw-hero-video" src={heroImgSrc} alt="How Qlink Works" />
        <div className="hw-hero-overlay"></div>
        <div className="hw-hero-content">
          <h1>How <span className="red-text">Qlink</span> Works</h1>
          <p>A deep dive into the technology that keeps you safe.</p>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="hw-timeline-section scroll-animate">
        <div className="timeline-container">

          <div className="timeline-row scroll-animate">
            <div className="timeline-card timeline-card-left">
              <h3>1. Setup Your Profile</h3>
              <p>Download the Qlink app or scan your own bracelet, enter your medical history, emergency contacts, and insurance details.</p>
            </div>
            <div className="timeline-marker">
              <div className="timeline-marker-inner">
                <Database size={20} />
              </div>
            </div>
          </div>

          <div className="timeline-row scroll-animate">
            <div className="timeline-marker">
              <div className="timeline-marker-inner">
                <Shield size={20} />
              </div>
            </div>
            <div className="timeline-card timeline-card-right">
              <h3>2. Set Privacy Layers</h3>
              <p>Mask sensitive data (HIV status, mental health history) vs Public Data (Allergies, Diabetes) so vital info is hidden unless needed.</p>
            </div>
          </div>

          <div className="timeline-row scroll-animate">
            <div className="timeline-card timeline-card-left">
              <h3>3. Wear The Band</h3>
              <p>Put on your Qlink bracelet. It requires zero monthly charging, pairs in 3 seconds, is fully waterproof, and easily locked.</p>
            </div>
            <div className="timeline-marker">
              <div className="timeline-marker-inner">
                <Smartphone size={20} />
              </div>
            </div>
          </div>

          <div className="timeline-row scroll-animate">
            <div className="timeline-marker">
              <div className="timeline-marker-inner">
                <Bell size={20} />
              </div>
            </div>
            <div className="timeline-card timeline-card-right">
              <h3>4. Emergency Event</h3>
              <p>In an accident, a bystander or paramedic scans the QR code or scans it using an emergency mobile camera.</p>
            </div>
          </div>

        </div>
      </section>

      {/* SPLIT FEATURES VIDEO SECTION */}
      <section className="hw-features-section scroll-animate">
        <div className="features-col">
          <div className="feature-block scroll-animate active">
            <h4>Instant Emergency Identity</h4>
            <p>Qlink connects an emergency identity system that provides instant access to critical medical and contact information through a secure QR code.</p>
          </div>
          <div className="feature-block scroll-animate active">
            <h4>Privacy-First Technology</h4>
            <p>Qlink operates on a privacy-first system. Your data is protected, controlled, and only accessible when scanned in an emergency.</p>
          </div>
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
          <div className="feature-block scroll-animate active">
            <h4>Voice-Free Communication</h4>
            <p>It allows first responders or bystanders to access essential data in events where the patient is unconscious or unable to speak.</p>
          </div>
          <div className="feature-block scroll-animate active">
            <h4>Bridge Between Accident & Treatment</h4>
            <p>It bridges the critical gap between accident and medical response, reducing delays and enabling faster, safer intervention.</p>
          </div>
        </div>
      </section>

      {/* COMPARISON CARDS */}
      <section className="hw-compare-section">

        <div className="compare-card scroll-animate">
          <div className="compare-header">
            <WifiOff size={28} color="#b0b8c8" />
            Offline vs online
          </div>
          <div className="compare-box">
            <h5>Online Mode</h5>
            <p>A full scan instantly provides cloud-synced advanced conditions, doctors info, dynamic PDF reports and photos.</p>
          </div>
          <div className="compare-box" style={{ borderLeft: '2px solid #E03232' }}>
            <h5 style={{ color: '#E03232' }}>Offline Mode</h5>
            <p>No internet required! Critical blood type and allergies are hardcoded dynamically into the chip.</p>
          </div>
        </div>

        <div className="compare-card scroll-animate">
          <div className="compare-header">
            <MonitorSmartphone size={28} color="#b0b8c8" />
            App vs no-app
          </div>
          <div className="compare-box">
            <h5><CheckCircle2 size={18} color="#10B981" /> App (For User)</h5>
            <p>Use the app to securely store and update medical records. Seamless control over your privacy layers.</p>
          </div>
          <div className="compare-box">
            <h5><Check size={18} color="#10B981" /> No App (For Rescuer)</h5>
            <p>Scanning is natively supported by iOS and Android. No rescuer app install needed to rescue a life.</p>
          </div>
        </div>

      </section>

      {/* SETUP IN SECONDS */}
      <section className="hw-setup-section scroll-animate">
        <div className="hw-section-sub">Easy Steps</div>
        <h2 className="hw-section-title">Setup in seconds</h2>

        <div className="setup-grid">
          <div className="setup-card scroll-animate">
            <div className="setup-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
              <LogIn size={24} />
            </div>
            <h5>1. Login</h5>
            <p>Create your account and pair device.</p>
          </div>

          <div className="setup-card scroll-animate">
            <div className="setup-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
              <ShieldCheck size={24} />
            </div>
            <h5>2. Create Profile</h5>
            <p>Drop your vital medical details securely.</p>
          </div>

          <div className="setup-card scroll-animate">
            <div className="setup-icon" style={{ background: 'rgba(224, 50, 50, 0.15)', color: '#E03232' }}>
              <Package size={24} />
            </div>
            <h5>3. Delivery</h5>
            <p>You are protected and ready on contact.</p>
          </div>
        </div>
      </section>

      {/* HELP CENTER TILES */}
      <section className="hw-help-grid scroll-animate">
        <a href="#" className="help-card">
          <div className="help-icon"><HelpCircle size={20} color="#E03232" /></div>
          <div className="help-text">
            <h5>Help Center</h5>
            <p>How to setup in 5 Min</p>
          </div>
        </a>
        <a href="#" className="help-card">
          <div className="help-icon"><PhoneCall size={20} color="#10B981" /></div>
          <div className="help-text">
            <h5>Help Center</h5>
            <p>How to setup in 5 Min</p>
          </div>
        </a>
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
