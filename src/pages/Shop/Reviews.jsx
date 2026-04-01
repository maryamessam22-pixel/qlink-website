import React, { useEffect, useContext } from 'react';
import { Quote, Star, MessageSquare, Share2, Users, CheckCircle2 } from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import DynamicBackground from '../../components/common/DynamicBackground';
import AppPromoSection from '../../components/Sections/AppPromoSection';
import mobilesImg from '../../assets/images/2mobiles.png';
import './Reviews.css';

// Featured Images
import userHero from '../../assets/images/1img.png'; 
import productShot from '../../assets/images/watch.png';

const Reviews = () => {
  const { t, lang } = useContext(LanguageContext);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.15, rootMargin: '-50px' });

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`reviews-page-container ${lang === 'ar' ? 'rtl-text' : ''}`}>
      <DynamicBackground />
      
      <div className="reviews-content-wrapper">
        
        {/* Header Section */}
        <div className="reviews-header scroll-animate stag-1">
          <h1 className="reviews-title">
            {t('reviews.heroTitleTop')}
            <span style={{ color: '#ff3b30' }}>{t('reviews.heroTitleHighlight')}</span>
          </h1>
          <p className="reviews-subtitle">{t('reviews.heroSubtitle')}</p>
        </div>

        {/* Featured Story Section */}
        <div className="featured-story-banner scroll-animate stag-2">
          <div className="featured-image-side">
            <img src={userHero} alt="User Hero" />
            <div className="quote-overlay">
              <div className="star-row">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#ffb800" color="#ffb800" />)}
              </div>
              <h2>"{t('reviews.featuredQuote')}"</h2>
              <p>{t('reviews.featuredStory')}</p>
              <div className="author-tag">
                <strong>{t('reviews.featuredAuthor')}</strong>
                <span className="verif"><CheckCircle2 size={14} /> {t('reviews.verified')}</span>
              </div>
            </div>
          </div>
          <div className="secondary-image-side">
            <img src={productShot} alt="Product Close-up" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Reviews;
