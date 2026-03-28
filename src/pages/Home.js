import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  ArrowUp,
  Zap,
  Apple,
  Play,
  Watch,
  FileText
} from 'lucide-react';
import './Home.css';

import InfoCard from '../components/Cards/InfoCard';
import WhyCard from '../components/Cards/WhyCard';
import StepItem from '../components/Cards/StepItem';
import HalfCard from '../components/Cards/HalfCard';


import watchImg from '../assets/images/watch.png';
import twoWatchesImg from '../assets/images/2 watches.png';
import appScreenImg from '../assets/images/appscreen.png';

function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        <section className="hero-section scroll-animate">
          <div className="hero-text">
            <h1 className="hero-title scroll-animate stag-1">
              Safety in a <span className="red-text">Scan.</span><br />
              Peace of Mind<br />
              Forever.
            </h1>
            <p className="hero-desc scroll-animate stag-2">
              Qlink is a QR-based personal safety bracelet that enables instant access to essential emergency information while protecting user privacy.
            </p>
            <div className="hero-buttons scroll-animate stag-3">
              <button className="btn btn-secondary">How It Works</button>
              <button className="btn btn-primary">Explore the Bracelet</button>
            </div>
          </div>
          <div className="hero-image">
            <img src={watchImg} alt="Qlink Bracelets" className="hero-img-element" />
          </div>
        </section>

        {/* WHAT IS QLINK */}
        <section className="what-section scroll-animate">
          <h2 className="section-title">What is Qlink?</h2>
          <p className="section-subtitle">
            Qlink is a state-of-the-art wearable that allows first responders or good samaritans to scan your unique QR code with their mobile device to get vital information bridging the gap between an incident and treatment.
          </p>

          <div className="card-grid-3">
            <InfoCard 
              style={{ background: 'rgba(16, 185, 129, 0.08)' }}
              icon={Zap}
              iconColor="var(--color-success)"
              title="Works Offline"
              description="No internet required for basic ID."
            />
            <InfoCard 
              style={{ background: 'rgba(59, 130, 246, 0.08)' }}
              icon={QrCode}
              iconColor="var(--color-primary-blue)"
              title="QR Emergency Access"
              description="Instant access to ID and Meds."
            />
            <InfoCard 
              style={{ background: 'rgba(224, 50, 50, 0.08)' }}
              icon={Lock}
              iconColor="var(--color-error)"
              title="Privacy-Controlled"
              description="You decide what data is public."
            />
          </div>
        </section>

        {/* WHY CHOOSE QLINK */}
        <section className="why-section scroll-animate">
          <h2 className="section-title">Why Choose Qlink?</h2>
          <p className="section-subtitle">
            Designed for peace of mind in a modern world. Simple, reliable, and secure.
          </p>

          <div className="card-grid-4">
            <WhyCard 
              icon={Wifi}
              title="Works without internet"
              description="Data securely stored directly in the QR standard, accessible anywhere on earth."
            />
            <WhyCard 
              icon={ShieldCheck}
              title="Privacy control"
              description="You control exactly what info is publicly available and what is kept secure."
            />
            <WhyCard 
              icon={Smartphone}
              title="No app needed"
              description="First responders simply scan with their phone camera. No software required."
            />
            <WhyCard 
              icon={HeartPulse}
              title="Always Medical ID tags"
              description="The perfect alternative to emergency tags in a very slim profile that fits anywhere."
            />
          </div>
        </section>

        {/* SPLIT FEATURE 1 */}
        <section className="split-feature scroll-animate">
          <div className="split-text">
            <h2 className="split-title">Simple. Secure. Always There.</h2>
            <p className="split-desc">
              This bracelet is designed to help share essential personal and emergency information when the wearer is unable to communicate. By scanning the QR code, trusted information becomes instantly accessible without the need for an app or internet connection.
            </p>
            <p className="split-desc">
              Built for everyday life, Qlink works completely offline and puts you in full control of what information is shared. You decide what's visible, what stays private, and when it's accessed. Simple, reliable, and designed for peace of mind for you and the people who care about you.
            </p>
            <Link to="/about" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', marginTop: '16px' }}>More about Qlink</Link>
          </div>
          <div className="split-image">
            <img src={twoWatchesImg} alt="2 Qlink Bracelets" />
          </div>
        </section>

        {/* WHO IS QLINK FOR */}
        <section className="what-section scroll-animate">
          <h2 className="section-title">Who is Qlink for?</h2>
          <p className="section-subtitle">
            Safety and peace of mind for every stage of life and lifestyle.
          </p>

          <div className="card-grid-3">
            <InfoCard 
              style={{ padding: '40px 24px' }}
              iconWrapperStyle={{ margin: '0 auto 20px auto', background: 'rgba(255,255,255,0.05)', width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              icon={Users}
              iconSize={24}
              iconColor="#b0b8c8"
              title="The Elderly"
              description="Maintain independence with the safety net of instant medical info during falls."
            />
            <InfoCard 
              style={{ padding: '40px 24px' }}
              iconWrapperStyle={{ margin: '0 auto 20px auto', background: 'rgba(224, 50, 50, 0.1)', width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              icon={Activity}
              iconSize={24}
              iconColor="#E03232"
              title="Chronic Conditions"
              description="Diabetes, epilepsy, or allergies? Details clearly state rules when you can't."
            />
            <InfoCard 
              style={{ padding: '40px 24px' }}
              iconWrapperStyle={{ margin: '0 auto 20px auto', background: 'rgba(255,255,255,0.05)', width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              icon={Baby}
              iconSize={24}
              iconColor="#b0b8c8"
              title="Children"
              description="Perfect for school trips or busy places. Ensure your contact info always with them."
            />
          </div>
        </section>

        {/* JOURNEY SECTION */}
        <section className="journey-section scroll-animate">
          <h2 className="section-title">Start Your Safety Journey</h2>
          <p className="section-subtitle">
            Four simple steps to peace of mind.
          </p>

          <div className="step-grid">
            <StepItem 
              icon={Watch}
              iconColor="#E03232"
              title="Choose One"
              description="Select your own bracelet from our products."
            />
            <StepItem 
              icon={FileText}
              iconColor="#E03232"
              title="Personalize"
              description="Unput your vital medical data and emergency contacts."
            />
            <StepItem 
              icon={CheckCircle2}
              iconColor="#E03232"
              title="Confirm Order"
              description="Secure checkout with instant digital profile creation."
            />
            <StepItem 
              icon={Truck}
              iconColor="#E03232"
              title="Receive Bracelet"
              description="Fast, tracked shipping to your doorstep."
            />
          </div>
        </section>

        {/* HALF CARDS */}
        <section className="half-cards-section scroll-animate">
          <HalfCard 
            title="Public vs Private Information"
            description="You control what data is shown on a public QR scan and what is securely retained behind an encrypted wall. You can update your emergency contacts while keeping your core medical info totally secure."
          />
          <HalfCard 
            title="Hybrid Retrieval Tech"
            description="We engineered proprietary hybrid architecture that instantly delivers offline basic data while dynamically loading advanced online information for a seamless experience of rapid emergency ID."
          />
        </section>

        {/* APP MOCKUP SECTION */}
        <div className="app-section-wrapper scroll-animate">
          <section className="app-section">
            <div className="app-text">
            <h2 className="split-title">Manage Your Safety with the Qlink App</h2>
            <p className="split-desc">
              The Qlink app allows you to fully manage your account, emergency information securely, monitor limits, connect devices, and manage your preferences, all from one place.
            </p>
            <ul>
              <li><CheckCircle2 size={18} className="check" /> Manage emergency and personal information</li>
              <li><CheckCircle2 size={18} className="check" /> Control privacy and data sharing</li>
              <li><CheckCircle2 size={18} className="check" /> Monitor and update profiles anytime</li>
            </ul>
            <div className="store-buttons">
              <a href="#" className="store-btn">
                <Apple size={28} />
                <div className="store-btn-text">
                  <span className="store-btn-sub">Download on the</span>
                  <span className="store-btn-title">App Store</span>
                </div>
              </a>
              <a href="#" className="store-btn store-btn-google">
                <Play size={28} />
                <div className="store-btn-text">
                  <span className="store-btn-sub">Get it on</span>
                  <span className="store-btn-title">Google Play</span>
                </div>
              </a>
            </div>
          </div>
          <div className="app-image">
            <img src={appScreenImg} alt="Qlink App" className="floating-app-screen" style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))' }} />
          </div>
          </section>
        </div>

        {/* CTA */}
        <section className="cta-section scroll-animate">
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
