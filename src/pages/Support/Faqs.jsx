import React, { useEffect, useState, useContext, useCallback } from 'react';
import SEO from '../../components/common/SEO';
import { LanguageContext } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { supabase } from '../../lib/Supabase';
import './Faqs.css';

function Faqs() {
  const { lang, t } = useContext(LanguageContext);

  const [faqs, setFaqs]           = useState([]);
  const [seoData, setSeoData]     = useState(null); 
  const [loading, setLoading]     = useState(true);
  const [activeIdx, setActiveIdx] = useState(null);
  const [searchQuery, setSearch]  = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: faqsData, error: faqsError } = await supabase
          .from('faqs')
          .select('id, question_en, question_ar, answer_en, answer_ar, display_order')
          .order('display_order', { ascending: true });

        if (faqsError) {
          console.error('Supabase FAQs fetch error:', faqsError);
        } else if (faqsData) {
          setFaqs(faqsData);
        }

        const { data: seo, error: seoError } = await supabase
          .from('seo')
          .select('*')
          .eq('slug', 'support/faqs')
          .single();

        if (seoError && seoError.code !== 'PGRST116') {
          console.error('Supabase SEO fetch error:', seoError);
        } else if (seo) {

          console.log("SEO DATA GAT YAAAAY: ", seo); 
          setSeoData(seo);
        }

      } catch (err) {
        console.error('Unexpected error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

   
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
  }, [loading]);

  
  const isArabic = typeof lang === 'string' && lang.toLowerCase().includes('ar');
  const question = (faq) => (isArabic ? faq.question_ar : faq.question_en) || faq.question_en || '';
  const answer   = (faq) => (isArabic ? faq.answer_ar   : faq.answer_en)   || faq.answer_en || '';
  const toggleItem = useCallback((idx) => {
    setActiveIdx(prev => (prev === idx ? null : idx));
  }, []);

 
  const filtered = faqs.filter(faq => {
    const q   = question(faq).toLowerCase();
    const a   = answer(faq).toLowerCase();
    const qry = searchQuery.toLowerCase();
    return !qry || q.includes(qry) || a.includes(qry);
  });

  return (
    <div className="faqs-wrapper">
      <SEO
        title={
          seoData 
            ? (isArabic ? seoData.title_ar : seoData.title_en) 
            : (isArabic ? 'الأسئلة الشائعة - Qlink' : 'Frequently Asked Questions - Qlink')
        }
        description={
          seoData 
            ? (isArabic ? seoData.description_ar : seoData.description_en) 
            : (isArabic ? 'اعثر على إجابات للأسئلة المتكررة حول كيو لينك.' : 'Find answers to frequently asked questions about Qlink.')
        }
        slug={seoData ? seoData.slug : "support/faqs"} 
      />

      <div className={`faqs-content ${isArabic ? 'rtl-text' : ''}`}>

        <section className="faqs-hero-section scroll-animate stag-1">
          <h1>
            {t('faqsPage.heroTitle')}
            <span className="red-text">{t('faqsPage.heroHighlight')}</span>
          </h1>
          <p>{t('faqsPage.heroDesc')}</p>

          <div className="faqs-search-wrap">
            <input
              id="faqs-search"
              className="faqs-search-input"
              type="text"
              placeholder={t('faqsPage.searchPlaceholder')}
              value={searchQuery}
              onChange={e => { setSearch(e.target.value); setActiveIdx(null); }}
              dir={isArabic ? 'rtl' : 'ltr'}
            />
          </div>
        </section>

        <div className="scroll-animate stag-3" style={{ marginTop: '48px' }}>
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