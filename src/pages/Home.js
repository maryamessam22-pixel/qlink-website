import React from 'react';
import {
  WifiOff,
  QrCode,
  Lock,
  Wifi,
  ShieldCheck,
  Smartphone,
  HeartPulse,
  Users,
  Activity,
  Baby,
  MousePointerClick,
  Settings,
  ShoppingCart,
  Truck,
  CheckCircle2,
  Sparkles,
  ArrowUp,
  Zap
} from 'lucide-react';
import './Home.css';

// Using the same watch image from assets as a placeholder
import watchImg from '../assets/images/watch.png';

function Home() {
  return (
    <div className="home-wrapper">
      {/* Liquid background effect */}
      <div className="home-liquid-bg">
        <div className="home-glow home-glow-1"></div>
        <div className="home-glow home-glow-2"></div>
        <div className="home-glow home-glow-3"></div>
      </div>

      <div className="home-content">
        {/* HERO SECTION */}
        <section className="hero-section">
          <div className="hero-text">
            <h1 className="hero-title">
              Safety in a <span className="red-text">Scan.</span><br />
              Peace of Mind<br />
              Forever.
            </h1>
            <p className="hero-desc">
              Qlink is a QR-based personal safety bracelet that enables instant access to essential emergency information while protecting user privacy.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-secondary">How It Works</button>
              <button className="btn btn-primary">Explore the Bracelet</button>
            </div>
          </div>
          <div className="hero-image">
            <img src={watchImg} alt="Qlink Bracelets" className="hero-img-element" />
          </div>

          {/* Floating Hero Icons */}
          <div className="hero-floating-icons">
            <button className="hero-action-btn"><Sparkles size={20} /></button>
            <button className="hero-action-btn"><ArrowUp size={20} /></button>
          </div>
        </section>

        {/* WHAT IS QLINK */}
        <section className="what-section">
          <h2 className="section-title">What is Qlink?</h2>
          <p className="section-subtitle">
            Qlink is a state-of-the-art wearable that allows first responders or good samaritans to scan your unique QR code with their mobile device to get vital information bridging the gap between an incident and treatment.
          </p>

          <div className="card-grid-3">
            <div className="info-card" style={{ background: 'rgba(16, 185, 129, 0.08)' }}>
              <div className="icon-wrap" style={{ color: '#10B981' }}><Zap size={32} /></div>
              <h3>Works Offline</h3>
              <p>No internet required for basic ID.</p>
            </div>
            <div className="info-card" style={{ background: 'rgba(59, 130, 246, 0.08)' }}>
              <div className="icon-wrap" style={{ color: '#3B82F6' }}><QrCode size={32} /></div>
              <h3>QR Emergency Access</h3>
              <p>Instant access to ID and Meds.</p>
            </div>
            <div className="info-card" style={{ background: 'rgba(224, 50, 50, 0.08)' }}>
              <div className="icon-wrap" style={{ color: '#E03232' }}><Lock size={32} /></div>
              <h3>Privacy-Controlled</h3>
              <p>You decide what data is public.</p>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE QLINK */}
        <section className="why-section">
          <h2 className="section-title">Why Choose Qlink?</h2>
          <p className="section-subtitle">
            Designed for peace of mind in a modern world. Simple, reliable, and secure.
          </p>

          <div className="card-grid-4">
            <div className="why-card">
              <div className="icon-wrap"><Wifi size={20} /></div>
              <h4>Works without internet</h4>
              <p>Data securely stored directly in the QR standard, accessible anywhere on earth.</p>
            </div>
            <div className="why-card">
              <div className="icon-wrap"><ShieldCheck size={20} /></div>
              <h4>Privacy control</h4>
              <p>You control exactly what info is publicly available and what is kept secure.</p>
            </div>
            <div className="why-card">
              <div className="icon-wrap"><Smartphone size={20} /></div>
              <h4>No app needed</h4>
              <p>First responders simply scan with their phone camera. No software required.</p>
            </div>
            <div className="why-card">
              <div className="icon-wrap"><HeartPulse size={20} /></div>
              <h4>Always Medical ID tags</h4>
              <p>The perfect alternative to emergency tags in a very slim profile that fits anywhere.</p>
            </div>
          </div>
        </section>

        {/* SPLIT FEATURE 1 */}
        <section className="split-feature">
          <div className="split-text">
            <h2 className="split-title">Simple. Secure. Always There.</h2>
            <p className="split-desc">
              The bracelet is designed to be a sleek, essential accessory and emergency information under the scanner. It works seamlessly wherever, by scanning the QR code, crucial medical info instantly becomes available to them when they need it. No external app required.
            </p>
            <p className="split-desc">
              Built for everyday life. Qlink works completely offline and uses state of the art minimal tech with maximum outcomes. You decide what to share, what stays private, and when it's accessed. Simple, reliable, and designed for peace of mind for you and the people who care about you.
            </p>
          </div>
          <div className="split-image">
            <img src={watchImg} alt="Qlink Bracelets Dark" />
          </div>
        </section>

        {/* WHO IS QLINK FOR */}
        <section className="what-section">
          <h2 className="section-title">Who is Qlink for?</h2>
          <p className="section-subtitle">
            Safety and peace of mind for every stage of life and lifestyle.
          </p>

          <div className="card-grid-3">
            <div className="info-card" style={{ padding: '40px 24px' }}>
              <div className="icon-wrap" style={{ margin: '0 auto 20px auto', background: 'rgba(255,255,255,0.05)', width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={24} color="#b0b8c8" />
              </div>
              <h3>The Elderly</h3>
              <p>Maintain independence with the safety net of instant medical info during falls.</p>
            </div>
            <div className="info-card" style={{ padding: '40px 24px' }}>
              <div className="icon-wrap" style={{ margin: '0 auto 20px auto', background: 'rgba(224, 50, 50, 0.1)', width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Activity size={24} color="#E03232" />
              </div>
              <h3>Chronic Conditions</h3>
              <p>Diabetes, epilepsy, or allergies? Details clearly state rules when you can't.</p>
            </div>
            <div className="info-card" style={{ padding: '40px 24px' }}>
              <div className="icon-wrap" style={{ margin: '0 auto 20px auto', background: 'rgba(255,255,255,0.05)', width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Baby size={24} color="#b0b8c8" />
              </div>
              <h3>Children</h3>
              <p>Perfect for school trips or busy places. Ensure your contact info always with them.</p>
            </div>
          </div>
        </section>

        {/* JOURNEY SECTION */}
        <section className="journey-section">
          <h2 className="section-title">Start Your Safety Journey</h2>
          <p className="section-subtitle">
            Four simple steps to peace of mind.
          </p>

          <div className="step-grid">
            <div className="step-item">
              <div className="step-icon"><MousePointerClick size={24} /></div>
              <h4>Choose Line</h4>
              <p>Select your bracelet from our products</p>
            </div>
            <div className="step-item">
              <div className="step-icon"><Settings size={24} /></div>
              <h4>Personalize</h4>
              <p>Add your medical, diet, or emergency details</p>
            </div>
            <div className="step-item">
              <div className="step-icon"><ShoppingCart size={24} /></div>
              <h4>Confirm Order</h4>
              <p>Secure checkout and start tracking order</p>
            </div>
            <div className="step-item">
              <div className="step-icon"><Truck size={24} /></div>
              <h4>Receive Bracelet</h4>
              <p>Stay protected using your new Qlink</p>
            </div>
          </div>
        </section>

        {/* HALF CARDS */}
        <section className="half-cards-section">
          <div className="half-card">
            <h3>Public vs Private Information</h3>
            <p>You control what data is shown on a public QR scan and what is securely retained behind an encrypted wall. You can update your emergency contacts while keeping your core medical info totally secure.</p>
          </div>
          <div className="half-card">
            <h3>Hybrid Retrieval Tech</h3>
            <p>We engineered proprietary hybrid architecture that instantly delivers offline basic data while dynamically loading advanced online information for a seamless experience of rapid emergency ID.</p>
          </div>
        </section>

        {/* APP MOCKUP SECTION */}
        <section className="app-section">
          <div className="app-text">
            <h2 className="split-title">Manage Your Safety with the Qlink App</h2>
            <p className="split-desc">
              The Qlink app allows you to fully manage your account, emergency information securely, monitor limits, connect devices, and manage your preferences, all from one place.
            </p>
            <ul>
              <li><CheckCircle2 size={18} className="check" /> Manage your emergency and personal information</li>
              <li><CheckCircle2 size={18} className="check" /> Control privacy and data sharing</li>
              <li><CheckCircle2 size={18} className="check" /> Monitor and update profiles anytime</li>
            </ul>
            <div className="store-buttons">
              <a href="#" className="store-btn">Download on the App Store</a>
              <a href="#" className="store-btn">Get it on Google Play</a>
            </div>
          </div>
          <div className="app-image">
            {/* Using watchImg as a placeholder for the app mockup until an asset is provided */}
            <img src={watchImg} alt="Qlink App" style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }} />
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <h2 style={{ lineHeight: '1.2' }}>Ready to secure your<br />peace of mind?</h2>
          <button className="btn btn-primary" style={{ padding: '14px 40px', fontSize: '16px' }}>Shop Now</button>
          
          <div className="cta-line"></div>
          
          <p className="cta-footer-text">
            Have questions? Visit <a href="#">Support</a> or <a href="#">Contact Us.</a>
          </p>
        </section>
      </div>
    </div>
  );
}

export default Home;
