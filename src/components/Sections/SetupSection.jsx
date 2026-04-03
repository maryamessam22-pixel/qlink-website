import React, { useEffect, useContext } from 'react';
import { LogIn, CheckCircle2, MonitorSmartphone } from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import './SetupSection.css';

const SetupSection = () => {
  const { lang } = useContext(LanguageContext);

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
    <section className={`setup-section-wrapper scroll-animate ${lang === 'ar' ? 'rtl-text' : ''}`}>
   
      <div className="setup-bg-ball ball-1"></div>
      <div className="setup-bg-ball ball-2"></div>
      <div className="setup-bg-ball ball-3"></div>

      <div className="setup-content-container scroll-animate stag-1">
        <div className="setup-header">
          <span className="setup-label">
            {lang === 'ar' ? 'البدء السهل' : 'EASY START'}
          </span>
          <h2 className="setup-title">
            {lang === 'ar' ? 'إعداد في ثوانٍ' : 'Setup in seconds'}
          </h2>
        </div>

        <div className="setup-cards-row">
          
        
          <div className="setup-step-card scroll-animate stag-2">
            <div className="setup-icon-wrapper icon-blue">
              <LogIn size={28} />
            </div>
            <h3 className="setup-step-title">
              {lang === 'ar' ? '1. تسجيل الدخول' : '1.Login'}
            </h3>
            <p className="setup-step-desc">
              {lang === 'ar' ? 'أدخل بريدك الإلكتروني وكلمة المرور الخاصة بك.' : 'Enter your email and password.'}
            </p>
          </div>

    
          <div className="setup-step-card scroll-animate stag-3">
            <div className="setup-icon-wrapper icon-green">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="setup-step-title">
              {lang === 'ar' ? '2. إنشاء الملف الشخصي' : '2.Create Profile'}
            </h3>
            <p className="setup-step-desc">
              {lang === 'ar' ? 'أدخل بياناتك الطبية الحيوية بشكل آمن.' : 'Enter your vital medical details securely.'}
            </p>
          </div>


          <div className="setup-step-card scroll-animate stag-4">
            <div className="setup-icon-wrapper icon-red">
              <MonitorSmartphone size={28} />
            </div>
            <h3 className="setup-step-title">
              {lang === 'ar' ? '3. التفعيل' : '3.Activate'}
            </h3>
            <p className="setup-step-desc">
              {lang === 'ar' ? 'جهازك الآن أصبح جاهزاً للعمل والحماية.' : 'Your device is now live and ready to protect.'}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SetupSection;
