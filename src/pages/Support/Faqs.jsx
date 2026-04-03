import React, { useEffect, useState, useContext, useCallback } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { supabase } from '../../lib/Supabase';
import DynamicBackground from '../../components/common/DynamicBackground';
import './Faqs.css';

function Faqs() {
  const { lang, t } = useContext(LanguageContext);

  // ── State ─────────────────────────────────────────────────────────────────
  const [faqs, setFaqs]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [activeIdx, setActiveIdx] = useState(null);
  const [searchQuery, setSearch]  = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // ── Supabase fetch ─────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('faqs')
          .select('question_en, question_ar, answer_en, answer_ar, category');

        if (error) {
          console.error('Supabase FAQs fetch error:', error);
          return;
        }
        if (data) setFaqs(data);
      } catch (err) {
        console.error('Unexpected error fetching FAQs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []); // fetch once on mount — data is language-agnostic

  // ── IntersectionObserver (same pattern as Home / HelpCenter) ───────────────
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.15, rootMargin: '-50px' });

    const els = document.querySelectorAll('.scroll-animate');
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]); // re-run after content loads to pick up new DOM elements

  // ── Helpers ────────────────────────────────────────────────────────────────
  const question = (faq) => (lang === 'ar' ? faq.question_ar : faq.question_en) || '';
  const answer   = (faq) => (lang === 'ar' ? faq.answer_ar   : faq.answer_en)   || '';

  const toggleItem = useCallback((idx) => {
    setActiveIdx(prev => (prev === idx ? null : idx));
  }, []);

  // ── Derived: unique categories ─────────────────────────────────────────────
  const categories = ['all', ...Array.from(
    new Set(faqs.map(f => f.category).filter(Boolean))
  )];

  // ── Filtered list ──────────────────────────────────────────────────────────
  const filtered = faqs.filter(faq => {
    const q   = question(faq).toLowerCase();
    const a   = answer(faq).toLowerCase();
    const qry = searchQuery.toLowerCase();
    const matchesSearch   = !qry || q.includes(qry) || a.includes(qry);
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="faqs-wrapper">
      <DynamicBackground />

      <div className={`faqs-content ${lang === 'ar' ? 'rtl-text' : ''}`}>

        {/* HERO */}
        <section className="faqs-hero-section scroll-animate stag-1">
          <h1>
            {t('faqsPage.heroTitle')}
            <span className="red-text">{t('faqsPage.heroHighlight')}</span>
          </h1>
          <p>{t('faqsPage.heroDesc')}</p>

          {/* Search */}
          <div className="faqs-search-wrap">
            <input
              id="faqs-search"
              className="faqs-search-input"
              type="text"
              placeholder={t('faqsPage.searchPlaceholder')}
              value={searchQuery}
              onChange={e => { setSearch(e.target.value); setActiveIdx(null); }}
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
            />
          </div>
        </section>

        {/* CATEGORY CHIPS */}
        {categories.length > 1 && (
          <div className="faqs-categories scroll-animate stag-2">
            {categories.map(cat => (
              <button
                key={cat}
                id={`faqs-cat-${cat}`}
                className={`faqs-cat-chip ${activeCategory === cat ? 'faqs-cat-active' : ''}`}
                onClick={() => { setActiveCategory(cat); setActiveIdx(null); }}
              >
                {cat === 'all'
                  ? (lang === 'ar' ? 'الكل' : 'All')
                  : cat}
              </button>
            ))}
          </div>
        )}

        {/* ACCORDION */}
        <div className="scroll-animate stag-3">
          {loading ? (
            <div className="faqs-loading">
              <span className="faqs-loading-dot" />
              <span className="faqs-loading-dot" />
              <span className="faqs-loading-dot" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="faqs-no-results">{t('faqsPage.noResults')}</p>
          ) : (
            <div className="faqs-accordion">
              {filtered.map((faq, idx) => (
                <div
                  key={idx}
                  id={`faq-item-${idx}`}
                  className={`faqs-accordion-item ${activeIdx === idx ? 'faqs-item-active' : ''}`}
                  onClick={() => toggleItem(idx)}
                >
                  <div className="faqs-accordion-question">
                    <h4>{question(faq)}</h4>
                    <ChevronDown
                      size={20}
                      className={`faqs-chevron ${activeIdx === idx ? 'faqs-chevron-open' : ''}`}
                    />
                  </div>
                  <div className={`faqs-accordion-answer ${activeIdx === idx ? 'faqs-answer-open' : ''}`}>
                    <p>{answer(faq)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="faqs-cta-section scroll-animate stag-2">
          <h2>{t('faqsPage.ctaTitle')}</h2>
          <p>{t('faqsPage.ctaDesc')}</p>
          <Link to="/support/contact" className="btn btn-primary link-btn-inline">
            {t('faqsPage.ctaBtn')}
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Faqs;
