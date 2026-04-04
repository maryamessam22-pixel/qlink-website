import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Banknote, Minus, Plus } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import DynamicBackground from '../components/common/DynamicBackground';
import SEO from '../components/common/SEO';
import { supabase } from '../lib/Supabase';
import './Checkout.css';

const Checkout = () => {
    const { t, lang } = useContext(LanguageContext);
    const isAr = lang === 'ar';
    const navigate = useNavigate();
    
    const { cartItems, updateQty, cartTotal, clearCart } = useCart();

    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [seoData, setSeoData] = useState(null);
    
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

   
    useEffect(() => {
        const fetchSEO = async () => {
            try {
                const { data: seo } = await supabase
                    .from('seo')
                    .select('*')
                    .eq('slug', 'checkout')
                    .single();
                
                if (seo) setSeoData(seo);
            } catch (err) {
                console.error("Error fetching SEO:", err);
            }
        };

        fetchSEO();
    }, []);

 
    useEffect(() => {
        if (cartItems.length === 0) {
            navigate('/cart');
        }
    }, [cartItems, navigate]);

  
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

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const formatPrice = (price) => price.toLocaleString();

   
    const handleCheckout = async () => {
       
        if (!form.firstName || !form.lastName || !form.address || !form.city || !form.email) {
            alert(isAr ? 'برجاء إدخال جميع البيانات المطلوبة' : 'Please fill in all required fields');
            return;
        }

      
        const orderNum = 'ORD-' + Math.floor(1000 + Math.random() * 9000);

      
        const orderDetails = cartItems.map(item => `${item.name} ${item.colorName || ''} (x${item.qty})`).join(' + ');

       
        const newOrder = {
            // id: crypto.randomUUID(),  // Removing to let DB handle it (Standard practice)
            order_number: orderNum,
            customer_name: `${form.firstName} ${form.lastName}`,
            email: form.email,
            address: form.address,
            city: form.city,
            postal_code: form.postalCode,
            payment_method: paymentMethod, 
            variant_details: orderDetails,
            status: 'Pending',
            revenue: cartTotal, // Pass as number
            time: 'Just now'
        };

        try {
         
            const { error: insertError } = await supabase
                .from('orders') 
                .insert([newOrder]);

            if (insertError) {
                console.error("Supabase Error:", insertError);
                throw insertError;
            }

          
            clearCart();
            navigate('/complete-purchase', { state: { orderNum, email: form.email } }); 
            
        } catch (error) {

            console.error("Error saving order:", error);
            alert(isAr 
                ? `حدث خطأ أثناء إتمام الطلب: ${error.message || error}` 
                : `Something went wrong while processing your order: ${error.message || error}`
            );
        }
    };

    return (
        <div className={`checkout-page ${isAr ? 'rtl-text' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
            <SEO
                title={seoData ? (isAr ? seoData.title_ar : seoData.title_en) : (isAr ? 'إتمام الطلب' : 'Checkout')}
                description={seoData ? (isAr ? seoData.description_ar : seoData.description_en) : ''}
                slug="checkout"
            />
            <DynamicBackground />

            <div className="checkout-wrapper">
                <div className="checkout-layout">

                    <div className="checkout-forms-col">

                        <div className="checkout-card scroll-animate stag-1">
                            <div className="checkout-card-header">
                                <span className="checkout-step-num">1</span>
                                <h2>{t('checkout.shippingTitle')}</h2>
                            </div>

                            <div className="checkout-form-grid">
                                <div className="checkout-field">
                                    <label>{t('checkout.firstName')}</label>
                                    <input
                                        type="text"
                                        value={form.firstName}
                                        onChange={(e) => handleChange('firstName', e.target.value)}
                                    />
                                </div>
                                <div className="checkout-field">
                                    <label>{t('checkout.lastName')}</label>
                                    <input
                                        type="text"
                                        value={form.lastName}
                                        onChange={(e) => handleChange('lastName', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="checkout-form-grid">
                                <div className="checkout-field">
                                    <label>{t('checkout.email')}</label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                    />
                                </div>
                                <div className="checkout-field">
                                    <label>{t('checkout.address')}</label>
                                    <input
                                        type="text"
                                        value={form.address}
                                        onChange={(e) => handleChange('address', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="checkout-form-grid">
                                <div className="checkout-field">
                                    <label>{t('checkout.city')}</label>
                                    <input
                                        type="text"
                                        value={form.city}
                                        onChange={(e) => handleChange('city', e.target.value)}
                                    />
                                </div>
                                <div className="checkout-field">
                                    <label>{t('checkout.postalCode')}</label>
                                    <input
                                        type="text"
                                        value={form.postalCode}
                                        onChange={(e) => handleChange('postalCode', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="checkout-card scroll-animate stag-2">
                            <div className="checkout-card-header">
                                <span className="checkout-step-num">2</span>
                                <h2>{t('checkout.paymentTitle')}</h2>
                            </div>

                            <div className="checkout-payment-options">
                                <div 
                                    className={`payment-option-card ${paymentMethod === 'credit' ? 'active' : ''}`}
                                    onClick={() => setPaymentMethod('credit')}
                                >
                                    <div className="payment-opt-left">
                                        <div className="payment-radio" />
                                        <span className="payment-opt-label">{t('checkout.creditCard')}</span>
                                    </div>
                                    <CreditCard size={20} className="payment-opt-icons" />
                                </div>

                                <div 
                                    className={`payment-option-card ${paymentMethod === 'cod' ? 'active' : ''}`}
                                    onClick={() => setPaymentMethod('cod')}
                                >
                                    <div className="payment-opt-left">
                                        <div className="payment-radio" />
                                        <span className="payment-opt-label">{t('checkout.cod')}</span>
                                    </div>
                                    <Banknote size={20} className="payment-opt-icons" />
                                </div>
                            </div>

                            {paymentMethod === 'credit' && (
                                <div className="card-details-section">
                                    <div className="checkout-field">
                                        <label>{t('checkout.cardNumber')}</label>
                                        <input
                                            type="text"
                                            placeholder="0000 0000 0000 0000"
                                            value={form.cardNumber}
                                            onChange={(e) => handleChange('cardNumber', e.target.value)}
                                        />
                                    </div>
                                    <div className="checkout-form-grid">
                                        <div className="checkout-field">
                                            <label>{t('checkout.expiryDate')}</label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                value={form.expiry}
                                                onChange={(e) => handleChange('expiry', e.target.value)}
                                            />
                                        </div>
                                        <div className="checkout-field">
                                            <label>{t('checkout.cvc')}</label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                value={form.cvc}
                                                onChange={(e) => handleChange('cvc', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                          
                            <button className="complete-purchase-btn" onClick={handleCheckout}>
                                {t('checkout.completePurchase')}
                            </button>
                        </div>
                    </div>

              
                    <div className="chk-summary-col">
                        <div className="chk-summary-card scroll-animate stag-3">
                            <h3 className="chk-summary-title">{t('cart.orderSummary')}</h3>

                            <div className="chk-items-list">
                                {cartItems.map((item) => (
                                    <div className="chk-summary-item" key={item.id}>
                                        <div className="chk-item-img">
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div className="chk-item-info">
                                            <span className="chk-item-name">{item.name}</span>
                                            <span className="chk-item-variant">
                                                {item.colorName} ({t('cart.standardSize')})
                                            </span>
                                            <div className="chk-item-qty">
                                                <button 
                                                    className="chk-qty-btn" 
                                                    onClick={() => updateQty(item.id, item.qty - 1)}
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="chk-qty-val">{item.qty}</span>
                                                <button 
                                                    className="chk-qty-btn" 
                                                    onClick={() => updateQty(item.id, item.qty + 1)}
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="chk-summary-divider" />

                            <div className="chk-summary-row">
                                <span className="chk-row-label">{t('cart.subtotal')}</span>
                                <span className="chk-row-val">EGP {formatPrice(cartTotal)}</span>
                            </div>
                            <div className="chk-summary-row">
                                <span className="chk-row-label">{t('cart.shipping')}</span>
                                <span className="chk-row-val shipping-free">{t('cart.free')}</span>
                            </div>

                            <div className="chk-summary-divider" />

                            <div className="chk-total-row">
                                <span className="chk-total-label">{t('cart.total')}</span>
                                <span className="chk-total-val">{formatPrice(cartTotal)} EGP</span>
                            </div>

                            <div className="promo-box">
                                <input 
                                    type="text" 
                                    placeholder={t('checkout.promoCode')} 
                                    className="promo-input"
                                />
                                <button className="promo-btn">{t('checkout.apply')}</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;