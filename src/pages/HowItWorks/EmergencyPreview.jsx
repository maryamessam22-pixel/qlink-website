import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react';
import './EmergencyPreview.css';

const profiles = [
  {
    name: 'Mohamed Saber',
    age: '73 years',
    bloodType: 'AB-',
    allergies: ['Allergic to Penicillin', 'Diabetic Type 1'],
    safetyNotes: ['Requires insulin', 'Avoid penicillin medications'],
    medicalNotes: ['Type 1 Diabetes', 'Hypertension'],
    contacts: [
      { label: 'Primary Contact', phone: '01779998265' },
      { label: 'Secondary Contact', phone: '01119988299' },
    ],
  },
  {
    name: 'Sara Ali',
    age: '45 years',
    bloodType: 'O+',
    allergies: ['Peanut Allergy', 'Latex Allergy'],
    safetyNotes: ['Carries EpiPen', 'Do not give NSAIDs'],
    medicalNotes: ['Asthma', 'Anaphylaxis risk'],
    contacts: [
      { label: 'Primary Contact', phone: '01001234567' },
      { label: 'Secondary Contact', phone: '01227654321' },
    ],
  },
];

export default function EmergencyPreview() {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const profile = profiles[idx];

  return (
    <div className="ep-page">

      {/* Header */}
      <header className="ep-header">
        <div className="ep-logo">
          <span className="ep-logo-q">Q</span>link
        </div>
        <div className="ep-header-actions">
          <button className="ep-header-btn" onClick={() => navigate('/auth')}>Login</button>
          <button className="ep-header-btn ep-header-btn-outline" onClick={() => navigate('/auth')}>Sign Up</button>
        </div>
      </header>

      {/* Nav bar */}
      <div className="ep-nav">
        <button className="ep-nav-btn" onClick={() => navigate('/how-it-works/qlink')}>
          <ArrowLeft size={16} /> Close Preview
        </button>
        <button
          className="ep-nav-btn"
          onClick={() => setIdx((i) => (i + 1) % profiles.length)}
        >
          Next Preview <ArrowRight size={16} />
        </button>
      </div>

      {/* Hero */}
      <div className="ep-hero">
        <div className="ep-hero-badge">
          <AlertTriangle size={14} /> Emergency Info
        </div>
        <h1 className="ep-hero-name">{profile.name}</h1>
        <p className="ep-hero-sub">
          This is the information first responders see<br />when scanning the QR code.
        </p>
      </div>

      {/* Cards */}
      <div className="ep-body">

        <div className="ep-card ep-card-full">
          <h3 className="ep-card-title">Allergies</h3>
          {profile.allergies.map((a, i) => (
            <p key={i} className="ep-card-item">• {a}</p>
          ))}
        </div>

        <div className="ep-row-2">
          <div className="ep-card">
            <h3 className="ep-card-title">Blood Type</h3>
            <p className="ep-card-value">{profile.bloodType}</p>
          </div>
          <div className="ep-card">
            <h3 className="ep-card-title">Years</h3>
            <p className="ep-card-value">{profile.age}</p>
          </div>
        </div>

        <div className="ep-card ep-card-full">
          <h3 className="ep-card-title">Safety Notes</h3>
          {profile.safetyNotes.map((n, i) => (
            <p key={i} className="ep-card-item">• {n}</p>
          ))}
        </div>

        <div className="ep-card ep-card-full">
          <h3 className="ep-card-title">Medical Notes</h3>
          {profile.medicalNotes.map((n, i) => (
            <p key={i} className="ep-card-item">• {n}</p>
          ))}
        </div>

        <div className="ep-card ep-card-full">
          <h3 className="ep-card-title">Emergency Contacts</h3>
          {profile.contacts.map((c, i) => (
            <div key={i} className="ep-contact-row">
              <div>
                <p className="ep-contact-label">{c.label}</p>
                <p className="ep-contact-phone">{c.phone}</p>
              </div>
              <a href={`tel:${c.phone}`} className="ep-call-btn" aria-label={`Call ${c.label}`}>
                <Phone size={18} fill="white" />
              </a>
            </div>
          ))}
        </div>

      </div>

      {/* CTA */}
      <div className="ep-cta">
        <div className="ep-cta-text">
          <h2>Stay Protected with <span className="ep-cta-brand">Qlink!</span></h2>
          <p>Qlink helps protect you and your loved ones by providing instant access to critical.<br />Medical information during emergencies.</p>
        </div>
        <div className="ep-cta-buttons">
          <button className="ep-cta-btn ep-cta-primary" onClick={() => navigate('/support/download')}>Install the App</button>
          <button className="ep-cta-btn ep-cta-secondary" onClick={() => navigate('/auth')}>Create Account</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="ep-footer">
        <div className="ep-footer-links">
          <a href="/about/privacy">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="/support/contact">Support</a>
        </div>
        <p className="ep-footer-copy">© 2026 Qlink Emergency. All rights reserved.</p>
      </footer>

    </div>
  );
}
