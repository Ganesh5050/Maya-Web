// Enhanced Authentication Service
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
  role: 'user' | 'admin' | 'moderator';
  isVerified: boolean;
  twoFactorEnabled: boolean;
  lastLogin: string;
  createdAt: string;
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    notifications: boolean;
    emailUpdates: boolean;
    twoFactor: boolean;
    sessionTimeout: number;
  };
  stats: {
    projects: number;
    templates: number;
    exports: number;
    collaborations: number;
  };
  security: {
    passwordStrength: 'weak' | 'medium' | 'strong';
    lastPasswordChange: string;
    loginAttempts: number;
    blockedUntil?: string;
  };
}

export interface LoginSession {
  id: string;
  userId: string;
  device: string;
  browser: string;
  location: string;
  ipAddress: string;
  userAgent: string;
  lastActive: string;
  createdAt: string;
  isCurrent: boolean;
  isActive: boolean;
}

export interface SecurityEvent {
  id: string;
  userId: string;
  type: 'login' | 'logout' | 'password_change' | 'two_factor_enabled' | 'two_factor_disabled' | 'suspicious_activity' | 'account_locked' | 'account_unlocked';
  description: string;
  timestamp: string;
  location: string;
  ipAddress: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  metadata?: Record<string, any>;
}

export interface TwoFactorSetup {
  qrCode: string;
  secret: string;
  backupCodes: string[];
  isVerified: boolean;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  refreshToken?: string;
  requiresTwoFactor?: boolean;
  error?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
  twoFactorCode?: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

class AuthenticationService {
  private users: Map<string, User> = new Map();
  private sessions: Map<string, LoginSession> = new Map();
  private securityEvents: Map<string, SecurityEvent[]> = new Map();
  private twoFactorSecrets: Map<string, TwoFactorSetup> = new Map();
  private loginAttempts: Map<string, { count: number; lastAttempt: number; blockedUntil?: number }> = new Map();
  
  private readonly MAX_LOGIN_ATTEMPTS = 5;
  private readonly BLOCK_DURATION = 15 * 60 * 1000; // 15 minutes
  private readonly SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  constructor() {
    this.initializeDemoData();
  }

  private initializeDemoData() {
    // Demo user
    const demoUser: User = {
      id: '1',
      name: 'John Doe',
      email: 'admin@aura.com',
      avatar: '/avatars/john.jpg',
      plan: 'pro',
      role: 'user',
      isVerified: true,
      twoFactorEnabled: false,
      lastLogin: new Date().toISOString(),
      createdAt: '2024-01-15T00:00:00Z',
      preferences: {
        theme: 'dark',
        notifications: true,
        emailUpdates: true,
        twoFactor: false,
        sessionTimeout: 30
      },
      stats: {
        projects: 12,
        templates: 8,
        exports: 24,
        collaborations: 6
      },
      security: {
        passwordStrength: 'strong',
        lastPasswordChange: '2024-01-01T00:00:00Z',
        loginAttempts: 0
      }
    };

    this.users.set(demoUser.id, demoUser);
    this.users.set(demoUser.email, demoUser);

    // Demo sessions
    const currentSession: LoginSession = {
      id: 'session-1',
      userId: demoUser.id,
      device: 'MacBook Pro',
      browser: 'Chrome 120',
      location: 'New York, US',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      lastActive: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      isCurrent: true,
      isActive: true
    };

    this.sessions.set(currentSession.id, currentSession);

    // Demo security events
    const events: SecurityEvent[] = [
      {
        id: 'event-1',
        userId: demoUser.id,
        type: 'login',
        description: 'Successful login from Chrome on MacBook Pro',
        timestamp: new Date().toISOString(),
        location: 'New York, US',
        ipAddress: '192.168.1.100',
        severity: 'low'
      },
      {
        id: 'event-2',
        userId: demoUser.id,
        type: 'password_change',
        description: 'Password changed successfully',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        location: 'New York, US',
        ipAddress: '192.168.1.100',
        severity: 'medium'
      }
    ];

    this.securityEvents.set(demoUser.id, events);
  }

  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const { email, password, rememberMe, twoFactorCode } = credentials;

