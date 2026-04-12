import React, { useEffect, useContext, useState, useCallback } from 'react';
import SEO from '../../components/common/SEO';
import { useNavigate } from 'react-router-dom';
import { Quote, Star, MessageSquare, Share2, Users, CheckCircle2, PenLine } from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
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

/** Strip internal email footnote we append on submit (`\n\n— email`). */
const publicReviewBody = (text) => {
  if (!text || typeof text !== 'string') return '';
  const marker = '\n\n— ';
  const i = text.lastIndexOf(marker);
  if (i === -1) return text.trim();
  return text.slice(0, i).trim();
};

const Reviews = () => {
  const { t, lang } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [addReviewCms, setAddReviewCms] = useState(null);
  const [publicReviews, setPublicReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    subtitle: '',
    email: '',
    rating: 5,
    message: '',
  });
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewError, setReviewError] = useState('');

  const pickCms = useCallback(
    (row, field) => {
      if (!row) return null;
      const v = lang === 'ar' ? row[`${field}_ar`] : row[`${field}_en`];
      return v != null && String(v).trim() !== '' ? v : null;
    },
    [lang]
  );

  const extraLabel = useCallback(
    (baseKey) => {
      const ex = addReviewCms?.extra_data;
      if (!ex || typeof ex !== 'object') return null;
      const suffix = lang === 'ar' ? 'ar' : 'en';
      const v = ex[`${baseKey}_${suffix}`];
      return v != null && String(v).trim() !== '' ? v : null;
    },
    [addReviewCms, lang]
  );

  useEffect(() => {
    const fetchAddReviewCms = async () => {
      try {
        const { data, error } = await supabase
          .from('cms_content')
          .select('*')
          .eq('section_key', 'reviews_add_review')
          .maybeSingle();
        if (error) {
          console.error('cms_content reviews_add_review:', error);
          return;
        }
        if (data) setAddReviewCms(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchAddReviewCms();
  }, [lang]);

  useEffect(() => {
    const loadFeaturedReviews = async () => {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('id, customer_name, customer_subtitle, rating, review_text, created_at')
          .eq('is_visible', true)
          .eq('is_featured', true)
          .order('created_at', { ascending: false });

        if (!error && Array.isArray(data) && data.length > 0) {
          setPublicReviews(
            data.map((row) => ({
              id: row.id,
              author: row.customer_name,
              role: row.customer_subtitle ?? '',
              stars: row.rating,
              quote: publicReviewBody(row.review_text),
            }))
          );
          return;
        }
      } catch (e) {
        console.error(e);
      }
      const fallback = t('reviews.testimonials', { returnObjects: true });
      setPublicReviews(Array.isArray(fallback) ? fallback : []);
    };
    loadFeaturedReviews();
  }, [lang]);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewError('');
    setReviewSuccess(false);
    const name = reviewForm.name.trim();
    const message = reviewForm.message.trim();
    if (!name || !message) {
      setReviewError(lang === 'ar' ? 'الرجاء إدخال الاسم والتقييم.' : 'Please enter your name and review.');
      return;
    }
    setReviewSubmitting(true);
    try {
      const rating = Math.min(5, Math.max(1, Number(reviewForm.rating) || 5));
      const subtitle = (reviewForm.subtitle || '').trim();
      const email = (reviewForm.email || '').trim();
      const customerSubtitle =
        subtitle || (lang === 'ar' ? 'عميل' : 'Customer');
      const reviewBody = email ? `${message}\n\n— ${email}` : message;

      const { error } = await supabase.from('reviews').insert([
        {
          id: crypto.randomUUID(),
          customer_name: name,
          customer_subtitle: customerSubtitle,
          rating,
          review_text: reviewBody,
          is_featured: false,
          is_visible: false,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error(error);
        setReviewError(t('reviews.addReviewError'));
        return;
      }
      setReviewSuccess(true);
      setReviewForm({ name: '', subtitle: '', email: '', rating: 5, message: '' });
    } catch (err) {
      console.error(err);
      setReviewError(t('reviews.addReviewError'));
    } finally {
      setReviewSubmitting(false);
    }
  };

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
  }, [publicReviews]);

  return (
    <div className={`reviews-page-container ${lang === 'ar' ? 'rtl-text' : ''}`}>
      <SEO 
        title={lang === 'ar' ? 'آراء العملاء' : 'Customer Reviews'}
        description={lang === 'ar' ? 'ماذا يقول عملاؤنا عن كيو لينك' : 'What our customers say about Qlink'}
        slug="shop/reviews"
      />
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
          {publicReviews.map((item) => (
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
                    {item.role ? <span>{item.role}</span> : null}
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

        <section
          className={`add-review-section scroll-animate stag-2 ${lang === 'ar' ? 'rtl-text' : ''}`}
          aria-labelledby="add-review-heading"
        >
          <div className="add-review-card">
            <div className="add-review-card-head">
              <div className="add-review-icon-wrap">
                <PenLine size={22} strokeWidth={2} />
              </div>
              <div>
                <h2 id="add-review-heading" className="add-review-title">
                  {pickCms(addReviewCms, 'title') || t('reviews.addReviewTitle')}
                </h2>
                <p className="add-review-lead">
                  {pickCms(addReviewCms, 'subtitle') || t('reviews.addReviewSubtitle')}
                </p>
              </div>
            </div>

            {pickCms(addReviewCms, 'content') && (
              <div
                className="add-review-cms-html"
                dangerouslySetInnerHTML={{ __html: pickCms(addReviewCms, 'content') }}
              />
            )}

            {reviewSuccess && (
              <div className="add-review-banner add-review-banner--success" role="status">
                {t('reviews.addReviewSuccess')}
              </div>
            )}
            {reviewError && (
              <div className="add-review-banner add-review-banner--error" role="alert">
                {reviewError}
              </div>
            )}

            <form className="add-review-form" onSubmit={handleReviewSubmit} noValidate>
              <div className="add-review-field">
                <label htmlFor="review-name">{extraLabel('name_label') || t('reviews.addReviewName')}</label>
                <input
                  id="review-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={reviewForm.name}
                  onChange={handleReviewChange}
                  placeholder={extraLabel('name_placeholder') || t('reviews.addReviewName')}
                  disabled={reviewSubmitting}
                  required
                />
              </div>
              <div className="add-review-field">
                <label htmlFor="review-subtitle">{extraLabel('role_label') || t('reviews.addReviewRole')}</label>
                <input
                  id="review-subtitle"
                  name="subtitle"
                  type="text"
                  value={reviewForm.subtitle}
                  onChange={handleReviewChange}
                  placeholder={extraLabel('role_placeholder') || t('reviews.addReviewRolePlaceholder')}
                  disabled={reviewSubmitting}
                />
              </div>
              <div className="add-review-field">
                <label htmlFor="review-email">{extraLabel('email_label') || t('reviews.addReviewEmail')}</label>
                <input
                  id="review-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={reviewForm.email}
                  onChange={handleReviewChange}
                  placeholder={extraLabel('email_placeholder') || t('reviews.addReviewEmail')}
                  disabled={reviewSubmitting}
                />
              </div>
              <div className="add-review-field">
                <span className="add-review-label-text" id="review-rating-label">
                  {extraLabel('rating_label') || t('reviews.addReviewRating')}
                </span>
                <div className="add-review-stars-input" role="group" aria-labelledby="review-rating-label">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={`add-review-star-btn ${n <= reviewForm.rating ? 'is-active' : ''}`}
                      onClick={() => setReviewForm((p) => ({ ...p, rating: n }))}
                      disabled={reviewSubmitting}
                      aria-label={`${n} ${lang === 'ar' ? 'نجوم' : 'stars'}`}
                      aria-pressed={n <= reviewForm.rating}
                    >
                      <Star
                        size={28}
                        fill={n <= reviewForm.rating ? '#ffb800' : 'transparent'}
                        color={n <= reviewForm.rating ? '#ffb800' : 'rgba(255,255,255,0.25)'}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="add-review-field">
                <label htmlFor="review-message">{extraLabel('message_label') || t('reviews.addReviewMessage')}</label>
                <textarea
                  id="review-message"
                  name="message"
                  rows={5}
                  value={reviewForm.message}
                  onChange={handleReviewChange}
                  placeholder={extraLabel('message_placeholder') || t('reviews.addReviewPlaceholder')}
                  disabled={reviewSubmitting}
                  required
                />
              </div>
              <button type="submit" className="add-review-submit" disabled={reviewSubmitting}>
                {reviewSubmitting
                  ? t('reviews.addReviewSubmitting')
                  : addReviewCms?.[`first-btn-${lang}`] || t('reviews.addReviewSubmit')}
              </button>
            </form>
          </div>
        </section>

        <div className="rating-breakdown-section scroll-animate stag-2">
          <div className="overall-score-card">
            <h1>{t('reviews.score')}</h1>
            <div className="star-row-medium">
              {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="#ffb800" color="#ffb800" />)}
            </div>
            <p>{t('reviews.basedOn')}</p>
          </div>
          <div className="histogram-list">
            <h3 className="histogram-title">{lang === 'ar' ? 'ملخص التقييمات الإجمالي' : 'Total Review Summary'}</h3>
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