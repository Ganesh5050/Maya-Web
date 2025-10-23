import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAuth, initializeAuth, setupAuthListener } from '../lib/auth';

interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
}

interface SignUpData {
  email: string;
  password: string;
  name: string;
}

interface SignInData {
  email: string;
  password: string;
}

interface AuthError {
  message: string;
  code?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: (data: SignUpData) => Promise<{ user: AuthUser | null; error: AuthError | null }>;
  signIn: (data: SignInData) => Promise<{ user: AuthUser | null; error: AuthError | null }>;
  signInWithProvider: (provider: 'google' | 'github' | 'apple') => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  updateProfile: (updates: Partial<AuthUser>) => Promise<{ user: AuthUser | null; error: AuthError | null }>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuth();

  useEffect(() => {
    // Initialize auth state
    initializeAuth();

    // Setup auth state listener
    const { data: { subscription } } = setupAuthListener();

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};