      // Check if user is blocked
      const attempts = this.loginAttempts.get(email);
      if (attempts && attempts.blockedUntil && Date.now() < attempts.blockedUntil) {
        const remainingTime = Math.ceil((attempts.blockedUntil - Date.now()) / 60000);
        return {
          success: false,
          error: `Account temporarily blocked. Try again in ${remainingTime} minutes.`
        };
      }

      // Find user
      const user = this.users.get(email);
      if (!user) {
        this.recordFailedAttempt(email);
        return {
          success: false,
          error: 'Invalid email or password'
        };
      }

      // Demo password check (in real app, this would be hashed)
      if (password !== 'password') {
        this.recordFailedAttempt(email);
        this.recordSecurityEvent(user.id, {
          type: 'suspicious_activity',
          description: 'Failed login attempt',
          severity: 'medium',
          metadata: { email, ipAddress: this.getClientIP() }
        });
        return {
          success: false,
          error: 'Invalid email or password'
        };
      }

      // Check two-factor authentication
      if (user.twoFactorEnabled) {
        if (!twoFactorCode) {
          return {
            success: false,
            requiresTwoFactor: true,
            error: 'Two-factor authentication required'
          };
        }

        if (!this.verifyTwoFactorCode(user.id, twoFactorCode)) {
          this.recordFailedAttempt(email);
          return {
            success: false,
            error: 'Invalid two-factor authentication code'
          };
        }
      }

      // Clear failed attempts
      this.loginAttempts.delete(email);

      // Update user
      user.lastLogin = new Date().toISOString();
      user.security.loginAttempts = 0;

      // Create session
      const session = this.createSession(user.id, {
        device: this.getDeviceInfo(),
        browser: this.getBrowserInfo(),
        location: this.getLocationInfo(),
        ipAddress: this.getClientIP(),
        userAgent: navigator.userAgent
      });

      // Record successful login
      this.recordSecurityEvent(user.id, {
        type: 'login',
        description: 'Successful login',
        severity: 'low'
      });

