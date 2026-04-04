import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import DynamicBackground from '../components/common/DynamicBackground';
import SEO from '../components/common/SEO';
import './CartScreen.css';

const CartScreen = () => {
  const { t, lang } = useContext(LanguageContext);
  const isAr = lang === 'ar';
  const { cartItems, removeFromCart, updateQty, cartTotal } = useCart();

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

  const formatPrice = (price) => {
    return price.toLocaleString();
  };

  return (
    <div className={`cart-page ${isAr ? 'rtl-text' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
      <SEO
        title={isAr ? 'سلة التسوق' : 'Your Cart'}
        description={isAr ? 'مراجعة المنتجات في سلة التسوق' : 'Review products in your cart'}
        slug="cart"
      />
      <DynamicBackground />

      <div className="cart-wrapper">
        <Link to="/shop/bracelet" className="cart-back-btn scroll-animate">
          <ArrowLeft size={20} style={isAr ? { transform: 'rotate(180deg)' } : {}} />
          {t('cart.backToShop')}
        </Link>

        <h1 className="cart-page-title scroll-animate stag-1">{t('cart.title')}</h1>

        {cartItems.length === 0 ? (
          <div className="cart-empty scroll-animate stag-2">
            <ShoppingBag size={64} strokeWidth={1} />
            <h2>{t('cart.emptyTitle')}</h2>
            <p>{t('cart.emptyDesc')}</p>
            <Link to="/shop/bracelet" className="cart-empty-btn">
              {t('cart.continueShopping')}
            </Link>
          </div>
        ) : (
          <div className="cart-layout scroll-animate stag-2">
            {/* Cart Items */}
            <div className="cart-items-col">
              {cartItems.map((item, idx) => (
                <div className="cart-item-card" key={item.id} style={{ animationDelay: `${idx * 0.08}s` }}>
                  <div className="cart-item-img-box">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="cart-item-info">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <span className="cart-item-variant">
                      {item.colorName} ({t('cart.standardSize')})
                    </span>

                    <div className="cart-item-qty-row">
                      <button
                        className="cart-qty-btn"
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        disabled={item.qty <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="cart-qty-value">{item.qty}</span>
                      <button
                        className="cart-qty-btn"
                        onClick={() => updateQty(item.id, item.qty + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-right">
                    <span className="cart-item-price">EGP {formatPrice(item.price * item.qty)}</span>
                    <button
                      className="cart-item-delete"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="cart-summary-col">
              <div className="cart-summary-card">
                <h3 className="cart-summary-title">{t('cart.orderSummary')}</h3>

                <div className="cart-summary-row">
                  <span>{t('cart.subtotal')}</span>
                  <span>EGP {formatPrice(cartTotal)}</span>
                </div>

                <div className="cart-summary-row">
                  <span>{t('cart.shipping')}</span>
                  <span className="cart-free-tag">{t('cart.free')}</span>
                </div>

                <div className="cart-summary-divider" />

                <div className="cart-summary-row cart-summary-total">
                  <span>{t('cart.total')}</span>
                  <span>{formatPrice(cartTotal)} EGP</span>
                </div>

                <button className="cart-checkout-btn">
                  {t('cart.checkout')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartScreen;
