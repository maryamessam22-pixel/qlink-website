import React from 'react';
import { LogIn, CheckCircle2, MonitorSmartphone } from 'lucide-react';
import './SetupSection.css';

const SetupSection = () => {
  return (
    <section className="setup-section-wrapper">
      {/* Animated Background Elements */}
      <div className="setup-bg-ball ball-1"></div>
      <div className="setup-bg-ball ball-2"></div>
      <div className="setup-bg-ball ball-3"></div>

      <div className="setup-content-container">
        <div className="setup-header">
          <span className="setup-label">EASY START</span>
          <h2 className="setup-title">Setup in seconds</h2>
        </div>

        <div className="setup-cards-row">
          
          {/* Card 1 */}
          <div className="setup-step-card">
            <div className="setup-icon-wrapper icon-blue">
              <LogIn size={28} />
            </div>
            <h3 className="setup-step-title">1.Login</h3>
            <p className="setup-step-desc">Enter your email and password.</p>
          </div>

          {/* Card 2 */}
          <div className="setup-step-card">
            <div className="setup-icon-wrapper icon-green">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="setup-step-title">2.Create Profile</h3>
            <p className="setup-step-desc">Enter your vital medical details securely.</p>
          </div>

          {/* Card 3 */}
          <div className="setup-step-card">
            <div className="setup-icon-wrapper icon-red">
              <MonitorSmartphone size={28} />
            </div>
            <h3 className="setup-step-title">3.Activate</h3>
            <p className="setup-step-desc">Your device is now live and ready to protect.</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SetupSection;
