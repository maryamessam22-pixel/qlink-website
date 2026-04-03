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

// Avatar images mapped by review id
import salmaImg from '../../assets/images/salma.png';
import malakImg from '../../assets/images/malak.png';
import sarahImg from '../../assets/images/sarah.png';
import annImg   from '../../assets/images/ann.png';
import heroImg  from '../../assets/images/safaa-rev.png';

const avatarImages = { 1: salmaImg, 2: malakImg, 3: sarahImg, 4: annImg };

// Map icon string → Lucide component
const ICON_MAP = { Activity, Heart, Clock, MapPin, Users, Settings, Shield, Star, Zap };

const ReviewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useContext(LanguageContext);

  // Reuse existing IntersectionObserver pattern
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
  const review = testimonials.find((r) => String(r.id) === String(id));

  if (!review) {
    return (
      <div className="rd-not-found">
        <DynamicBackground />
        <p>Review not found.</p>
        <button onClick={() => navigate('/shop/reviews')}>← Back to Reviews</button>
      </div>
    );
  }

  const isImageHero = review.heroType === 'image';
  const avatarSrc   = avatarImages[review.id];

  return (
    <div className={`rd-page ${lang === 'ar' ? 'rtl-text' : ''}`}>
      <SEO 
        title={lang === 'ar' ? `قصة ${review.author}` : `${review.author}'s Story`}
        description={review.quote}
        slug={`shop/reviews/${id}`}
      />
      <DynamicBackground />

      {/* ── BACK LINK ── */}
      <div className="rd-back-container">
        <Link to="/shop/reviews" className="rd-back-btn">
          <ChevronLeft size={16} /> Back to Reviews
        </Link>
      </div>

      {/* ── HERO ── */}
      {isImageHero ? (
        /* Review 1 — full-bleed photo hero */
        <div className="rd-hero-image-wrap">
          <img src={heroImg} alt={review.author} className="rd-hero-bg-img" />
          <div className="rd-hero-image-overlay">
            <div className="rd-hero-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="#ffb800" color="#ffb800" />
              ))}
            </div>
            <h1 className="rd-hero-image-quote">"{review.quote}"</h1>
            <p className="rd-hero-body">{review.storyParagraphs?.[0]}</p>
            <div className="rd-hero-author">
              <strong>{review.author}</strong>
              <span className="rd-verified">
                <CheckCircle2 size={14} /> Verified Purchase
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Reviews 2/3/4 — avatar hero */
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
            <CheckCircle2 size={14} /> Verified Purchase
          </p>
        </div>
      )}

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div className="rd-content">

        {/* Full Story */}
        <section className="rd-story-section scroll-animate">
          <div className="rd-story-card">
            <h2 className="rd-section-title">{review.storyTitle}</h2>
            {review.storyParagraphs?.map((para, i) => (
              <p key={i} className="rd-story-para">{para}</p>
            ))}
          </div>
        </section>

        {/* Numbered List (if any) */}
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

        {/* Feature Icons */}
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

        {/* Big Quote Block */}
        {review.bigQuote && (
          <section className="rd-big-quote-wrap scroll-animate">
            <div className="rd-big-quote-card">
              <p className="rd-big-quote-text">{review.bigQuote}</p>
              <span className="rd-big-quote-author">{review.bigQuoteAuthor}</span>
            </div>
          </section>
        )}

        {/* CTA Section */}
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
