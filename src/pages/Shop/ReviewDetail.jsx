import React, { useEffect, useContext, useState } from 'react';
import SEO from '../../components/common/SEO';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ChevronLeft, Star, CheckCircle2,
  Activity, Heart, Clock, MapPin, Users, Settings, Shield, Zap
} from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import DynamicBackground from '../../components/common/DynamicBackground';
import { supabase } from '../../lib/Supabase';
import './ReviewDetail.css';

import salmaImg from '../../assets/images/salma.png';
import malakImg from '../../assets/images/malak.png';
import sarahImg from '../../assets/images/sarah.png';
import annImg from '../../assets/images/ann.png';
import heroImg from '../../assets/images/safaa-rev.png';
import fallbackHero from '../../assets/images/hero.png';

const avatarImages = { 1: heroImg, 2: malakImg, 3: sarahImg, 4: annImg };

const ICON_MAP = { Activity, Heart, Clock, MapPin, Users, Settings, Shield, Star, Zap };

const publicReviewBody = (text) => {
  if (!text || typeof text !== 'string') return '';
  const marker = '\n\n— ';
  const i = text.lastIndexOf(marker);
  if (i === -1) return text.trim();
  return text.slice(0, i).trim();
};

const getAvatarForUser = (name) => {
  if (!name) return fallbackHero;
  if (name.includes('Salma') || name.includes('سلمى')) return salmaImg;
  if (name.includes('Sarah') || name.includes('سارة')) return sarahImg;
  if (name.includes('Malak') || name.includes('ملاك')) return malakImg;
  if (name.includes('Ann') || name.includes('آن')) return annImg;
  return fallbackHero;
};

const ReviewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useContext(LanguageContext);
  const [loading, setLoading] = useState(true);
  const [dbReview, setDbReview] = useState(null);
  const [localeReview, setLocaleReview] = useState(null);

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
  }, [id, dbReview, localeReview]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setDbReview(null);
      setLocaleReview(null);

      const { data: row, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('id', id)
        .eq('is_featured', true)
        .maybeSingle();

      if (cancelled) return;

      if (!error && row) {
        setDbReview(row);
        setLoading(false);
        return;
      }

      const testimonials = t('reviews.testimonials', { returnObjects: true });
      const found = Array.isArray(testimonials)
        ? testimonials.find((r) => String(r.id) === String(id))
        : null;
      setLocaleReview(found || null);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [id, lang]);

  if (loading) {
    return (
      <div className={`rd-page ${lang === 'ar' ? 'rtl-text' : ''}`}>
        <DynamicBackground />
        <div className="rd-not-found" style={{ minHeight: '50vh', paddingTop: '120px' }}>
          <p>{lang === 'ar' ? 'جاري التحميل…' : 'Loading…'}</p>
        </div>
      </div>
    );
  }

  if (!dbReview && !localeReview) {
    return (
      <div className="rd-not-found">
        <DynamicBackground />
        <p>{t('reviews.notFound')}</p>
        <button className="rd-back-btn" onClick={() => navigate('/shop/reviews')}>
          ← {t('reviews.backToReviews')}
        </button>
      </div>
    );
  }

  if (dbReview) {
    const displayQuote = publicReviewBody(dbReview.review_text);
    const paragraphs = displayQuote.split(/\n\n+/).filter(Boolean);
    const avatarSrc = getAvatarForUser(dbReview.customer_name);

    return (
      <div className={`rd-page ${lang === 'ar' ? 'rtl-text' : ''}`}>
        <SEO
          title={
            lang === 'ar'
              ? `تقييم ${dbReview.customer_name}`
              : `${dbReview.customer_name}'s review`
          }
          description={displayQuote.slice(0, 160)}
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
              <img src={avatarSrc} alt={dbReview.customer_name} className="rd-avatar-img" />
            </div>
            <div className="rd-avatar-meta">
              <h2 className="rd-avatar-name">{dbReview.customer_name}</h2>
              {dbReview.customer_subtitle ? (
                <span className="rd-avatar-role">{dbReview.customer_subtitle}</span>
              ) : null}
              <div className="rd-hero-stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={i < dbReview.rating ? '#ffb800' : 'transparent'}
                    color={i < dbReview.rating ? '#ffb800' : 'rgba(255,255,255,0.2)'}
                  />
                ))}
              </div>
            </div>
          </div>
          <blockquote className="rd-hero-big-quote">&ldquo;{paragraphs[0] || displayQuote}&rdquo;</blockquote>
          <p className="rd-verified-tag">
            <CheckCircle2 size={14} /> {t('reviews.verified')}
          </p>
        </div>

        <div className="rd-content">
          {paragraphs.length > 1 && (
            <section className="rd-story-section scroll-animate">
              <div className="rd-story-card">
                <h2 className="rd-section-title">{t('reviews.dbDetailStory')}</h2>
                {paragraphs.slice(1).map((para, i) => (
                  <p key={i} className="rd-story-para">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          )}

          <section className="rd-cta-section scroll-animate">
            <div className="rd-cta-card">
              <h2 className="rd-cta-title">{t('reviews.dbDetailCtaTitle')}</h2>
              <p className="rd-cta-desc">{t('reviews.dbDetailCtaDesc')}</p>
              <div className="rd-cta-buttons">
                <button
                  className="rd-cta-btn rd-cta-btn-primary"
                  type="button"
                  onClick={() => navigate('/shop/bracelet')}
                >
                  {t('reviews.dbDetailCtaBtn')}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  const review = localeReview;
  const avatarSrc = avatarImages[review.id] || heroImg;

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
        <blockquote className="rd-hero-big-quote">&ldquo;{review.quote}&rdquo;</blockquote>
        <p className="rd-verified-tag">
          <CheckCircle2 size={14} /> {t('reviews.verified')}
        </p>
      </div>

      <div className="rd-content">
        <section className="rd-story-section scroll-animate">
          <div className="rd-story-card">
            <h2 className="rd-section-title">{review.storyTitle}</h2>
            {review.storyParagraphs?.map((para, i) => (
              <p key={i} className="rd-story-para">
                {para}
              </p>
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
                type="button"
                onClick={() => navigate('/shop/bracelet')}
              >
                {review.ctaBtn}
              </button>
              {review.ctaBtn2 && (
                <button
                  className="rd-cta-btn rd-cta-btn-secondary"
                  type="button"
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
