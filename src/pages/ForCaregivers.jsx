import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DynamicBackground from '../components/common/DynamicBackground';
import InfoCard from '../components/Cards/InfoCard';
import StepItem from '../components/Cards/StepItem';
import appScreenImg from '../assets/images/appscreen.png';
import { HeartPulse, Users, Activity, Baby, ShieldCheck, Truck, FileText, Watch } from 'lucide-react';
import './ForCaregivers.css';

function ForCaregivers() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.18, rootMargin: '-50px' }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="caregiver-page">
      <DynamicBackground />

      <div className="caregiver-content">
        <section className="hero-section scroll-animate">
          <span className="hero-badge">Trusted by 50,000+ Families</span>
          <h1 className="hero-title">Because You Can't Be <span className="red-text">There Every Second.</span></h1>
          <p className="hero-desc">Qlink gives caregivers the ultimate peace of mind. Know that your loved ones are protected, identified, and connected to help—even when you're apart.</p>
          <div className="hero-buttons">
            <Link to="/shop" className="btn btn-primary">Start Protecting Today</Link>
          </div>
        </section>

        <section className="feature-section scroll-animate">
          <div className="feature-card">
            <img src={appScreenImg} alt="Caregiving reference" className="feature-image" />
          </div>
          <div className="feature-content">
            <h2>Stay Connected to What Matters Most</h2>
            <p>Caring for a loved one is a full-time job, but you can't be everywhere at once. Qlink acts as your voice when you're not there, ensuring medical personnel have the critical information they need to provide safe, effective care.</p>
            <div className="feature-list">
              <InfoCard icon={HeartPulse} iconColor="#E03232" title="Instant Identification" description="Paramedics know who they are immediately." />
              <InfoCard icon={Users} iconColor="#3b82f6" title="Emergency Contacts" description="You get notified the moment their band is scanned." />
              <InfoCard icon={ShieldCheck} iconColor="#10B981" title="24/7 Protection" description="Works around the clock, no batteries required." />
            </div>
          </div>
        </section>

        <section className="who-section scroll-animate">
          <h2>Designed for Every Family Member</h2>
          <div className="card-grid-3">
            <InfoCard icon={Users} iconColor="#b0b8c8" title="Elderly Parents" description="Ensure safety for those with dementia, Alzheimer’s, or risk of falls." />
            <InfoCard icon={Activity} iconColor="#E03232" title="Chronic Conditions" description="Vital for diabetes, epilepsy, heart conditions, and severe allergies." />
            <InfoCard icon={Baby} iconColor="#b0b8c8" title="Active Children" description="Peace of mind for kids with autism, allergies, or during travel." />
          </div>
        </section>

        <section className="journey-section scroll-animate">
          <h2>Simple Setup. Easy Management.</h2>
          <p>Qlink is built for caregivers. The experience is intuitive and designed around the needs of every age group.</p>
          <div className="step-grid">
            <StepItem icon={FileText} iconColor="#E03232" title="01 Create Profile" description="Enter medical details on our secure portal." />
            <StepItem icon={Watch} iconColor="#E03232" title="02 Link Device" description="Scan the band to link it to the profile." />
            <StepItem icon={Truck} iconColor="#E03232" title="03 Stay Updated" description="Update info anytime from your phone." />
          </div>
        </section>

        <section className="cta-section scroll-animate">
          <div className="cta-card">
            <h2>Give the Gift of Safety</h2>
            <p>Join thousands of caregivers who sleep better at night knowing their loved ones are protected by Qlink.</p>
            <Link to="/shop" className="btn btn-primary">Shop for your family now</Link>
          </div>
        </section>

        <section className="app-section scroll-animate">
          <h2>Get Protected Today!</h2>
          <p>Download the Qlink app and experience the future of personal safety.</p>
          <div className="store-buttons">
            <a href="#" className="store-btn">Download on the App Store</a>
            <a href="#" className="store-btn store-btn-google">Get it on Google Play</a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ForCaregivers;
