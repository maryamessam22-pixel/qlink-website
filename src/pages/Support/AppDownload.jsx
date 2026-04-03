import React, { useEffect, useContext } from 'react';
import SEO from '../../components/common/SEO';
import { LanguageContext } from '../../context/LanguageContext';
import DynamicBackground from '../../components/common/DynamicBackground';
import { 
  ShieldCheck, 
  Bell, 
  RefreshCw, 
  MapPin, 
  Users, 
  Lock,
  ChevronDown,
  Apple,
  Play
} from 'lucide-react';
import './AppDownload.css';

// Assets
import heroPhones from '../../assets/images/2mobiles.png';
import no1 from '../../assets/images/no1.png';
import no2 from '../../assets/images/no2.png';
import no3 from '../../assets/images/no3.png';
import no4 from '../../assets/images/no4.png';
import footerPhones from '../../assets/images/appscreen.png';

const AppDownload = () => {
  const { lang, t } = useContext(LanguageContext);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '-50px' });

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`app-download-page ${lang === 'ar' ? 'rtl-text' : ''}`}>
      <SEO 
        title={lang === 'ar' ? 'تنزيل التطبيق' : 'Download App'} 
        description="Take your safety with you everywhere with the Qlink mobile app."
      />
      <DynamicBackground />

      {/* 1. HERO SECTION */}
      <section className="ad-hero-wrapper scroll-animate">
        <div className="ad-hero-container">
          <div className="ad-hero-content">
            <h1>{lang === 'ar' ? 'أمانك في ' : 'Your Safety, '}<span>{lang === 'ar' ? 'جيبك' : 'Pocket-Sized'}</span></h1>
            <p>{lang === 'ar' ? 'يتيح لك تطبيق كيو لينك إدارة معلوماتك الطبية ومعلومات الطوارئ أينما كنت. حافظ على تحكمك في ملفك الشخصي في جميع الأوقات.' : 'The Qlink app allows you to manage your personal and emergency information securely. Update details, control privacy, and manage your devices – all from one place.'}</p>
            
            <ul className="ad-hero-list">
              <li><ShieldCheck size={20} className="red-icon" /> {lang === 'ar' ? 'إدارة الطوارئ والمعلومات الشخصية' : 'Manage emergency and personal information'}</li>
              <li><Lock size={20} className="red-icon" /> {lang === 'ar' ? 'التحكم بالخصوصية ومشاركة البيانات' : 'Control privacy and data sharing'}</li>
              <li><Bell size={20} className="red-icon" /> {lang === 'ar' ? 'مراقبة وتحديث الملفات الشخصية في أي وقت' : 'Monitor and update profiles anytime'}</li>
            </ul>

            <div className="ad-hero-buttons">
               <button className="ia-btn white">
                 <Apple size={24} fill="black" />
                 <div className="btn-text">
                   <span>{lang === 'ar' ? 'حمله من' : 'Download on the'}</span>
                   <strong>App Store</strong>
                 </div>
               </button>
               <button className="ia-btn bg-blur">
                 <Play size={24} fill="#E03232" color="#E03232" />
                 <div className="btn-text">
                   <span>{lang === 'ar' ? 'احصل عليه من' : 'Get it on'}</span>
                   <strong>Google Play</strong>
                 </div>
               </button>
            </div>
          </div>
          
          <div className="ad-hero-visual">
            <img src={heroPhones} alt="Qlink Mobiles" className="hero-floating-img" />
          </div>
        </div>
      </section>

    </div>
  );
};

export default AppDownload;
