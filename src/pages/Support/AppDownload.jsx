import React, { useEffect, useContext, useState, useMemo } from 'react';
import SEO from '../../components/common/SEO';
import { LanguageContext } from '../../context/LanguageContext';
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
import { supabase } from '../../lib/Supabase';
import './AppDownload.css';

import AppPromoSection from '../../components/Sections/AppPromoSection';
import '../../components/Sections/AppPromoSection.css';

import heroPhones from '../../assets/images/mobile2.png';
import no1 from '../../assets/images/no1.png';
import no2 from '../../assets/images/no2.png';
import no3 from '../../assets/images/no3.png';
import no4 from '../../assets/images/no4.png';
import footerPhones from '../../assets/images/new.png';

const APP_FEATURES_SECTION_KEY = 'app_features_page';

const FEATURE_ICONS = [ShieldCheck, Bell, RefreshCw, MapPin, Users, Lock];
const FEATURE_CARD_ORDINALS = ['one', 'two', 'three', 'four', 'five', 'six'];

const AppDownload = () => {
  const { lang, t } = useContext(LanguageContext);
  const [activeFaq, setActiveFaq] = useState(0);
  const [seoData, setSeoData] = useState(null);
  const [appFeaturesCms, setAppFeaturesCms] = useState(null);

  const isArabic = typeof lang === 'string' && lang.toLowerCase().includes('ar');
  const locale = isArabic ? 'ar' : 'en';
  const altLocale = isArabic ? 'en' : 'ar';

  const cmsCardField = (row, ordinal, part) => {
    if (!row) return null;
    const k = `card-${ordinal}-${part}-${locale}`;
    let v = row[k];
    if (v == null || String(v).trim() === '') {
      const fallbackKey = `card-${ordinal}-${part}-${altLocale}`;
      v = row[fallbackKey];
    }
    return v != null && String(v).trim() !== '' ? String(v).trim() : null;
  };

  const pickCmsTitleSubtitle = (row, field, fallback) => {
    if (!row) return fallback;
    const en = row[`${field}_en`];
    const ar = row[`${field}_ar`];
    const primary = locale === 'ar' ? ar : en;
    const secondary = locale === 'ar' ? en : ar;
    if (primary != null && String(primary).trim() !== '') return String(primary).trim();
    if (secondary != null && String(secondary).trim() !== '') return String(secondary).trim();
    return fallback;
  };

  useEffect(() => {
    const fetchSeo = async () => {
      try {
        const { data, error } = await supabase
          .from('seo')
          .select('*')
          .eq('slug', 'app-download')
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Supabase AppDownload SEO fetch error:', error);
        } else if (data) {
          console.log("SEO DATA GAT YAAAAY (AppDownload): ", data);
          setSeoData(data);
        }
      } catch (err) {
        console.error('Unexpected error fetching AppDownload SEO:', err);
      }
    };

    fetchSeo();
  }, []);

  useEffect(() => {
    const fetchAppFeaturesCms = async () => {
      try {
        const { data, error } = await supabase
          .from('cms_content')
          .select('*')
          .eq('section_key', APP_FEATURES_SECTION_KEY)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          console.error('Supabase app_features_page cms_content:', error);
        } else if (data) {
          setAppFeaturesCms(data);
        }
      } catch (err) {
        console.error('Unexpected error fetching app_features_page:', err);
      }
    };

    fetchAppFeaturesCms();
  }, []);

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

  const featureFallbacks = useMemo(
    () => [
      { title: isArabic ? 'ملفات آمنة' : 'Secure Profiles', desc: isArabic ? 'تشفير بياناتك الطبية والشخصية.' : 'End-to-end encryption for your medical and personal data.' },
      { title: isArabic ? 'تنبيهات فورية' : 'Instant Alerts', desc: isArabic ? 'إشعارات لحظية لجهات اتصال الطوارئ.' : 'Instant notifications for emergency contacts on events.' },
      { title: isArabic ? 'مزامنة مباشرة' : 'Real-Time Sync', desc: isArabic ? 'تحديث المعلومات عبر جميع الأجهزة فورياً.' : 'Update information across all connected devices instantly.' },
      { title: isArabic ? 'تتبع الموقع' : 'Location Tracking', desc: isArabic ? 'مشاركة موقعك بدقة مع خدمات الطوارئ.' : 'Share your precise location with emergency services.' },
      { title: isArabic ? 'مشاركة عائلية' : 'Family Sharing', desc: isArabic ? 'إدارة ملفات أفراد العائلة من حساب واحد.' : 'Manage family member profiles from a single dashboard.' },
      { title: isArabic ? 'ضوابط الخصوصية' : 'Privacy Controls', desc: isArabic ? 'تحكم كامل في من يرى بياناتك ومتى.' : 'Full control over who sees your data and when.' },
    ],
    [isArabic]
  );

  const features = useMemo(
    () =>
      FEATURE_CARD_ORDINALS.map((ordinal, i) => {
        const title = cmsCardField(appFeaturesCms, ordinal, 'title');
        const desc = cmsCardField(appFeaturesCms, ordinal, 'desc');
        const fb = featureFallbacks[i];
        return {
          icon: FEATURE_ICONS[i],
          title: title || fb.title,
          desc: desc || fb.desc,
        };
      }),
    [appFeaturesCms, locale, featureFallbacks]
  );

  const appFeaturesBadge = pickCmsTitleSubtitle(
    appFeaturesCms,
    'title',
    isArabic ? 'تنزيل التطبيق' : 'DOWNLOAD APP'
  );
  const appFeaturesHeading = pickCmsTitleSubtitle(
    appFeaturesCms,
    'subtitle',
    isArabic ? 'مميزات التطبيق' : 'App Features'
  );

  const faqs = [
    { q: isArabic ? 'هل التطبيق مجاني؟' : 'Is the app free?', a: isArabic ? 'نعم، كيو لينك مجاني تماماً للتحميل والاستخدام الأساسي.' : 'Yes, Qlink is completely free to download and for basic essential features.' },
    { q: isArabic ? 'هل يعمل على أندرويد وآيفون؟' : 'Does it work on Android and iOS?', a: isArabic ? 'نعم، التطبيق متاح في كل من App Store و Google Play.' : 'Yes, the app is available on both the App Store and Google Play.' },
    { q: isArabic ? 'هل يمكنني إدارة أساور متعددة؟' : 'Can I manage multiple bracelets?', a: isArabic ? 'نعم، يمكنك توصيل وإدارة أساور متعددة لنفسك أو لعائلتك.' : 'Yes, you can connect and manage multiple bracelets for yourself or your family.' }
  ];

  return (
    <div className={`app-download-page ${isArabic ? 'rtl-text' : ''}`}>
      <SEO 
        title={
          seoData 
            ? (isArabic ? seoData.title_ar : seoData.title_en) 
            : (isArabic ? 'تنزيل التطبيق' : 'Download App')
        }
        description={
          seoData 
            ? (isArabic ? seoData.description_ar : seoData.description_en) 
            : (isArabic ? 'خذ أمانك معك في كل مكان مع تطبيق كيو لينك للهاتف المحمول.' : 'Take your safety with you everywhere with the Qlink mobile app.')
        }
        slug={seoData ? seoData.slug : "app-download"}
      />
      <section className="ad-hero-wrapper scroll-animate">
        <div className="ad-hero-container">
          <div className="ad-hero-content">
            <h1>{isArabic ? 'أمانك في ' : 'Your Safety, '}<span>{isArabic ? 'جيبك' : 'Pocket-Sized'}</span></h1>
            <p>{isArabic ? 'يتيح لك تطبيق كيو لينك إدارة معلوماتك الطبية ومعلومات الطوارئ أينما كنت. حافظ على تحكمك في ملفك الشخصي في جميع الأوقات.' : 'The Qlink app allows you to manage your personal and emergency information securely. Update details, control privacy, and manage your devices – all from one place.'}</p>
            
            <ul className="ad-hero-list">
              <li><ShieldCheck size={20} className="check-icon" /> {isArabic ? 'إدارة الطوارئ والمعلومات الشخصية' : 'Manage emergency and personal information'}</li>
              <li><ShieldCheck size={20} className="check-icon" /> {isArabic ? 'التحكم بالخصوصية ومشاركة البيانات' : 'Control privacy and data sharing'}</li>
              <li><ShieldCheck size={20} className="check-icon" /> {isArabic ? 'مراقبة وتحديث الملفات الشخصية في أي وقت' : 'Monitor and update profiles anytime'}</li>
            </ul>

            <div className="ad-hero-buttons">
               <button className="promo-app-btn">
                 <Apple size={24} />
                 <div className="btn-text" style={isArabic ? { textAlign: 'right' } : {}}>
                   <span>{t('appSection.appStore') || 'Download on the'}</span>
                   <strong>{t('appSection.appStoreTitle') || 'App Store'}</strong>
                 </div>
               </button>
               <button className="promo-app-btn" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>
                 <Play size={24}  color="#ffffffff" />
                 <div className="btn-text" style={isArabic ? { textAlign: 'right' } : {}}>
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

      <section className="ad-features-section scroll-animate">
        <div className="ad-section-badge">{appFeaturesBadge}</div>
        <h2 className="ad-section-title">{appFeaturesHeading}</h2>
        
        <div className="ad-features-grid">
          {features.map((f, i) => (
            <div key={i} className="ad-feature-card">
              <div className="ad-f-icon"><f.icon size={24} color="currentColor" /></div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ad-setup-section scroll-animate">
        <div className="ad-section-badge">{isArabic ? 'كيف يعمل' : 'HOW IT WORKS'}</div>
        <h2 className="ad-section-title">{isArabic ? 'إعداد بسيط' : 'Simple Setup'}</h2>
        
        <div className="ad-setup-timeline">
          <div className="setup-step">
            <div className="step-number">01</div>
            <h3>{isArabic ? 'تحميل التطبيق' : 'Download App'}</h3>
            <p>{isArabic ? 'ابحث عن كيو لينك في متجر التطبيقات.' : 'Get Qlink from App Store or Google Play.'}</p>
          </div>
          <div className="setup-step">
            <div className="step-number">02</div>
            <h3>{isArabic ? 'إنشاء ملف' : 'Create Profile'}</h3>
            <p>{isArabic ? 'أدخل بياناتك وجهات اتصالك.' : 'Enter your medical data and emergency contacts.'}</p>
          </div>
          <div className="setup-step">
            <div className="step-number">03</div>
            <h3>{isArabic ? 'ربط الجهاز' : 'Link Device'}</h3>
            <p>{isArabic ? 'أضف سوارك بمسحة واحدة.' : 'Add your bracelet or tag into the dashboard.'}</p>
          </div>
        </div>
      </section>

      <section className="ad-gallery-section scroll-animate">
        <div className="ad-gallery-grid">
          {[
            { img: no1, title: isArabic ? 'نمط حياة' : 'Lifestyle' },
            { img: no2, title: isArabic ? 'تحكم كامل' : 'Total Control' },
            { img: no3, title: isArabic ? 'أمانك أولاً' : 'Safety First' },
            { img: no4, title: isArabic ? 'بيانات دقيقة' : 'Deep Insight' }
          ].map((item, i) => (
            <div key={i} className="ad-gallery-item">
              <img src={item.img} alt={`Gallery ${i+1}`} />
              <div className="ad-gallery-overlay">
                <h3>{item.title}</h3>
                <span>{isArabic ? 'عرض الواجهة' : 'View Interface'}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ad-encrypted-banner scroll-animate">
        <div className="ad-enc-content">
          <div className="ad-shield-icon"><Lock size={40} color="#10B981" /></div>
          <h2>{isArabic ? 'المعلومات مشفرة بالكامل' : 'Your Data is Encrypted'}</h2>
          <p>{isArabic ? 'نستخدم تشفير AES-256 لضمان حماية بياناتك الطبية بأعلى المعايير الأمنية العالمية.' : 'We use AES-256 encryption to ensure your personal health information is always secured. Only you have control over your data access and share.'}</p>
        </div>
      </section>

      <section className="ad-faq-section scroll-animate">
        <div className="ad-section-badge">{isArabic ? 'قوة الأمان' : 'POWER YOUR SAFETY'}</div>
        <h2 className="ad-section-title">{isArabic ? 'الأسئلة الشائعة' : 'App FAQ'}</h2>
        
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

      <AppPromoSection 
        imageSrc={footerPhones}
        customTitle={isArabic ? 'احصل على الحماية ' : 'Get Protected '}
        customFocus={isArabic ? 'اليوم!' : 'Today!'}
        customDesc={isArabic ? 'جرب التطبيق الآن واستكشف مستقبل الأمان الشخصي.' : 'Download the Qlink app and experience the future of personal safety.'}
      />

    </div>
  );
};

export default AppDownload;