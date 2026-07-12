import React, { createContext, useContext, useState, useEffect } from 'react';
import { request } from '../utils/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [coupon, setCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    // Recalculate discount whenever cart items change
    if (coupon) {
      calculateDiscount(coupon, cartItems);
    }
  }, [cartItems, coupon]);

  const addToCart = (project) => {
    if (!cartItems.some((item) => item._id === project._id)) {
      setCartItems([...cartItems, project]);
      return true;
    }
    return false;
  };

  const removeFromCart = (projectId) => {
    setCartItems(cartItems.filter((item) => item._id !== projectId));
  };

  const clearCart = () => {
    setCartItems([]);
    setCoupon(null);
    setDiscount(0);
  };

  const subtotal = cartItems.reduce((acc, curr) => acc + curr.price, 0);

  const calculateDiscount = (couponData, items) => {
    const currentSubtotal = items.reduce((acc, curr) => acc + curr.price, 0);
    let disc = 0;

    if (couponData.discountType === 'percentage') {
      disc = (currentSubtotal * couponData.discountValue) / 100;
      if (couponData.maxDiscount && disc > couponData.maxDiscount) {
        disc = couponData.maxDiscount;
      }
    } else {
      disc = couponData.discountValue;
    }

    setDiscount(Math.min(currentSubtotal, disc));
  };

  const applyCoupon = async (code) => {
    try {
      const data = await request('/coupons/validate', 'POST', {
        code,
        cartAmount: subtotal,
      });

      if (data.success) {
        const couponData = {
          code: data.code,
          discountType: data.discountType,
          discountValue: data.discountValue,
          maxDiscount: data.maxDiscount,
        };
        setCoupon(couponData);
        calculateDiscount(couponData, cartItems);
        return { success: true, message: data.message };
      }
    } catch (error) {
      setCoupon(null);
      setDiscount(0);
      throw error;
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    setDiscount(0);
  };

  const total = Math.max(0, subtotal - discount);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        coupon,
        discount,
        subtotal,
        total,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
