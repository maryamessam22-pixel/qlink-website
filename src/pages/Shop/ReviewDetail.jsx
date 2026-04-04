import React, { useEffect, useContext } from 'react';
import SEO from '../../components/common/SEO';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ChevronLeft, Star, CheckCircle2,
  Activity, Heart, Clock, MapPin, Users, Settings, Shield, Zap
} from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import DynamicBackground from '../../components/common/DynamicBackground';
import './ReviewDetail.css';


import salmaImg from '../../assets/images/salma.png';
import malakImg from '../../assets/images/malak.png';
import sarahImg from '../../assets/images/sarah.png';
import annImg   from '../../assets/images/ann.png';
import heroImg  from '../../assets/images/safaa-rev.png';

const avatarImages = { 1: heroImg, 2: malakImg, 3: sarahImg, 4: annImg };


const ICON_MAP = { Activity, Heart, Clock, MapPin, Users, Settings, Shield, Star, Zap };

const ReviewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useContext(LanguageContext);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );
    const els = document.querySelectorAll('.scroll-animate');
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [id]);

  const testimonials = t('reviews.testimonials', { returnObjects: true });
  const review = Array.isArray(testimonials) ? testimonials.find((r) => String(r.id) === String(id)) : null;

  if (!review) {
    return (
      <div className="rd-not-found">
        <DynamicBackground />
        <p>{t('reviews.notFound')}</p>
        <button className="rd-back-btn" onClick={() => navigate('/shop/reviews')}>← {t('reviews.backToReviews')}</button>
      </div>
    );
  }

  const avatarSrc   = avatarImages[review.id] || heroImg;

  return (
    <div className={`rd-page ${lang === 'ar' ? 'rtl-text' : ''}`}>
      <SEO 
        title={lang === 'ar' ? `قصة ${review.author}` : `${review.author}'s Story`}
        description={review.quote}
        slug={`shop/reviews/${id}`}
      />
      <DynamicBackground />

      
      <div className="rd-back-container">
        <Link to="/shop/reviews" className="rd-back-btn">
          <ChevronLeft size={16} /> {t('reviews.backToReviews')}
        </Link>
      </div>

      
      <div className="rd-hero-avatar-wrap scroll-animate">
        <div className="rd-hero-avatar-row">
          <div className="rd-avatar-img-wrap">
            <img src={avatarSrc} alt={review.author} className="rd-avatar-img" />
          </div>
          <div className="rd-avatar-meta">
            <h2 className="rd-avatar-name">{review.author}</h2>
            <span className="rd-avatar-role">{review.role}</span>
            <div className="rd-hero-stars">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < review.stars ? '#ffb800' : 'transparent'}
                  color={i < review.stars ? '#ffb800' : 'rgba(255,255,255,0.2)'}
                />
              ))}
            </div>
          </div>
        </div>
        <blockquote className="rd-hero-big-quote">"{review.quote}"</blockquote>
        <p className="rd-verified-tag">
          <CheckCircle2 size={14} /> {t('reviews.verified')}
        </p>
      </div>

      
      <div className="rd-content">

        
        <section className="rd-story-section scroll-animate">
          <div className="rd-story-card">
            <h2 className="rd-section-title">{review.storyTitle}</h2>
            {review.storyParagraphs?.map((para, i) => (
              <p key={i} className="rd-story-para">{para}</p>
            ))}
          </div>
        </section>

        
        {review.listItems && (
          <section className="rd-list-section scroll-animate">
            <div className="rd-list-card">
              <h2 className="rd-section-title">{review.listTitle}</h2>
              <ol className="rd-numbered-list">
                {review.listItems.map((item, i) => (
                  <li key={i} className="rd-list-item">
                    <div className="rd-list-num">{i + 1}</div>
                    <div className="rd-list-text">
                      <strong>{item.title}</strong>
                      <p>{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        
        {review.features && (
          <section className="rd-features-row scroll-animate">
            {review.features.map((feat, i) => {
              const IconComp = ICON_MAP[feat.icon] || Activity;
              return (
                <div key={i} className="rd-feat-card">
                  <div className="rd-feat-icon">
                    <IconComp size={24} />
                  </div>
                  <strong className="rd-feat-label">{feat.label}</strong>
                  <p className="rd-feat-sub">{feat.sub}</p>
                </div>
              );
            })}
          </section>
        )}

        
        {review.bigQuote && (
          <section className="rd-big-quote-wrap scroll-animate">
            <div className="rd-big-quote-card">
              <p className="rd-big-quote-text">{review.bigQuote}</p>
              <span className="rd-big-quote-author">{review.bigQuoteAuthor}</span>
            </div>
          </section>
        )}

        
        <section className="rd-cta-section scroll-animate">
          <div className="rd-cta-card">
            <h2 className="rd-cta-title">{review.ctaTitle}</h2>
            <p className="rd-cta-desc">{review.ctaDesc}</p>
            <div className="rd-cta-buttons">
              <button
                className="rd-cta-btn rd-cta-btn-primary"
                onClick={() => navigate('/shop/bracelet')}
              >
                {review.ctaBtn}
              </button>
              {review.ctaBtn2 && (
                <button
                  className="rd-cta-btn rd-cta-btn-secondary"
                  onClick={() => navigate('/shop/bracelet')}
                >
                  {review.ctaBtn2}
                </button>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ReviewDetail;
