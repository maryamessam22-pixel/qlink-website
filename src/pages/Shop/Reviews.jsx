import React, { useEffect, useContext, useState } from 'react';
import SEO from '../../components/common/SEO';
import { useNavigate } from 'react-router-dom';
import { Quote, Star, MessageSquare, Share2, Users, CheckCircle2 } from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import DynamicBackground from '../../components/common/DynamicBackground';
import AppPromoSection from '../../components/Sections/AppPromoSection';
import mobilesImg from '../../assets/images/mobile3rd.png';
import './Reviews.css';

import heroImg from '../../assets/images/hero.png'; 
import salmaImg from '../../assets/images/salma.png';
import sarahImg from '../../assets/images/sarah.png';
import malakImg from '../../assets/images/malak.png';
import annImg from '../../assets/images/ann.png';

const getAvatarForUser = (name) => {
  if (!name) return heroImg;
  if (name.includes('Salma') || name.includes('سلمى')) return salmaImg;
  if (name.includes('Sarah') || name.includes('سارة')) return sarahImg;
  if (name.includes('Malak') || name.includes('ملاك')) return malakImg;
  if (name.includes('Ann') || name.includes('آن')) return annImg;
  return heroImg; 
};

const Reviews = () => {
  const { t, lang } = useContext(LanguageContext);
  const navigate = useNavigate();

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
      <SEO 
        title={lang === 'ar' ? 'آراء العملاء' : 'Customer Reviews'}
        description={lang === 'ar' ? 'ماذا يقول عملاؤنا عن كيو لينك' : 'What our customers say about Qlink'}
        slug="shop/reviews"
      />
      <DynamicBackground />
      
      <div className="reviews-content-wrapper">
 

        <div className="reviews-header scroll-animate stag-1">
          <h1 className="reviews-title">
            {t('reviews.heroTitleTop')}
            <span style={{ color: '#E03232' }}>{t('reviews.heroTitleHighlight')}</span>
          </h1>
          <p className="reviews-subtitle">{t('reviews.heroSubtitle')}</p>
        </div>

        <div className="featured-story-banner scroll-animate stag-2">
          <div className="featured-image-side">
            <img src={heroImg} alt="User Hero" />
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
        </div>
  
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

       
        <div className="testimonials-grid scroll-animate stag-1">
          {Array.isArray(t('reviews.testimonials', { returnObjects: true })) && 
           t('reviews.testimonials', { returnObjects: true }).map((item) => (
            <div 
              key={item.id} 
              className="testimonial-card"
              onClick={() => navigate(`/shop/reviews/${item.id}`)}
            >
              <div className="card-header">
                <div className="user-info">
                  <div className="user-avatar">
                    <img 
                      src={getAvatarForUser(item.author)} 
                      alt={item.author} 
                      style={{width:'100%', height:'100%', borderRadius:'50%', objectFit: 'cover'}} 
                    />
                  </div>
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
              <div className="read-more-link">
                {lang === 'ar' ? 'اقرأ المزيد >' : 'Read More >'}
              </div>
            </div>
          ))}
        </div>

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

        <div className="reviews-cta-grid scroll-animate stag-3">
          <div className="cta-box share-box">
             <MessageSquare size={32} className="cta-icon" />
             <h3>{t('reviews.shareTitle')}</h3>
             <p>{t('reviews.shareDesc')}</p>
             <button 
               className="cta-btn-primary" 
               onClick={() => navigate('/support/contact')}
             >
               {t('reviews.shareBtn')}
             </button>
          </div>
          <div className="cta-box join-box">
             <Users size={32} className="cta-icon" />
             <h3>{t('reviews.joinTitle')}</h3>
             <p>{t('reviews.joinDesc')}</p>
          </div>
        </div>

      
        <div className="scroll-animate stag-1" style={{ marginTop: '120px', marginBottom: '80px' }}>
          <AppPromoSection 
            imageSrc={mobilesImg} 
            customTitle={t('reviews.promoTitle')} 
            customFocus={t('reviews.promoFocus')} 
            customDesc={t('reviews.promoDesc')} 
          />
        </div>

      </div>
    </div>
  );
};

export default Reviews;