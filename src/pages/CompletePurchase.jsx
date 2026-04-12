import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Mail, Smartphone, ArrowRight, ShieldCheck, Apple, Play } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';
import SEO from '../components/common/SEO';
import './CompletePurchase.css';

import mobileMockup from '../assets/images/mobile2.png';

const CompletePurchase = () => {
    const { t, lang } = useContext(LanguageContext);
    const isAr = lang === 'ar';
    const location = useLocation();
    const navigate = useNavigate();
    
    const { orderNum, email } = location.state || { orderNum: '#QL-000000', email: 'user@example.com' };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '-50px' });

        const animatedElements = document.querySelectorAll('.scroll-animate');
        animatedElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className={`complete-purchase-page ${isAr ? 'rtl-text' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
            <SEO 
                title={isAr ? 'تأكيد الطلب' : 'Order Confirmed'}
                description={isAr ? 'شكراً لشرائك من كيو لينك' : 'Thank you for your purchase from Qlink'}
                slug="complete-purchase"
            />
            <div className="cp-container">
                
                <div className="cp-success-header scroll-animate">
                    <div className="cp-check-wrapper">
                        <CheckCircle size={80} color="#10B981" fill="#10B98133" />
                    </div>
                    <h1>{t('completePurchase.orderConfirmed')}</h1>
                    <p>{t('completePurchase.thankYou')}</p>
                </div>

                
                <div className="cp-order-card scroll-animate stag-1">
                    <div className="cp-order-row">
                        <span className="cp-label">{t('completePurchase.orderNumber')}</span>
                        <span className="cp-value">{orderNum}</span>
                    </div>
                    <div className="cp-order-row">
                        <span className="cp-label">{t('completePurchase.estimatedDelivery')}</span>
                        <span className="cp-value cp-highlight">{t('completePurchase.deliveryDate')}</span>
                    </div>
                    
                    <div className="cp-email-notice">
                        <div className="cp-email-icon">
                            <Mail size={24} color="#3b82f6" />
                        </div>
                        <div className="cp-email-text">
                            <h3>{t('completePurchase.checkEmail')}</h3>
                            <p>{t('completePurchase.emailSent')} <strong>{email}</strong></p>
                        </div>
                    </div>
                </div>

                
                <div className="cp-app-quick-card scroll-animate stag-2">
                    <div className="cp-app-icon">
                        <Smartphone size={32} color="#10B981" />
                    </div>
                    <div className="cp-app-info">
                        <h3>{t('completePurchase.downloadApp')}</h3>
                        <p>{t('completePurchase.getAppDesc')}</p>
                    </div>
                    <div className="cp-app-buttons">
                        <button className="cp-store-btn">
                            <Apple size={20} />
                            <span>App Store</span>
                        </button>
                        <button className="cp-store-btn">
                            <Play size={20} />
                            <span>Google Play</span>
                        </button>
                    </div>
                </div>

                
                <section className="cp-feature-section scroll-animate">
                    <div className="cp-feature-content">
                        <h2>{t('completePurchase.manageSafety')}</h2>
                        <p>{t('completePurchase.manageDesc')}</p>
                        
                        <ul className="cp-points">
                            <li><ShieldCheck size={20} /> {t('completePurchase.managePoint1')}</li>
                            <li><ShieldCheck size={20} /> {t('completePurchase.managePoint2')}</li>
                            <li><ShieldCheck size={20} /> {t('completePurchase.managePoint3')}</li>
                        </ul>

                        <div className="cp-app-buttons">
                            <button className="cp-store-btn">
                                <Apple size={24} />
                                <div>
                                    <small>Download on the</small>
                                    <strong>App Store</strong>
                                </div>
                            </button>
                            <button className="cp-store-btn secondary">
                                <Play size={24} />
                                <div>
                                    <small>Get it on</small>
                                    <strong>Google Play</strong>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="cp-feature-visual">
                        <img src={mobileMockup} alt="Qlink App" className="cp-mockup-img" />
                    </div>
                </section>

                
                <section className="cp-guide-section scroll-animate">
                    <h2 className="cp-guide-title">{t('completePurchase.installNow')}</h2>
                    <p className="cp-guide-subtitle">{t('completePurchase.installSubtitle')}</p>
                    
                    <div className="cp-timeline">
                        <div className="cp-step">
                            <div className="cp-step-num-circle">
                                <span>01</span>
                            </div>
                            <h3>{t('completePurchase.step1Title')}</h3>
                            <p>{t('completePurchase.step1Desc')}</p>
                        </div>
                        <div className="cp-step">
                            <div className="cp-step-num-circle">
                                <span>02</span>
                            </div>
                            <h3>{t('completePurchase.step2Title')}</h3>
                            <p>{t('completePurchase.step2Desc')}</p>
                        </div>
                        <div className="cp-step">
                            <div className="cp-step-num-circle">
                                <span>03</span>
                            </div>
                            <h3>{t('completePurchase.step3Title')}</h3>
                            <p>{t('completePurchase.step3Desc')}</p>
                        </div>
                    </div>
                </section>

                
                <div className="cp-footer-actions scroll-animate">
                    <button className="cp-home-btn" onClick={() => navigate('/')}>
                        {isAr ? 'العودة للرئيسية' : 'Back to Homepage'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompletePurchase;
