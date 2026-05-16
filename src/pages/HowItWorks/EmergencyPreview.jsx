import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, ArrowLeft, AlertTriangle } from 'lucide-react';
import Logo from '../../components/layout/Logo';
import { LanguageContext } from '../../context/LanguageContext';
import { localizedPath } from '../../routeMap';
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
      { labelKey: 'emergencyPreview.primaryContact', phone: '01779998265' },
      { labelKey: 'emergencyPreview.secondaryContact', phone: '01119988299' },
    ],
  },
  {
    name: 'Karma Ahmed',
    age: '10 years',
    bloodType: 'O+',
    allergies: ['Allergic to Penicillin', 'Diabetic Type 1'],
    safetyNotes: ['Requires insulin', 'Avoid penicillin medications'],
    medicalNotes: ['Type 1 Diabetes', 'Hypertension'],
    contacts: [
      { labelKey: 'emergencyPreview.primaryContact', phone: '01779998265' },
      { labelKey: 'emergencyPreview.secondaryContact', phone: '01119988299' },
    ],
  },
];

export default function EmergencyPreview() {
  const navigate = useNavigate();
  const { t, lang } = useContext(LanguageContext);
  const p = (path) => localizedPath(path, lang);
  const [idx, setIdx] = useState(0);
  const profile = profiles[idx];

  return (
    <div className={`ep-page ${lang === 'ar' ? 'rtl-text' : ''}`}>

      {/* Header */}
      <header className="ep-header">
        <Logo style={{ height: '32px', display: 'block' }} />
        <div className="ep-header-actions">
          <button className="ep-header-btn" onClick={() => navigate(`/auth?lang=${lang}`)}>{t('emergencyPreview.login')}</button>
          <button className="ep-header-btn ep-header-btn-outline" onClick={() => navigate(`/auth?lang=${lang}`)}>{t('emergencyPreview.signUp')}</button>
        </div>
      </header>

      {/* Nav bar */}
      <div className="ep-nav">
        <button className="ep-nav-btn" onClick={() => navigate(p('/how-it-works/qlink'))}>
          <ArrowLeft size={16} /> {t('emergencyPreview.back')}
        </button>
        <button
          className="ep-nav-btn ep-nav-next"
          onClick={() => setIdx((i) => (i + 1) % profiles.length)}
        >
          {t('emergencyPreview.nextProfile')} →
        </button>
      </div>

      {/* Hero */}
      <div className="ep-hero">
        <div className="ep-hero-badge">
          <AlertTriangle size={14} /> {t('emergencyPreview.heroBadge')}
        </div>
        <h1 className="ep-hero-name">{profile.name}</h1>
        <p className="ep-hero-sub" dangerouslySetInnerHTML={{ __html: t('emergencyPreview.heroSub') }} />
      </div>

      {/* Cards */}
      <div className="ep-body">

        <div className="ep-card ep-card-full">
          <h3 className="ep-card-title">{t('emergencyPreview.allergies')}</h3>
          {profile.allergies.map((a, i) => (
            <p key={i} className="ep-card-item">• {a}</p>
          ))}
        </div>

        <div className="ep-row-2">
          <div className="ep-card">
            <h3 className="ep-card-title">{t('emergencyPreview.bloodType')}</h3>
            <p className="ep-card-value">{profile.bloodType}</p>
          </div>
          <div className="ep-card">
            <h3 className="ep-card-title">{t('emergencyPreview.years')}</h3>
            <p className="ep-card-value">{profile.age}</p>
          </div>
        </div>

        <div className="ep-card ep-card-full">
          <h3 className="ep-card-title">{t('emergencyPreview.safetyNotes')}</h3>
          {profile.safetyNotes.map((n, i) => (
            <p key={i} className="ep-card-item">• {n}</p>
          ))}
        </div>

        <div className="ep-card ep-card-full">
          <h3 className="ep-card-title">{t('emergencyPreview.medicalNotes')}</h3>
          {profile.medicalNotes.map((n, i) => (
            <p key={i} className="ep-card-item">• {n}</p>
          ))}
        </div>

        <div className="ep-card ep-card-full">
          <h3 className="ep-card-title">{t('emergencyPreview.emergencyContacts')}</h3>
          {profile.contacts.map((c, i) => (
            <div key={i} className="ep-contact-row">
              <div>
                <p className="ep-contact-label">{t(c.labelKey)}</p>
                <p className="ep-contact-phone">{c.phone}</p>
              </div>
              <a href={`tel:${c.phone}`} className="ep-call-btn" aria-label={`${t('emergencyPreview.call')} ${t(c.labelKey)}`}>
                <Phone size={18} fill="white" color="white" />
              </a>
            </div>
          ))}
        </div>

      </div>

      {/* CTA */}
      <div className="ep-cta">
        <div className="ep-cta-text">
          <h2>{t('emergencyPreview.ctaTitle')} <span className="ep-cta-brand">Qlink!</span></h2>
          <p>{t('emergencyPreview.ctaText')}</p>
        </div>
        <div className="ep-cta-buttons">
          <button className="ep-cta-btn ep-cta-primary" onClick={() => navigate(p('/support/download'))}>{t('emergencyPreview.installBtn')}</button>
          <button className="ep-cta-btn ep-cta-secondary" onClick={() => navigate(`/auth?lang=${lang}`)}>{t('emergencyPreview.createAccountBtn')}</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="ep-footer">
        <div className="ep-footer-links">
          <a href={p('/about/privacy')}>{t('emergencyPreview.privacyPolicy')}</a>
          <a href="#">{t('emergencyPreview.termsOfService')}</a>
          <a href={p('/support/contact')}>{t('emergencyPreview.support')}</a>
        </div>
        <p className="ep-footer-copy">© 2026 Qlink Emergency. {t('emergencyPreview.allRightsReserved')}</p>
      </footer>

    </div>
  );
}
