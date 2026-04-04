import React, { useEffect, useContext, useState } from 'react';
import SEO from '../../components/common/SEO';
import { useNavigate } from 'react-router-dom';
import { Quote, Star, MessageSquare, Share2, Users, CheckCircle2 } from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import DynamicBackground from '../../components/common/DynamicBackground';
import AppPromoSection from '../../components/Sections/AppPromoSection';
import { supabase } from '../../lib/Supabase'; 
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

  const [seoData, setSeoData] = useState(null);
  const [reviewsList, setReviewsList] = useState([]);
  const [featuredStory, setFeaturedStory] = useState(null);

  useEffect(() => {
    const fetchReviewsData = async () => {
      try {
 
        const { data: seo } = await supabase
          .from('seo')
          .select('*')
          .eq('slug', 'shop/reviews')
          .single();
        if (seo) setSeoData(seo);

    
        const { data: reviews } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false }); 
        if (reviews) setReviewsList(reviews);

        const { data: cms } = await supabase
          .from('cms_content')
          .select('*')
          .eq('section_key', 'reviews_featured')
          .single();
        if (cms) setFeaturedStory(cms);

      } catch (err) {
        console.error("Error fetching reviews data:", err);
      }
    };

    fetchReviewsData();
  }, []);

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
  }, [reviewsList, featuredStory]); 

  return (
    <div className={`reviews-page-container ${lang === 'ar' ? 'rtl-text' : ''}`}>
      <SEO 
        title={seoData ? (lang === 'ar' ? seoData.title_ar : seoData.title_en) : (lang === 'ar' ? 'آراء العملاء' : 'Customer Reviews')}
        description={seoData ? (lang === 'ar' ? seoData.description_ar : seoData.description_en) : ''}
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
              
     
              <h2>"{featuredStory ? (lang === 'ar' ? featuredStory.title_ar : featuredStory.title_en) : t('reviews.featuredQuote')}"</h2>
              
        
              <p>{featuredStory ? (lang === 'ar' ? featuredStory.content_ar : featuredStory.content_en) : t('reviews.featuredStory')}</p>
              
              <div className="author-tag">
             
                <strong>{featuredStory ? (lang === 'ar' ? featuredStory.subtitle_ar : featuredStory.subtitle_en) : t('reviews.featuredAuthor')}</strong>
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
          {reviewsList.map((item) => (
            <div key={item.id} className="testimonial-card">
              <div className="card-header">
                <div className="user-info">
                  <div className="user-avatar">
                    <img 
                      src={getAvatarForUser(item.customer_name)} 
                      alt={item.customer_name} 
                      style={{width:'100%', height:'100%', borderRadius:'50%', objectFit: 'cover'}} 
                    />
                  </div>
                  <div>
                    <h4>{item.customer_name}</h4>
                    <span>{item.customer_subtitle}</span>
                  </div>
                </div>
                <Quote size={24} className="quote-icon" />
              </div>
              <div className="star-row-small">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    fill={i < item.rating ? "#ffb800" : "transparent"} 
                    color={i < item.rating ? "#ffb800" : "rgba(255,255,255,0.2)"} 
                  />
                ))}
              </div>
              <p className="card-quote">{item.review_text}</p>
              <button
                className="read-more-link"
                onClick={() => navigate(`/shop/reviews/${item.id}`)}
              >
                {lang === 'ar' ? 'اقرأ المزيد >' : 'Read More >'}
              </button>
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
             <button className="cta-btn-primary">{t('reviews.shareBtn')}</button>
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