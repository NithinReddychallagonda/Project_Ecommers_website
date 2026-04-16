import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/api/client';

interface User {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  pincode: string | null;
  role: 'user' | 'admin';
}

interface Profile {
  full_name: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  pincode: string | null;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isAdmin: boolean;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      const { user: userData } = await apiClient.getProfile();
      setUser(userData);
      setProfile({
        full_name: userData.full_name,
        phone: userData.phone,
        address: userData.address,
        city: userData.city,
        pincode: userData.pincode,
      });
      setIsAdmin(userData.role === 'admin');
    } catch (error) {
      console.error('Error fetching profile:', error);
      setUser(null);
      setProfile(null);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [fetchProfile]);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const response = await apiClient.signup(email, password, fullName);
      apiClient.setToken(response.token);
      setUser({
        id: response.user.id,
        email: response.user.email,
        full_name: response.user.full_name,
        phone: null,
        address: null,
        city: null,
        pincode: null,
        role: response.user.role,
      });
      setProfile({
        full_name: response.user.full_name,
        phone: null,
        address: null,
        city: null,
        pincode: null,
      });
      return { error: null };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Signup failed' };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await apiClient.signin(email, password);
      apiClient.setToken(response.token);
      setUser({
        id: response.user.id,
        email: response.user.email,
        full_name: response.user.full_name || null,
        phone: response.user.phone || null,
        address: response.user.address || null,
        city: response.user.city || null,
        pincode: response.user.pincode || null,
        role: response.user.role,
      });
      setProfile({
        full_name: response.user.full_name || null,
        phone: response.user.phone || null,
        address: response.user.address || null,
        city: response.user.city || null,
        pincode: response.user.pincode || null,
      });
      setIsAdmin(response.user.role === 'admin');
      return { error: null };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Sign in failed' };
    }
  };

  const signOut = async () => {
    apiClient.clearToken();
    setUser(null);
    setProfile(null);
    setIsAdmin(false);
  };

  const updateProfile = async (data: Partial<Profile>) => {
    try {
      const response = await apiClient.updateProfile(data);
      setProfile(prev => 
        prev ? { ...prev, ...data } : null
      );
      setUser(prev => 
        prev ? {
          ...prev,
          full_name: response.user.full_name,
          phone: response.user.phone,
          address: response.user.address,
          city: response.user.city,
          pincode: response.user.pincode,
        } : null
      );
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, isAdmin, loading, signUp, signIn, signOut, updateProfile, showAuthModal, setShowAuthModal }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
