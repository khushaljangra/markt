import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { request } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const data = await request('/auth/profile', 'GET');
      if (data.success) {
        setUser({
          _id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
          referralCode: data.referralCode,
          referralEarnings: data.referralEarnings,
          avatar: data.avatar,
          createdAt: data.createdAt,
        });
        setWishlist(data.wishlist.map(item => item._id || item));
      } else {
        logout();
      }
    } catch (error) {
      console.error('Profile loading failed:', error.message);
      logout();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await request('/auth/login', 'POST', { email, password });
      if (data.success) {
        localStorage.setItem('token', data.token);
        await loadProfile();
        return data;
      }
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const register = async (name, email, password, referralCode) => {
    setLoading(true);
    try {
      const data = await request('/auth/register', 'POST', {
        name,
        email,
        password,
        referralCode,
      });
      if (data.success) {
        localStorage.setItem('token', data.token);
        await loadProfile();
        return data;
      }
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setWishlist([]);
    setLoading(false);
  };

  const updateProfile = async (name, password, avatar) => {
    try {
      const data = await request('/auth/profile', 'PUT', { name, password, avatar });
      if (data.success) {
        localStorage.setItem('token', data.token);
        await loadProfile();
        return data;
      }
    } catch (error) {
      throw error;
    }
  };

  const toggleWishlist = async (projectId) => {
    if (!user) return false;
    try {
      const data = await request('/auth/wishlist', 'POST', { projectId });
      if (data.success) {
        setWishlist(data.wishlist);
        return true;
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error.message);
    }
    return false;
  };

  const isInWishlist = (projectId) => {
    return wishlist.includes(projectId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        wishlist,
        loading,
        login,
        register,
        logout,
        updateProfile,
        toggleWishlist,
        isInWishlist,
        loadProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
