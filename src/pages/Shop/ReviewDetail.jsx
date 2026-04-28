import React, { useEffect, useContext, useState } from 'react';
import SEO from '../../components/common/SEO';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ChevronLeft, Star, CheckCircle2,
  Activity, Heart, Clock, MapPin, Users, Settings, Shield, Zap
} from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import { supabase } from '../../lib/Supabase';
import {
  pickCustomerName,
  pickCustomerSubtitle,
  pickReviewSnippetRaw,
  pickReviewTitle,
  pickReviewDescription,
  publicReviewBody,
  splitReviewParagraphs,
} from '../../utils/reviewText';
import { getInlineLangAttr, getInlineTextDir } from '../../utils/textDirection';
import './ReviewDetail.css';

import salmaImg from '../../assets/images/salma.png';
import malakImg from '../../assets/images/malak.png';
import sarahImg from '../../assets/images/sarah.png';
import annImg from '../../assets/images/ann.png';
import heroImg from '../../assets/images/safaa-rev.png';
import fallbackHero from '../../assets/images/hero.png';

const avatarImages = { 1: heroImg, 2: malakImg, 3: sarahImg, 4: annImg };

const ICON_MAP = { Activity, Heart, Clock, MapPin, Users, Settings, Shield, Star, Zap };

const getAvatarForUser = (name) => {
  if (!name) return fallbackHero;
  const n = String(name);
  if (name.includes('Salma') || n.includes('سلمى')) return salmaImg;
  if (name.includes('Sarah') || n.includes('سارة')) return sarahImg;
  if (name.includes('Malak') || n.includes('ملاك') || n.includes('ملك')) return malakImg;
  if (name.includes('Ann') || n.includes('آن') || n.includes('ان مازن')) return annImg;
  return fallbackHero;
};

const ReviewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useContext(LanguageContext);
  const reviewsListPath = lang === 'ar' ? '/تسوق/التقييمات' : '/shop/reviews';
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
        .eq('is_visible', true)
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
        <div className="rd-not-found" style={{ minHeight: '50vh', paddingTop: '120px' }}>
          <p>{lang === 'ar' ? 'جاري التحميل…' : 'Loading…'}</p>
        </div>
      </div>
    );
  }

  if (!dbReview && !localeReview) {
    return (
      <div className="rd-not-found">
        <p>{t('reviews.notFound')}</p>
        <button className="rd-back-btn" onClick={() => navigate(reviewsListPath)}>
          ← {t('reviews.backToReviews')}
        </button>
      </div>
    );
  }

  if (dbReview) {
    const customerNameDisplay = pickCustomerName(dbReview, lang);
    const customerSubtitleDisplay = pickCustomerSubtitle(dbReview, lang);
    const avatarLookup = [
      dbReview.customer_name,
      dbReview.customer_name_ar,
    ]
      .filter(Boolean)
      .join(' ');
    const displayQuote = publicReviewBody(
      pickReviewSnippetRaw(dbReview, lang)
    );
    const paragraphs = splitReviewParagraphs(displayQuote);
    const avatarSrc = getAvatarForUser(avatarLookup);
    const storyTitle = pickReviewTitle(dbReview, lang);
    const storyDescription = pickReviewDescription(dbReview, lang);
    const descParagraphs = storyDescription
      ? splitReviewParagraphs(storyDescription)
      : [];
    const hasCmsStory = Boolean(storyTitle || descParagraphs.length);
    const seoDesc = (storyDescription || displayQuote).slice(0, 160);

    return (
      <div className={`rd-page ${lang === 'ar' ? 'rtl-text' : ''}`}>
        <SEO
          title={
            storyTitle
              ? `${storyTitle} — ${customerNameDisplay}`
              : lang === 'ar'
                ? `تقييم ${customerNameDisplay}`
                : `${customerNameDisplay}'s review`
          }
          description={seoDesc}
          slug={`shop/reviews/${id}`}
        />

        <div className="rd-back-container">
          <Link to={reviewsListPath} className="rd-back-btn">
            <ChevronLeft size={16} /> {t('reviews.backToReviews')}
          </Link>
        </div>

        <div className="rd-hero-avatar-wrap scroll-animate">
          <div className="rd-hero-avatar-row">
            <div className="rd-avatar-img-wrap">
              <img src={avatarSrc} alt={customerNameDisplay} className="rd-avatar-img" />
            </div>
            <div className="rd-avatar-meta">
              <h2
                className="rd-avatar-name"
                dir={getInlineTextDir(customerNameDisplay)}
                lang={getInlineLangAttr(customerNameDisplay)}
              >
                {customerNameDisplay}
              </h2>
              {customerSubtitleDisplay ? (
                <span
                  className="rd-avatar-role"
                  dir={getInlineTextDir(customerSubtitleDisplay)}
                  lang={getInlineLangAttr(customerSubtitleDisplay)}
                >
                  {customerSubtitleDisplay}
                </span>
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
          <blockquote
            className="rd-hero-big-quote"
            dir={getInlineTextDir(paragraphs[0] || displayQuote)}
            lang={getInlineLangAttr(paragraphs[0] || displayQuote)}
          >
            &ldquo;{paragraphs[0] || displayQuote}&rdquo;
          </blockquote>
          <p className="rd-verified-tag">
            <CheckCircle2 size={14} /> {t('reviews.verified')}
          </p>
        </div>

        <div className="rd-content">
          {hasCmsStory && (
            <section className="rd-story-section scroll-animate">
              <div className="rd-story-card">
                {storyTitle ? (
                  <h2
                    className="rd-section-title"
                    dir={getInlineTextDir(storyTitle)}
                    lang={getInlineLangAttr(storyTitle)}
                  >
                    {storyTitle}
                  </h2>
                ) : (
                  <h2 className="rd-section-title">{t('reviews.dbDetailStory')}</h2>
                )}
                {descParagraphs.map((para, i) => (
                  <p
                    key={i}
                    className="rd-story-para"
                    dir={getInlineTextDir(para)}
                    lang={getInlineLangAttr(para)}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </section>
          )}

          {!hasCmsStory && paragraphs.length > 1 && (
            <section className="rd-story-section scroll-animate">
              <div className="rd-story-card">
                <h2 className="rd-section-title">{t('reviews.dbDetailStory')}</h2>
                {paragraphs.slice(1).map((para, i) => (
                  <p
                    key={i}
                    className="rd-story-para"
                    dir={getInlineTextDir(para)}
                    lang={getInlineLangAttr(para)}
                  >
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

      <div className="rd-back-container">
        <Link to={reviewsListPath} className="rd-back-btn">
          <ChevronLeft size={16} /> {t('reviews.backToReviews')}
        </Link>
      </div>

      <div className="rd-hero-avatar-wrap scroll-animate">
        <div className="rd-hero-avatar-row">
          <div className="rd-avatar-img-wrap">
            <img src={avatarSrc} alt={review.author} className="rd-avatar-img" />
          </div>
          <div className="rd-avatar-meta">
            <h2
              className="rd-avatar-name"
              dir={getInlineTextDir(review.author)}
              lang={getInlineLangAttr(review.author)}
            >
              {review.author}
            </h2>
            <span
              className="rd-avatar-role"
              dir={getInlineTextDir(review.role)}
              lang={getInlineLangAttr(review.role)}
            >
              {review.role}
            </span>
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
        <blockquote
          className="rd-hero-big-quote"
          dir={getInlineTextDir(review.quote)}
          lang={getInlineLangAttr(review.quote)}
        >
          &ldquo;{review.quote}&rdquo;
        </blockquote>
        <p className="rd-verified-tag">
          <CheckCircle2 size={14} /> {t('reviews.verified')}
        </p>
      </div>

      <div className="rd-content">
        <section className="rd-story-section scroll-animate">
          <div className="rd-story-card">
            <h2
              className="rd-section-title"
              dir={getInlineTextDir(review.storyTitle)}
              lang={getInlineLangAttr(review.storyTitle)}
            >
              {review.storyTitle}
            </h2>
            {review.storyParagraphs?.map((para, i) => (
              <p
                key={i}
                className="rd-story-para"
                dir={getInlineTextDir(para)}
                lang={getInlineLangAttr(para)}
              >
                {para}
              </p>
            ))}
          </div>
        </section>

        {review.listItems && (
          <section className="rd-list-section scroll-animate">
            <div className="rd-list-card">
              <h2
                className="rd-section-title"
                dir={getInlineTextDir(review.listTitle)}
                lang={getInlineLangAttr(review.listTitle)}
              >
                {review.listTitle}
              </h2>
              <ol className="rd-numbered-list">
                {review.listItems.map((item, i) => (
                  <li key={i} className="rd-list-item">
                    <div className="rd-list-num">{i + 1}</div>
                    <div className="rd-list-text">
                      <strong dir={getInlineTextDir(item.title)} lang={getInlineLangAttr(item.title)}>
                        {item.title}
                      </strong>
                      <p dir={getInlineTextDir(item.desc)} lang={getInlineLangAttr(item.desc)}>
                        {item.desc}
                      </p>
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
                  <strong
                    className="rd-feat-label"
                    dir={getInlineTextDir(feat.label)}
                    lang={getInlineLangAttr(feat.label)}
                  >
                    {feat.label}
                  </strong>
                  <p
                    className="rd-feat-sub"
                    dir={getInlineTextDir(feat.sub)}
                    lang={getInlineLangAttr(feat.sub)}
                  >
                    {feat.sub}
                  </p>
                </div>
              );
            })}
          </section>
        )}

        {review.bigQuote && (
          <section className="rd-big-quote-wrap scroll-animate">
            <div className="rd-big-quote-card">
              <p
                className="rd-big-quote-text"
                dir={getInlineTextDir(review.bigQuote)}
                lang={getInlineLangAttr(review.bigQuote)}
              >
                {review.bigQuote}
              </p>
              <span
                className="rd-big-quote-author"
                dir={getInlineTextDir(review.bigQuoteAuthor)}
                lang={getInlineLangAttr(review.bigQuoteAuthor)}
              >
                {review.bigQuoteAuthor}
              </span>
            </div>
          </section>
        )}

        <section className="rd-cta-section scroll-animate">
          <div className="rd-cta-card">
            <h2
              className="rd-cta-title"
              dir={getInlineTextDir(review.ctaTitle)}
              lang={getInlineLangAttr(review.ctaTitle)}
            >
              {review.ctaTitle}
            </h2>
            <p
              className="rd-cta-desc"
              dir={getInlineTextDir(review.ctaDesc)}
              lang={getInlineLangAttr(review.ctaDesc)}
            >
              {review.ctaDesc}
            </p>
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