      return {
        success: true,
        user,
        token: this.generateToken(user.id),
        refreshToken: this.generateRefreshToken(user.id)
      };

    } catch (error) {
      return {
        success: false,
        error: 'An unexpected error occurred'
      };
    }
  }

  // Register user
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const { name, email, password, confirmPassword, acceptTerms } = credentials;

      // Validation
      if (!acceptTerms) {
        return {
          success: false,
          error: 'You must accept the terms and conditions'
        };
      }

      if (password !== confirmPassword) {
        return {
          success: false,
          error: 'Passwords do not match'
        };
      }

      if (this.users.has(email)) {
        return {
          success: false,
          error: 'An account with this email already exists'
        };
      }

      // Create user
      const userId = this.generateUserId();
      const user: User = {
        id: userId,
        name,
        email,
        plan: 'free',
        role: 'user',
        isVerified: false,
        twoFactorEnabled: false,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        preferences: {
          theme: 'dark',
          notifications: true,
          emailUpdates: true,
          twoFactor: false,
          sessionTimeout: 30
        },
        stats: {
          projects: 0,
          templates: 0,
          exports: 0,
          collaborations: 0
        },
        security: {
          passwordStrength: this.calculatePasswordStrength(password),
          lastPasswordChange: new Date().toISOString(),
          loginAttempts: 0
        }
      };

      this.users.set(userId, user);
      this.users.set(email, user);

      // Create session
      const session = this.createSession(userId, {
        device: this.getDeviceInfo(),
        browser: this.getBrowserInfo(),
        location: this.getLocationInfo(),
        ipAddress: this.getClientIP(),
        userAgent: navigator.userAgent
      });

      // Record registration event
      this.recordSecurityEvent(userId, {
        type: 'login',
        description: 'Account created successfully',
        severity: 'low'
      });

      return {
        success: true,
        user,
        token: this.generateToken(userId),
        refreshToken: this.generateRefreshToken(userId)
      };

    } catch (error) {
      return {
        success: false,
        error: 'An unexpected error occurred during registration'
      };
    }
  }

  // Logout user
  async logout(userId: string, sessionId?: string): Promise<boolean> {
    try {
      if (sessionId) {
        // Logout specific session
        const session = this.sessions.get(sessionId);
        if (session && session.userId === userId) {
          session.isActive = false;
          this.recordSecurityEvent(userId, {
            type: 'logout',
            description: 'Session terminated',
            severity: 'low'
          });
        }
      } else {
        // Logout all sessions
        for (const session of this.sessions.values()) {
          if (session.userId === userId) {
            session.isActive = false;
          }
        }
        this.recordSecurityEvent(userId, {
          type: 'logout',
          description: 'All sessions terminated',
          severity: 'low'
        });
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  // Change password
  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<AuthResponse> {
    try {
      const user = this.users.get(userId);
      if (!user) {
        return {
          success: false,
          error: 'User not found'
        };
      }

      // Verify current password (demo)
      if (currentPassword !== 'password') {
        return {
          success: false,
          error: 'Current password is incorrect'
        };
      }

      // Update password
      user.security.passwordStrength = this.calculatePasswordStrength(newPassword);
      user.security.lastPasswordChange = new Date().toISOString();

      // Record security event
      this.recordSecurityEvent(userId, {
        type: 'password_change',
        description: 'Password changed successfully',
        severity: 'medium'
      });

      return {
        success: true,
        user
      };

    } catch (error) {
      return {
        success: false,
        error: 'An unexpected error occurred'
      };
    }
  }

  // Setup two-factor authentication
  async setupTwoFactor(userId: string): Promise<TwoFactorSetup> {
    const secret = this.generateTwoFactorSecret();
    const qrCode = this.generateQRCode(userId, secret);
    const backupCodes = this.generateBackupCodes();

    const setup: TwoFactorSetup = {
      qrCode,
      secret,
      backupCodes,
      isVerified: false
    };

    this.twoFactorSecrets.set(userId, setup);
    return setup;
  }

  // Enable two-factor authentication
  async enableTwoFactor(userId: string, code: string): Promise<AuthResponse> {
    try {
      const user = this.users.get(userId);
      if (!user) {
        return {
          success: false,
          error: 'User not found'
        };
      }

      const setup = this.twoFactorSecrets.get(userId);
      if (!setup) {
        return {
          success: false,
          error: 'Two-factor setup not found'
        };
      }

      if (!this.verifyTwoFactorCode(userId, code)) {
        return {
          success: false,
          error: 'Invalid verification code'
        };
      }

      user.twoFactorEnabled = true;
      user.preferences.twoFactor = true;
      setup.isVerified = true;

      this.recordSecurityEvent(userId, {
        type: 'two_factor_enabled',
        description: 'Two-factor authentication enabled',
        severity: 'medium'
      });

      return {
        success: true,
        user
      };

    } catch (error) {
      return {
        success: false,
        error: 'An unexpected error occurred'
      };
    }
  }

  // Disable two-factor authentication
  async disableTwoFactor(userId: string, password: string): Promise<AuthResponse> {
    try {
      const user = this.users.get(userId);
      if (!user) {
        return {
          success: false,
          error: 'User not found'
        };
      }

      // Verify password
      if (password !== 'password') {
        return {
          success: false,
          error: 'Password is incorrect'
        };
      }

      user.twoFactorEnabled = false;
      user.preferences.twoFactor = false;
      this.twoFactorSecrets.delete(userId);

      this.recordSecurityEvent(userId, {
        type: 'two_factor_disabled',
        description: 'Two-factor authentication disabled',
        severity: 'medium'
      });

      return {
        success: true,
        user
      };

    } catch (error) {
      return {
        success: false,
        error: 'An unexpected error occurred'
      };
    }
  }

  // Get user sessions
  async getUserSessions(userId: string): Promise<LoginSession[]> {
    const userSessions = Array.from(this.sessions.values())
      .filter(session => session.userId === userId && session.isActive)
      .sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime());

    return userSessions;
  }

  // Revoke session
  async revokeSession(userId: string, sessionId: string): Promise<boolean> {
    const session = this.sessions.get(sessionId);
    if (session && session.userId === userId) {
      session.isActive = false;
      this.recordSecurityEvent(userId, {
        type: 'logout',
        description: 'Session revoked',
        severity: 'low'
      });
      return true;
    }
    return false;
  }

  // Get security events
  async getSecurityEvents(userId: string, limit: number = 50): Promise<SecurityEvent[]> {
    const events = this.securityEvents.get(userId) || [];
    return events
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  // Update user preferences
  async updateUserPreferences(userId: string, preferences: Partial<User['preferences']>): Promise<AuthResponse> {
    try {
      const user = this.users.get(userId);
      if (!user) {
        return {
          success: false,
          error: 'User not found'
        };
      }

      user.preferences = { ...user.preferences, ...preferences };
      return {
        success: true,
        user
      };

    } catch (error) {
      return {
        success: false,
        error: 'An unexpected error occurred'
      };
    }
  }

  // Helper methods
  private recordFailedAttempt(email: string): void {
    const attempts = this.loginAttempts.get(email) || { count: 0, lastAttempt: 0 };
    attempts.count++;
    attempts.lastAttempt = Date.now();

    if (attempts.count >= this.MAX_LOGIN_ATTEMPTS) {
      attempts.blockedUntil = Date.now() + this.BLOCK_DURATION;
    }

    this.loginAttempts.set(email, attempts);
  }

  private recordSecurityEvent(userId: string, event: Omit<SecurityEvent, 'id' | 'userId' | 'timestamp' | 'location' | 'ipAddress'>): void {
    const securityEvent: SecurityEvent = {
      id: this.generateEventId(),
      userId,
      timestamp: new Date().toISOString(),
      location: this.getLocationInfo(),
      ipAddress: this.getClientIP(),
      ...event
    };

    const events = this.securityEvents.get(userId) || [];
    events.push(securityEvent);
    this.securityEvents.set(userId, events);
  }

  private createSession(userId: string, deviceInfo: any): LoginSession {
    const session: LoginSession = {
      id: this.generateSessionId(),
      userId,
      device: deviceInfo.device,
      browser: deviceInfo.browser,
      location: deviceInfo.location,
      ipAddress: deviceInfo.ipAddress,
      userAgent: deviceInfo.userAgent,
      lastActive: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      isCurrent: true,
      isActive: true
    };

    // Mark other sessions as not current
    for (const existingSession of this.sessions.values()) {
      if (existingSession.userId === userId) {
        existingSession.isCurrent = false;
      }
    }

    this.sessions.set(session.id, session);
    return session;
  }

  private verifyTwoFactorCode(userId: string, code: string): boolean {
    // Demo implementation - accept any 6-digit code
    return /^\d{6}$/.test(code);
  }

  private calculatePasswordStrength(password: string): 'weak' | 'medium' | 'strong' {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return 'weak';
    if (score <= 4) return 'medium';
    return 'strong';
  }

  private generateUserId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateEventId(): string {
    return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateToken(userId: string): string {
    return `token_${userId}_${Date.now()}`;
  }

  private generateRefreshToken(userId: string): string {
    return `refresh_${userId}_${Date.now()}`;
  }

  private generateTwoFactorSecret(): string {
    return Math.random().toString(36).substring(2, 15).toUpperCase();
  }

  private generateQRCode(userId: string, secret: string): string {
    // Demo QR code - in real implementation, generate actual QR code
    return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==`;
  }

  private generateBackupCodes(): string[] {
    const codes = [];
    for (let i = 0; i < 10; i++) {
      codes.push(Math.random().toString(36).substring(2, 10).toUpperCase());
    }
    return codes;
  }

  private getDeviceInfo(): string {
    const userAgent = navigator.userAgent;
    if (/Macintosh/.test(userAgent)) return 'MacBook Pro';
    if (/Windows/.test(userAgent)) return 'Windows PC';
    if (/iPhone/.test(userAgent)) return 'iPhone';
    if (/Android/.test(userAgent)) return 'Android Phone';
    return 'Unknown Device';
  }

  private getBrowserInfo(): string {
    const userAgent = navigator.userAgent;
    if (/Chrome/.test(userAgent)) return 'Chrome 120';
    if (/Firefox/.test(userAgent)) return 'Firefox 120';
    if (/Safari/.test(userAgent)) return 'Safari 17';
    if (/Edge/.test(userAgent)) return 'Edge 120';
    return 'Unknown Browser';
  }

  private getLocationInfo(): string {
    // Demo location - in real implementation, use IP geolocation
    return 'New York, US';
  }

  private getClientIP(): string {
    // Demo IP - in real implementation, get actual client IP
    return '192.168.1.100';
  }
}

// Export singleton instance
export const authenticationService = new AuthenticationService();
