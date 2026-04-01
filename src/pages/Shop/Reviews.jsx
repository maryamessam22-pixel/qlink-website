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

        {/* Stats Bar */}
        <div className="reviews-stats-bar scroll-animate stag-3">
          <div className="stat-card">
            <h3>{t('reviews.statUsers')}</h3>
            <div className="stat-sub">
              <Users size={16} color="#3b82f6" />
              <span>{t('reviews.statUsersLabel')}</span>
            </div>
          </div>
          <div className="stat-card">
            <h3>{t('reviews.statTrust')}</h3>
            <div className="stat-stars">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#ffb800" color="#ffb800" />)}
            </div>
            <div className="stat-sub">
              <span>{t('reviews.statTrustLabel')}</span>
            </div>
          </div>
          <div className="stat-card">
            <h3>{t('reviews.statRecommend')}</h3>
            <div className="stat-sub">
              <Share2 size={16} color="#10b981" />
              <span>{t('reviews.statRecommendLabel')}</span>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid scroll-animate stag-1">
          {t('reviews.testimonials', { returnObjects: true }).map((item) => (
            <div key={item.id} className="testimonial-card">
              <div className="card-header">
                <div className="user-info">
                  <div className="user-avatar">{item.author[0]}</div>
                  <div>
                    <h4>{item.author}</h4>
                    <span>{item.role}</span>
                  </div>
                </div>
                <Quote size={24} className="quote-icon" />
              </div>
              <div className="star-row-small">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    fill={i < item.stars ? "#ffb800" : "transparent"} 
                    color={i < item.stars ? "#ffb800" : "rgba(255,255,255,0.2)"} 
                  />
                ))}
              </div>
              <p className="card-quote">{item.quote}</p>
              <button className="read-more-link">{item.readMore} &gt;</button>
            </div>
          ))}
        </div>

        {/* Detailed Rating Histogram */}
        <div className="rating-breakdown-section scroll-animate stag-2">
          <div className="overall-score-card">
            <h1>{t('reviews.score')}</h1>
            <div className="star-row-medium">
              {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="#ffb800" color="#ffb800" />)}
            </div>
            <p>{t('reviews.basedOn')}</p>
          </div>
          <div className="histogram-list">
            {[92, 5, 2, 1, 0].map((percent, index) => (
              <div key={index} className="histogram-item">
                <span className="star-label">{5 - index} ★</span>
                <div className="progress-bg">
                  <div className="progress-fill" style={{ width: `${percent}%` }}></div>
                </div>
                <span className="percent-label">{percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Sections */}
        <div className="reviews-cta-grid scroll-animate stag-3">
          <div className="cta-box share-box">
             <MessageSquare size={32} className="cta-icon" />
             <h3>{t('reviews.shareTitle')}</h3>
             <p>{t('reviews.shareDesc')}</p>
             <button className="cta-btn-primary">{t('reviews.shareBtn')}</button>
          </div>
          <div className="cta-box join-box">
             <Users size={32} className="cta-icon" />
             <h3>{t('reviews.joinTitle')}</h3>
             <p>{t('reviews.joinDesc')}</p>
          </div>
        </div>

        {/* App Promo */}
        <div className="scroll-animate stag-1" style={{ marginTop: '120px', marginBottom: '80px' }}>
          <AppPromoSection imageSrc={mobilesImg} />
        </div>

      </div>
    </div>
  );
};

export default Reviews;
