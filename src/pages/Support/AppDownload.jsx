import React, { useEffect, useContext, useState } from 'react';
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
  Play,
  HelpCircle
} from 'lucide-react';
import './AppDownload.css';

import AppPromoSection from '../../components/Sections/AppPromoSection';
import '../../components/Sections/AppPromoSection.css';

// Assets
import heroPhones from '../../assets/images/mobile2.png';
import no1 from '../../assets/images/no1.png';
import no2 from '../../assets/images/no2.png';
import no3 from '../../assets/images/no3.png';
import no4 from '../../assets/images/no4.png';
import footerPhones from '../../assets/images/watch-mobile.png';

const AppDownload = () => {
  const { lang, t } = useContext(LanguageContext);
  const [activeFaq, setActiveFaq] = useState(0);

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

  const features = [
    { icon: ShieldCheck, title: lang === 'ar' ? 'ملفات آمنة' : 'Secure Profiles', desc: lang === 'ar' ? 'تشفير بياناتك الطبية والشخصية.' : 'End-to-end encryption for your medical and personal data.' },
    { icon: Bell, title: lang === 'ar' ? 'تنبيهات فورية' : 'Instant Alerts', desc: lang === 'ar' ? 'إشعارات لحظية لجهات اتصال الطوارئ.' : 'Instant notifications for emergency contacts on events.' },
    { icon: RefreshCw, title: lang === 'ar' ? 'مزامنة مباشرة' : 'Real-Time Sync', desc: lang === 'ar' ? 'تحديث المعلومات عبر جميع الأجهزة فورياً.' : 'Update information across all connected devices instantly.' },
    { icon: MapPin, title: lang === 'ar' ? 'تتبع الموقع' : 'Location Tracking', desc: lang === 'ar' ? 'مشاركة موقعك بدقة مع خدمات الطوارئ.' : 'Share your precise location with emergency services.' },
    { icon: Users, title: lang === 'ar' ? 'مشاركة عائلية' : 'Family Sharing', desc: lang === 'ar' ? 'إدارة ملفات أفراد العائلة من حساب واحد.' : 'Manage family member profiles from a single dashboard.' },
    { icon: Lock, title: lang === 'ar' ? 'ضوابط الخصوصية' : 'Privacy Controls', desc: lang === 'ar' ? 'تحكم كامل في من يرى بياناتك ومتى.' : 'Full control over who sees your data and when.' }
  ];

  const faqs = [
    { q: lang === 'ar' ? 'هل التطبيق مجاني؟' : 'Is the app free?', a: lang === 'ar' ? 'نعم، كيو لينك مجاني تماماً للتحميل والاستخدام الأساسي.' : 'Yes, Qlink is completely free to download and for basic essential features.' },
    { q: lang === 'ar' ? 'هل يعمل على أندرويد وآيفون؟' : 'Does it work on Android and iOS?', a: lang === 'ar' ? 'نعم، التطبيق متاح في كل من App Store و Google Play.' : 'Yes, the app is available on both the App Store and Google Play.' },
    { q: lang === 'ar' ? 'هل يمكنني إدارة أساور متعددة؟' : 'Can I manage multiple bracelets?', a: lang === 'ar' ? 'نعم، يمكنك توصيل وإدارة أساور متعددة لنفسك أو لعائلتك.' : 'Yes, you can connect and manage multiple bracelets for yourself or your family.' }
  ];

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
              <li><ShieldCheck size={20} className="check-icon" /> {lang === 'ar' ? 'إدارة الطوارئ والمعلومات الشخصية' : 'Manage emergency and personal information'}</li>
              <li><ShieldCheck size={20} className="check-icon" /> {lang === 'ar' ? 'التحكم بالخصوصية ومشاركة البيانات' : 'Control privacy and data sharing'}</li>
              <li><ShieldCheck size={20} className="check-icon" /> {lang === 'ar' ? 'مراقبة وتحديث الملفات الشخصية في أي وقت' : 'Monitor and update profiles anytime'}</li>
            </ul>

            <div className="ad-hero-buttons">
               <button className="promo-app-btn">
                 <Apple size={24} />
                 <div className="btn-text" style={lang === 'ar' ? { textAlign: 'right' } : {}}>
                   <span>{t('appSection.appStore') || 'Download on the'}</span>
                   <strong>{t('appSection.appStoreTitle') || 'App Store'}</strong>
                 </div>
               </button>
               <button className="promo-app-btn" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>
                 <Play size={24}  color="#ffffffff" />
                 <div className="btn-text" style={lang === 'ar' ? { textAlign: 'right' } : {}}>
                   <span>{t('appSection.googlePlay') || 'Get it on'}</span>
                   <strong>{t('appSection.googlePlayTitle') || 'Google Play'}</strong>
                 </div>
               </button>
            </div>
          </div>
          
          <div className="ad-hero-visual">
            <img src={heroPhones} alt="Qlink Mobiles" className="hero-floating-img" />
          </div>
        </div>
      </section>

      {/* 2. APP FEATURES */}
      <section className="ad-features-section scroll-animate">
        <div className="ad-section-badge">{lang === 'ar' ? 'تنزيل التطبيق' : 'DOWNLOAD APP'}</div>
        <h2 className="ad-section-title">{lang === 'ar' ? 'مميزات التطبيق' : 'App Features'}</h2>
        
        <div className="ad-features-grid">
          {features.map((f, i) => (
            <div key={i} className="ad-feature-card">
              <div className="ad-f-icon"><f.icon size={24} color="#3b82f6" /></div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SIMPLE SETUP (Timeline) */}
      <section className="ad-setup-section scroll-animate">
        <div className="ad-section-badge">{lang === 'ar' ? 'كيف يعمل' : 'HOW IT WORKS'}</div>
        <h2 className="ad-section-title">{lang === 'ar' ? 'إعداد بسيط' : 'Simple Setup'}</h2>
        
        <div className="ad-setup-timeline">
          <div className="setup-step">
            <div className="step-number">01</div>
            <h3>{lang === 'ar' ? 'تحميل التطبيق' : 'Download App'}</h3>
            <p>{lang === 'ar' ? 'ابحث عن كيو لينك في متجر التطبيقات.' : 'Get Qlink from App Store or Google Play.'}</p>
          </div>
          <div className="setup-step">
            <div className="step-number">02</div>
            <h3>{lang === 'ar' ? 'إنشاء ملف' : 'Create Profile'}</h3>
            <p>{lang === 'ar' ? 'أدخل بياناتك وجهات اتصالك.' : 'Enter your medical data and emergency contacts.'}</p>
          </div>
          <div className="setup-step">
            <div className="step-number">03</div>
            <h3>{lang === 'ar' ? 'ربط الجهاز' : 'Link Device'}</h3>
            <p>{lang === 'ar' ? 'أضف سوارك بمسحة واحدة.' : 'Add your bracelet or tag into the dashboard.'}</p>
          </div>
        </div>
      </section>

      {/* 4. GALLERY PREVIEW (Expanding Cards) */}
      <section className="ad-gallery-section scroll-animate">
        <div className="ad-gallery-grid">
          {[
            { img: no1, title: lang === 'ar' ? 'نمط حياة' : 'Lifestyle' },
            { img: no2, title: lang === 'ar' ? 'تحكم كامل' : 'Total Control' },
            { img: no3, title: lang === 'ar' ? 'أمانك أولاً' : 'Safety First' },
            { img: no4, title: lang === 'ar' ? 'بيانات دقيقة' : 'Deep Insight' }
          ].map((item, i) => (
            <div key={i} className="ad-gallery-item">
              <img src={item.img} alt={`Gallery ${i+1}`} />
              <div className="ad-gallery-overlay">
                <h3>{item.title}</h3>
                <span>{lang === 'ar' ? 'عرض الواجهة' : 'View Interface'}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ENCRYPTED BANNER */}
      <section className="ad-encrypted-banner scroll-animate">
        <div className="ad-enc-content">
          <div className="ad-shield-icon"><Lock size={40} color="#10B981" /></div>
          <h2>{lang === 'ar' ? 'المعلومات مشفرة بالكامل' : 'Your Data is Encrypted'}</h2>
          <p>{lang === 'ar' ? 'نستخدم تشفير AES-256 لضمان حماية بياناتك الطبية بأعلى المعايير الأمنية العالمية.' : 'We use AES-256 encryption to ensure your personal health information is always secured. Only you have control over your data access and share.'}</p>
        </div>
      </section>

      {/* 6. APP FAQ */}
      <section className="ad-faq-section scroll-animate">
        <div className="ad-section-badge">{lang === 'ar' ? 'قوة الأمان' : 'POWER YOUR SAFETY'}</div>
        <h2 className="ad-section-title">{lang === 'ar' ? 'الأسئلة الشائعة' : 'App FAQ'}</h2>
        
        <ul className="ad-faq-list">
          {faqs.map((faq, i) => (
            <li key={i} className={activeFaq === i ? 'active' : ''} onClick={() => setActiveFaq(i)}>
              <div className="ad-faq-q">
                <span>{faq.q}</span>
                <ChevronDown size={20} />
              </div>
              <div className="ad-faq-a">{faq.a}</div>
            </li>
          ))}
        </ul>
      </section>

      {/* 7. FOOTER CTA (Reused AppPromoSection) */}
      <AppPromoSection 
        imageSrc={footerPhones}
        customTitle={lang === 'ar' ? 'احصل على الحماية ' : 'Get Protected '}
        customFocus={lang === 'ar' ? 'اليوم!' : 'Today!'}
        customDesc={lang === 'ar' ? 'جرب التطبيق الآن واستكشف مستقبل الأمان الشخصي.' : 'Download the Qlink app and experience the future of personal safety.'}
      />

    </div>
  );
};

export default AppDownload;
