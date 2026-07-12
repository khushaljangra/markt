import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { request } from '../utils/api';
import { ShoppingCart, Trash2, Tag, Percent, ArrowRight, ShieldCheck } from 'lucide-react';

const Cart = () => {
  const { user } = useAuth();
  const {
    cartItems,
    removeFromCart,
    clearCart,
    coupon,
    discount,
    subtotal,
    total,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState('');
  const [couponError, setCouponError] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const navigate = useNavigate();

  // Load Razorpay Script in head dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleApplyCouponSubmit = async (e) => {
    e.preventDefault();
    setCouponMsg('');
    setCouponError('');
    if (!couponCode) return;

    try {
      const data = await applyCoupon(couponCode);
      if (data.success) {
        setCouponMsg(data.message);
        setCouponCode('');
      }
    } catch (err) {
      setCouponError(err.message || 'Invalid coupon code');
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      // Redirect to login page and preserve redirect to cart page afterwards
      navigate('/login', { state: { from: { pathname: '/cart' } } });
      return;
    }

    setCheckoutLoading(true);
    try {
      const projectIds = cartItems.map((item) => item._id);
      
      // Initialize Order
      const orderData = await request('/orders/checkout', 'POST', {
        projectIds,
        couponCode: coupon?.code,
      });

      if (!orderData.success) {
        throw new Error('Failed to initiate checkout');
      }

      // Check if server is running in Razorpay Sandbox (Mock) mode
      if (orderData.isMock) {
        alert('Sandbox Mode: Processing mock payment checkout instantly.');
        
        // Call backend verification with mock values
        const verification = await request('/orders/verify', 'POST', {
          razorpayOrderId: orderData.razorpayOrderId,
          razorpayPaymentId: `pay_mock_${Math.random().toString(36).substring(2, 10)}`,
          razorpaySignature: 'mock_payment_signature_passed_successfully_2026',
        });

        if (verification.success) {
          clearCart();
          navigate('/dashboard');
        } else {
          alert('Sandbox payment verification failed');
        }
      } else {
        // Run Real Razorpay Checkout modal
        if (!window.Razorpay) {
          alert('Razorpay Checkout SDK failed to load. Check internet connection.');
          setCheckoutLoading(false);
          return;
        }

        const options = {
          key: orderData.key,
          amount: Math.round(orderData.amount * 100),
          currency: 'INR',
          name: 'ApexMarket',
          description: 'Premium Source Code Purchase',
          order_id: orderData.razorpayOrderId,
          prefill: {
            name: user.name,
            email: user.email,
          },
          theme: {
            color: '#6366f1',
          },
          handler: async (response) => {
            try {
              const verifyRes = await request('/orders/verify', 'POST', {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              });

              if (verifyRes.success) {
                clearCart();
                navigate('/dashboard');
              }
            } catch (err) {
              alert(`Payment Verification Failed: ${err.message}`);
            }
          },
          modal: {
            ondismiss: function () {
              setCheckoutLoading(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      alert(error.message || 'Checkout failed');
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container animate-fade-in" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div style={{
          background: 'var(--bg-tertiary)',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-muted)',
          marginBottom: '20px'
        }}>
          <ShoppingCart size={30} />
        </div>
        <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Your Cart is Empty</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Browse our projects directory to find code resources.</p>
        <Link to="/projects" className="btn btn-primary">Browse Marketplace</Link>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 24px 80px 24px' }}>
      <h2 style={{ fontSize: '28px', color: 'var(--text-primary)', marginBottom: '32px' }}>Shopping Cart</h2>

      <div className="responsive-two-col" style={{
        alignItems: 'flex-start'
      }}>
        
        {/* Left Column: Cart Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {cartItems.map((item) => (
            <div key={item._id} className="glass-card" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px',
              gap: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '60px',
                  height: '45px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  background: 'var(--bg-tertiary)'
                }}>
                  <img src={item.previewUrls?.[0] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    <Link to={`/projects/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {item.title}
                    </Link>
                  </h3>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Size: {item.fileSize}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <strong style={{ fontSize: '16px', color: 'var(--text-primary)' }}>INR {item.price}</strong>
                <button
                  onClick={() => removeFromCart(item._id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--error)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                  title="Remove Item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Order Checkout Summary Panel */}
        <div>
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '18px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>Order Summary</h3>

            {/* Price list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal:</span>
                <strong style={{ color: 'var(--text-primary)' }}>INR {subtotal}</strong>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Percent size={14} /> Coupon discount:
                  </span>
                  <strong>- INR {discount}</strong>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '12px', fontSize: '18px', color: 'var(--text-primary)' }}>
                <span>Total Amount:</span>
                <strong>INR {total}</strong>
              </div>
            </div>

            {/* Coupon Application Box */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
              {coupon ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(16, 185, 129, 0.15)',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  color: '#34d399',
                  fontSize: '13px'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                    <Tag size={14} /> {coupon.code} Applied
                  </span>
                  <button onClick={removeCoupon} style={{
                    background: 'none',
                    border: 'none',
                    color: '#f87171',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}>Remove</button>
                </div>
              ) : (
                <form onSubmit={handleApplyCouponSubmit} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Coupon Code"
                    style={{ padding: '8px 12px', fontSize: '13px' }}
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button type="submit" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                    Apply
                  </button>
                </form>
              )}

              {couponMsg && <p style={{ fontSize: '11px', color: 'var(--success)', marginTop: '6px' }}>{couponMsg}</p>}
              {couponError && <p style={{ fontSize: '11px', color: 'var(--error)', marginTop: '6px' }}>{couponError}</p>}
            </div>

            {/* Checkout CTA */}
            <button
              onClick={handleCheckout}
              className="btn btn-primary"
              disabled={checkoutLoading}
              style={{ width: '100%', padding: '14px', marginTop: '10px' }}
            >
              {checkoutLoading ? 'Processing...' : user ? 'Checkout & Pay' : 'Sign In to Pay'} <ArrowRight size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
              <ShieldCheck size={14} /> Secure Checkout encrypted via Razorpay
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
