import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import Logo from '../components/layout/Logo';
import './NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();
  const { lang } = useContext(LanguageContext);
  const isAr = lang === 'ar';

  return (
    <div className={`nf-container ${isAr ? 'rtl-active' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="nf-glow nf-glow-1" />
      <div className="nf-glow nf-glow-2" />

      <div className="nf-content">
        <Logo className="nf-logo" />

        <div className="nf-code">404</div>

        <h1 className="nf-title">
          {isAr ? 'الصفحة غير موجودة' : 'Page Not Found'}
        </h1>
        <p className="nf-desc">
          {isAr
            ? 'يبدو أن هذه الصفحة لا توجد أو تم نقلها.'
            : "Looks like this page doesn't exist or has been moved."}
        </p>

        <div className="nf-actions">
          <button className="nf-btn-primary" onClick={() => navigate('/')}>
            {isAr ? '← العودة للرئيسية' : 'Go Home →'}
          </button>
          <button className="nf-btn-secondary" onClick={() => navigate(-1)}>
            {isAr ? 'رجوع' : 'Go Back'}
          </button>
        </div>
      </div>
    </div>
  );
}
