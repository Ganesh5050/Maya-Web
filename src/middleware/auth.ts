// Authentication Middleware for Maya-Web API
import { Request, Response, NextFunction } from 'express';
import { supabase } from '../lib/supabase';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    name?: string;
    plan: string;
  };
}

export const auth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    // Verify token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ success: false, error: 'Invalid token' });
    }

    // Get user profile from our users table
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      // Create user profile if it doesn't exist
      const { data: newProfile } = await supabase
        .from('users')
        .insert({
          id: user.id,
          email: user.email || '',
          name: user.user_metadata?.name || user.email?.split('@')[0],
          plan: 'free'
        })
        .select()
        .single();

      req.user = {
        id: user.id,
        email: user.email || '',
        name: newProfile?.name,
        plan: newProfile?.plan || 'free'
      };
    } else {
      req.user = {
        id: userProfile.id,
        email: userProfile.email,
        name: userProfile.name,
        plan: userProfile.plan
      };
    }

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ success: false, error: 'Authentication failed' });
  }
};

// Optional auth - doesn't fail if no token
export const optionalAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (token) {
      const { data: { user }, error } = await supabase.auth.getUser(token);
      
      if (!error && user) {
        const { data: userProfile } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        req.user = {
          id: user.id,
          email: user.email || '',
          name: userProfile?.name,
          plan: userProfile?.plan || 'free'
        };
      }
    }

    next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    next(); // Continue even if auth fails
  }
};

// Rate limiting middleware
export const rateLimit = (maxRequests: number = 100, windowMs: number = 15 * 60 * 1000) => {
  const requests = new Map<string, { count: number; resetTime: number }>();

  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip || 'unknown';
    const now = Date.now();
    
    const userRequests = requests.get(key);
    
    if (!userRequests || now > userRequests.resetTime) {
      requests.set(key, { count: 1, resetTime: now + windowMs });
      return next();
    }
    
    if (userRequests.count >= maxRequests) {
      return res.status(429).json({ 
        success: false, 
        error: 'Too many requests',
        retryAfter: Math.ceil((userRequests.resetTime - now) / 1000)
      });
    }
    
    userRequests.count++;
    next();
  };
};

// CORS middleware
export const cors = (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
};
