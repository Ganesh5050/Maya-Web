import { supabase } from './supabase';
import { useAppStore } from '../store';
import type { User } from './supabase';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthError {
  message: string;
  code?: string;
}

export class AuthService {
  // Sign up with email and password
  static async signUp({ email, password, name }: SignUpData): Promise<{ user: AuthUser | null; error: AuthError | null }> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        return { user: null, error: { message: error.message, code: error.message } };
      }

      if (data.user) {
        // Create user profile
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: data.user.email!,
            name,
            plan: 'free',
          });

        if (profileError) {
          console.error('Error creating user profile:', profileError);
        }

        const user: AuthUser = {
          id: data.user.id,
          email: data.user.email!,
          name,
          plan: 'free',
        };

        return { user, error: null };
      }

      return { user: null, error: { message: 'No user data returned' } };
    } catch (error) {
      return { user: null, error: { message: 'An unexpected error occurred' } };
    }
  }

  // Sign in with email and password
  static async signIn({ email, password }: SignInData): Promise<{ user: AuthUser | null; error: AuthError | null }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { user: null, error: { message: error.message, code: error.message } };
      }

      if (data.user) {
        // Get user profile
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError) {
          return { user: null, error: { message: 'Failed to load user profile' } };
        }

        const user: AuthUser = {
          id: profile.id,
          email: profile.email,
          name: profile.name,
          avatar: profile.avatar_url,
          plan: profile.plan,
        };

        return { user, error: null };
      }

      return { user: null, error: { message: 'No user data returned' } };
    } catch (error) {
      return { user: null, error: { message: 'An unexpected error occurred' } };
    }
  }

  // Sign in with OAuth provider
  static async signInWithProvider(provider: 'google' | 'github' | 'apple'): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        return { error: { message: error.message, code: error.message } };
      }

      return { error: null };
    } catch (error) {
      return { error: { message: 'An unexpected error occurred' } };
    }
  }

  // Sign out
  static async signOut(): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return { error: { message: error.message, code: error.message } };
      }

      return { error: null };
    } catch (error) {
      return { error: { message: 'An unexpected error occurred' } };
    }
  }

  // Get current user
  static async getCurrentUser(): Promise<{ user: AuthUser | null; error: AuthError | null }> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        return { user: null, error: { message: error.message, code: error.message } };
      }

      if (!user) {
        return { user: null, error: null };
      }

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        return { user: null, error: { message: 'Failed to load user profile' } };
      }

      const authUser: AuthUser = {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        avatar: profile.avatar_url,
        plan: profile.plan,
      };

      return { user: authUser, error: null };
    } catch (error) {
      return { user: null, error: { message: 'An unexpected error occurred' } };
    }
  }

  // Update user profile
  static async updateProfile(updates: Partial<AuthUser>): Promise<{ user: AuthUser | null; error: AuthError | null }> {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        return { user: null, error: { message: 'User not authenticated' } };
      }

      const { data, error } = await supabase
        .from('users')
        .update({
          name: updates.name,
          avatar_url: updates.avatar,
          plan: updates.plan,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        return { user: null, error: { message: error.message, code: error.message } };
      }

      const updatedUser: AuthUser = {
        id: data.id,
        email: data.email,
        name: data.name,
        avatar: data.avatar_url,
        plan: data.plan,
      };

      return { user: updatedUser, error: null };
    } catch (error) {
      return { user: null, error: { message: 'An unexpected error occurred' } };
    }
  }

  // Reset password
  static async resetPassword(email: string): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        return { error: { message: error.message, code: error.message } };
      }

      return { error: null };
    } catch (error) {
      return { error: { message: 'An unexpected error occurred' } };
    }
  }

  // Update password
  static async updatePassword(newPassword: string): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        return { error: { message: error.message, code: error.message } };
      }

      return { error: null };
    } catch (error) {
      return { error: { message: 'An unexpected error occurred' } };
    }
  }

  // Check if user is authenticated
  static async isAuthenticated(): Promise<boolean> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return !!session;
    } catch (error) {
      return false;
    }
  }

  // Get session
  static async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      return { session, error };
    } catch (error) {
      return { session: null, error };
    }
  }

  // Listen to auth state changes
  static onAuthStateChange(callback: (event: string, session: Record<string, unknown>) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
}

// Auth context hook
export const useAuth = () => {
  const { user, isAuthenticated, setUser, setAuthenticated, setLoading } = useAppStore();

  const signUp = async (data: SignUpData) => {
    setLoading(true);
    const result = await AuthService.signUp(data);
    setLoading(false);

    if (result.user) {
      setUser(result.user);
      setAuthenticated(true);
    }

    return result;
  };

  const signIn = async (data: SignInData) => {
    setLoading(true);
    const result = await AuthService.signIn(data);
    setLoading(false);

    if (result.user) {
      setUser(result.user);
      setAuthenticated(true);
    }

    return result;
  };

  const signInWithProvider = async (provider: 'google' | 'github' | 'apple') => {
    setLoading(true);
    const result = await AuthService.signInWithProvider(provider);
    setLoading(false);
    return result;
  };

  const signOut = async () => {
    setLoading(true);
    const result = await AuthService.signOut();
    setLoading(false);

    if (!result.error) {
      setUser(null);
      setAuthenticated(false);
    }

    return result;
  };

  const updateProfile = async (updates: Partial<AuthUser>) => {
    setLoading(true);
    const result = await AuthService.updateProfile(updates);
    setLoading(false);

    if (result.user) {
      setUser(result.user);
    }

    return result;
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    const result = await AuthService.resetPassword(email);
    setLoading(false);
    return result;
  };

  const updatePassword = async (newPassword: string) => {
    setLoading(true);
    const result = await AuthService.updatePassword(newPassword);
    setLoading(false);
    return result;
  };

  return {
    user,
    isAuthenticated,
    isLoading: useAppStore((state) => state.isLoading),
    signUp,
    signIn,
    signInWithProvider,
    signOut,
    updateProfile,
    resetPassword,
    updatePassword,
  };
};

// Initialize auth state
export const initializeAuth = async () => {
  const { setUser, setAuthenticated, setLoading } = useAppStore.getState();

  setLoading(true);

  try {
    const { user, error } = await AuthService.getCurrentUser();

    if (user && !error) {
      setUser(user);
      setAuthenticated(true);
    } else {
      setUser(null);
      setAuthenticated(false);
    }
  } catch (error) {
    console.error('Auth initialization error:', error);
    setUser(null);
    setAuthenticated(false);
  } finally {
    setLoading(false);
  }
};

// Auth state listener
export const setupAuthListener = () => {
  const { setUser, setAuthenticated } = useAppStore.getState();

  return AuthService.onAuthStateChange(async (event, session) => {
    console.log('Auth state changed:', event, session);

    if (event === 'SIGNED_IN' && session?.user) {
      const { user, error } = await AuthService.getCurrentUser();
      
      if (user && !error) {
        setUser(user);
        setAuthenticated(true);
      }
    } else if (event === 'SIGNED_OUT') {
      setUser(null);
      setAuthenticated(false);
    }
  });
};
