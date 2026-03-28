import React from 'react';
import './HowQlinkWorks.css';
import { 
  UserPlus, 
  ShieldCheck, 
  Watch, 
  ScanLine, 
  WifiOff, 
  MonitorSmartphone, 
  CheckCircle2, 
  Check, 
  LogIn, 
  Package, 
  HelpCircle, 
  PhoneCall
} from 'lucide-react';

function HowQlinkWorks() {
  // Placeholder images/videos
  const heroImgSrc = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"; // Business woman phone
  const centerVideoSrc = "https://cdn.pixabay.com/video/2021/08/04/83866-584742469_large.mp4"; // generic tech video 

  return (
    <div className="how-works-page">
      
      {/* HERO SECTION */}
      <section className="hw-hero">
        <img className="hw-hero-video" src={heroImgSrc} alt="How Qlink Works" />
        <div className="hw-hero-overlay"></div>
        <div className="hw-hero-content">
          <h1>How <span className="red-text">Qlink</span> Works</h1>
          <p>A deep dive into the technology that keeps you safe.</p>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="hw-timeline-section">
        <div className="timeline-container">
          
          <div className="timeline-row">
            <div className="timeline-card">
              <h3>1. Setup Your Profile</h3>
              <p>Download the Qlink app or scan your own bracelet, enter your medical history, emergency contacts, and insurance details.</p>
            </div>
            <div className="timeline-marker"><UserPlus size={24} /></div>
            <div className="timeline-empty"></div>
          </div>

          <div className="timeline-row">
            <div className="timeline-empty"></div>
            <div className="timeline-marker"><ShieldCheck size={24} /></div>
            <div className="timeline-card">
              <h3>2. Set Privacy Layers</h3>
              <p>Mask sensitive data (HIV status, mental health history) vs Public Data (Allergies, Diabetes) so vital info is hidden unless needed.</p>
            </div>
          </div>

          <div className="timeline-row">
            <div className="timeline-card">
              <h3>3. Wear The Band</h3>
              <p>Put on your Qlink bracelet. It requires zero monthly charging, pairs in 3 seconds, is fully waterproof, and easily locked.</p>
            </div>
            <div className="timeline-marker"><Watch size={24} /></div>
            <div className="timeline-empty"></div>
          </div>

          <div className="timeline-row">
            <div className="timeline-empty"></div>
            <div className="timeline-marker"><ScanLine size={24} /></div>
            <div className="timeline-card">
              <h3>4. Emergency Scan!</h3>
              <p>In an accident, a bystander or paramedic scans the QR code or scans it using an emergency mobile camera.</p>
            </div>
          </div>

        </div>
      </section>

      {/* SPLIT FEATURES VIDEO SECTION */}
      <section className="hw-features-section">
        <div className="features-col">
          <div className="feature-block active">
            <h4>Instant Emergency Identity</h4>
            <p>Qlink connects an emergency identity system that provides instant access to critical medical and contact information through a secure QR code.</p>
          </div>
          <div className="feature-block active">
            <h4>Privacy-First Technology</h4>
            <p>Qlink operates on a privacy-first system. Your data is protected, controlled, and only accessible when scanned in an emergency.</p>
          </div>
        </div>

        <div className="features-video-wrapper">
          <video className="features-center-video" autoPlay loop muted playsInline>
            <source src={centerVideoSrc} type="video/mp4" />
          </video>
        </div>

        <div className="features-col">
          <div className="feature-block active">
            <h4>Voice-Free Communication</h4>
            <p>It allows first responders or bystanders to access essential data in events where the patient is unconscious or unable to speak.</p>
          </div>
          <div className="feature-block active">
            <h4>Bridge Between Accident & Treatment</h4>
            <p>It bridges the critical gap between accident and medical response, reducing delays and enabling faster, safer intervention.</p>
          </div>
        </div>
      </section>

      {/* COMPARISON CARDS */}
      <section className="hw-compare-section">
        
        <div className="compare-card">
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

        <div className="compare-card">
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
      <section className="hw-setup-section">
        <div className="hw-section-sub">Easy Steps</div>
        <h2 className="hw-section-title">Setup in seconds</h2>
        
        <div className="setup-grid">
          <div className="setup-card">
            <div className="setup-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
              <LogIn size={24} />
            </div>
            <h5>1. Login</h5>
            <p>Create your account and pair device.</p>
          </div>
          
          <div className="setup-card">
            <div className="setup-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
              <ShieldCheck size={24} />
            </div>
            <h5>2. Create Profile</h5>
            <p>Drop your vital medical details securely.</p>
          </div>
          
          <div className="setup-card">
            <div className="setup-icon" style={{ background: 'rgba(224, 50, 50, 0.15)', color: '#E03232' }}>
              <Package size={24} />
            </div>
            <h5>3. Delivery</h5>
            <p>You are protected and ready on contact.</p>
          </div>
        </div>
      </section>

      {/* HELP CENTER TILES */}
      <section className="hw-help-grid">
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
      <section className="hw-cta-section">
        <h2 style={{ fontSize: '32px', fontWeight: '800' }}>Ready to get protected?</h2>
        <div className="hw-cta-buttons">
          <a href="#" className="btn btn-primary">Shop Now</a>
          <a href="#" className="btn btn-secondary" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>See Emergency Preview</a>
        </div>
      </section>

    </div>
  );
}

export default HowQlinkWorks;
