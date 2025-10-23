// Security Middleware Service
export interface SecurityConfig {
  enableCSP: boolean;
  enableHSTS: boolean;
  enableXSSProtection: boolean;
  enableCSRFProtection: boolean;
  enableRateLimiting: boolean;
  enableContentSecurityPolicy: boolean;
  enableSecureHeaders: boolean;
  maxLoginAttempts: number;
  sessionTimeout: number;
  passwordMinLength: number;
  requireStrongPassword: boolean;
  enableTwoFactor: boolean;
  enableAuditLogging: boolean;
}

export interface SecurityHeaders {
  'Content-Security-Policy': string;
  'X-Frame-Options': string;
  'X-Content-Type-Options': string;
  'X-XSS-Protection': string;
  'Strict-Transport-Security': string;
  'Referrer-Policy': string;
  'Permissions-Policy': string;
}

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  skipSuccessfulRequests: boolean;
  skipFailedRequests: boolean;
}

export interface AuditLog {
  id: string;
  userId?: string;
  action: string;
  resource: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  success: boolean;
  details?: Record<string, any>;
}

export interface SecurityViolation {
  id: string;
  type: 'xss' | 'csrf' | 'injection' | 'rate_limit' | 'unauthorized_access' | 'suspicious_activity';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  blocked: boolean;
  metadata?: Record<string, any>;
}

class SecurityMiddlewareService {
  private config: SecurityConfig;
  private auditLogs: AuditLog[] = [];
  private violations: SecurityViolation[] = [];
  private rateLimitTracker: Map<string, { count: number; resetTime: number }> = new Map();
  private blockedIPs: Set<string> = new Set();
  private suspiciousPatterns: RegExp[] = [];

  constructor() {
    this.config = {
      enableCSP: true,
      enableHSTS: true,
      enableXSSProtection: true,
      enableCSRFProtection: true,
      enableRateLimiting: true,
      enableContentSecurityPolicy: true,
      enableSecureHeaders: true,
      maxLoginAttempts: 5,
      sessionTimeout: 30 * 60 * 1000, // 30 minutes
      passwordMinLength: 8,
      requireStrongPassword: true,
      enableTwoFactor: true,
      enableAuditLogging: true
    };

    this.initializeSuspiciousPatterns();
  }

  private initializeSuspiciousPatterns() {
    this.suspiciousPatterns = [
      /<script[^>]*>.*?<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<iframe[^>]*>/gi,
      /<object[^>]*>/gi,
      /<embed[^>]*>/gi,
      /<link[^>]*>/gi,
      /<meta[^>]*>/gi,
      /<style[^>]*>.*?<\/style>/gi,
      /expression\s*\(/gi,
      /url\s*\(/gi,
      /@import/gi,
      /eval\s*\(/gi,
      /setTimeout\s*\(/gi,
      /setInterval\s*\(/gi,
      /Function\s*\(/gi,
      /document\.cookie/gi,
      /document\.write/gi,
      /window\.location/gi,
      /document\.location/gi,
      /\.innerHTML/gi,
      /\.outerHTML/gi,
      /\.insertAdjacentHTML/gi
    ];
  }

  // Generate security headers
  generateSecurityHeaders(): SecurityHeaders {
    const headers: SecurityHeaders = {
      'Content-Security-Policy': this.generateCSP(),
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()'
    };

    return headers;
  }

  // Generate Content Security Policy
  private generateCSP(): string {
    const directives = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://api.openai.com https://api.anthropic.com https://api.google.com",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests"
    ];

    return directives.join('; ');
  }

  // Rate limiting middleware
  async checkRateLimit(ipAddress: string, endpoint: string): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    if (!this.config.enableRateLimiting) {
      return { allowed: true, remaining: Infinity, resetTime: 0 };
    }

    const key = `${ipAddress}:${endpoint}`;
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const maxRequests = 100;

    const current = this.rateLimitTracker.get(key);
    
    if (!current || now > current.resetTime) {
      // New window or expired window
      this.rateLimitTracker.set(key, {
        count: 1,
        resetTime: now + windowMs
      });
      return { allowed: true, remaining: maxRequests - 1, resetTime: now + windowMs };
    }

    if (current.count >= maxRequests) {
      // Rate limit exceeded
      this.recordViolation({
        type: 'rate_limit',
        severity: 'medium',
        description: `Rate limit exceeded for ${endpoint}`,
        ipAddress,
        blocked: true,
        metadata: { endpoint, count: current.count }
      });
      return { allowed: false, remaining: 0, resetTime: current.resetTime };
    }

    // Increment counter
    current.count++;
    this.rateLimitTracker.set(key, current);
    
    return { 
      allowed: true, 
      remaining: maxRequests - current.count, 
      resetTime: current.resetTime 
    };
  }

  // XSS protection
  sanitizeInput(input: string): { sanitized: string; violations: string[] } {
    const violations: string[] = [];
    let sanitized = input;

    for (const pattern of this.suspiciousPatterns) {
      if (pattern.test(input)) {
        violations.push(`XSS pattern detected: ${pattern.source}`);
        sanitized = sanitized.replace(pattern, '');
      }
    }

    // Additional sanitization
    sanitized = sanitized
      .replace(/[<>]/g, '') // Remove angle brackets
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '') // Remove event handlers
      .trim();

    if (violations.length > 0) {
      this.recordViolation({
        type: 'xss',
        severity: 'high',
        description: 'XSS attack attempt detected',
        blocked: true,
        metadata: { violations, originalInput: input, sanitizedInput: sanitized }
      });
    }

    return { sanitized, violations };
  }

  // CSRF protection
  generateCSRFToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  validateCSRFToken(token: string, sessionToken: string): boolean {
    if (!this.config.enableCSRFProtection) return true;
    
    const isValid = token === sessionToken && token.length === 64;
    
    if (!isValid) {
      this.recordViolation({
        type: 'csrf',
        severity: 'high',
        description: 'Invalid CSRF token',
        blocked: true,
        metadata: { providedToken: token, sessionToken }
      });
    }

    return isValid;
  }

  // Password strength validation
  validatePassword(password: string): { isValid: boolean; score: number; feedback: string[] } {
    const feedback: string[] = [];
    let score = 0;

    if (password.length < this.config.passwordMinLength) {
      feedback.push(`Password must be at least ${this.config.passwordMinLength} characters long`);
    } else {
      score++;
    }

    if (!/[a-z]/.test(password)) {
      feedback.push('Password must contain at least one lowercase letter');
    } else {
      score++;
    }

    if (!/[A-Z]/.test(password)) {
      feedback.push('Password must contain at least one uppercase letter');
    } else {
      score++;
    }

    if (!/[0-9]/.test(password)) {
      feedback.push('Password must contain at least one number');
    } else {
      score++;
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      feedback.push('Password must contain at least one special character');
    } else {
      score++;
    }

    // Check for common passwords
    const commonPasswords = ['password', '123456', 'qwerty', 'admin', 'letmein'];
    if (commonPasswords.includes(password.toLowerCase())) {
      feedback.push('Password is too common');
      score = Math.max(0, score - 2);
    }

    const isValid = score >= 4 && password.length >= this.config.passwordMinLength;
    
    return { isValid, score, feedback };
  }

  // IP blocking
  isIPBlocked(ipAddress: string): boolean {
    return this.blockedIPs.has(ipAddress);
  }

  blockIP(ipAddress: string, reason: string, duration: number = 24 * 60 * 60 * 1000): void {
    this.blockedIPs.add(ipAddress);
    
    this.recordViolation({
      type: 'unauthorized_access',
      severity: 'high',
      description: `IP blocked: ${reason}`,
      ipAddress,
      blocked: true,
      metadata: { reason, duration }
    });

    // Auto-unblock after duration
    setTimeout(() => {
      this.blockedIPs.delete(ipAddress);
    }, duration);
  }

  unblockIP(ipAddress: string): void {
    this.blockedIPs.delete(ipAddress);
  }

  // Audit logging
  logAuditEvent(event: Omit<AuditLog, 'id' | 'timestamp'>): void {
    if (!this.config.enableAuditLogging) return;

    const auditLog: AuditLog = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      ...event
    };

    this.auditLogs.push(auditLog);

    // Keep only last 10000 logs
    if (this.auditLogs.length > 10000) {
      this.auditLogs = this.auditLogs.slice(-10000);
    }
  }

  // Security violation recording
  private recordViolation(violation: Omit<SecurityViolation, 'id' | 'timestamp'>): void {
    const securityViolation: SecurityViolation = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      ...violation
    };

    this.violations.push(securityViolation);

    // Keep only last 5000 violations
    if (this.violations.length > 5000) {
      this.violations = this.violations.slice(-5000);
    }

    // Auto-block IP for critical violations
    if (violation.severity === 'critical' && violation.ipAddress) {
      this.blockIP(violation.ipAddress, 'Critical security violation', 24 * 60 * 60 * 1000);
    }
  }

  // Session security
  validateSession(sessionId: string, userId: string): { isValid: boolean; reason?: string } {
    // Demo implementation - in real app, validate against session store
    if (!sessionId || !userId) {
      return { isValid: false, reason: 'Missing session or user ID' };
    }

    // Check if session is expired
    const sessionData = this.getSessionData(sessionId);
    if (!sessionData) {
      return { isValid: false, reason: 'Session not found' };
    }

    if (sessionData.userId !== userId) {
      return { isValid: false, reason: 'Session user mismatch' };
    }

    if (Date.now() > sessionData.expiresAt) {
      return { isValid: false, reason: 'Session expired' };
    }

    return { isValid: true };
  }

  // Demo session data - in real app, this would come from a session store
  private getSessionData(sessionId: string): { userId: string; expiresAt: number } | null {
    // Mock session data
    return {
      userId: 'user_1',
      expiresAt: Date.now() + this.config.sessionTimeout
    };
  }

  // Security analytics
  getSecurityAnalytics(): {
    totalViolations: number;
    violationsByType: Record<string, number>;
    violationsBySeverity: Record<string, number>;
    blockedIPs: number;
    topViolatingIPs: Array<{ ip: string; count: number }>;
    recentViolations: SecurityViolation[];
  } {
    const violationsByType: Record<string, number> = {};
    const violationsBySeverity: Record<string, number> = {};
    const ipViolationCount: Record<string, number> = {};

    for (const violation of this.violations) {
      violationsByType[violation.type] = (violationsByType[violation.type] || 0) + 1;
      violationsBySeverity[violation.severity] = (violationsBySeverity[violation.severity] || 0) + 1;
      
      if (violation.ipAddress) {
        ipViolationCount[violation.ipAddress] = (ipViolationCount[violation.ipAddress] || 0) + 1;
      }
    }

    const topViolatingIPs = Object.entries(ipViolationCount)
      .map(([ip, count]) => ({ ip, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const recentViolations = this.violations
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 50);

    return {
      totalViolations: this.violations.length,
      violationsByType,
      violationsBySeverity,
      blockedIPs: this.blockedIPs.size,
      topViolatingIPs,
      recentViolations
    };
  }

  // Configuration management
  updateSecurityConfig(newConfig: Partial<SecurityConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    this.logAuditEvent({
      action: 'security_config_updated',
      resource: 'security_middleware',
      success: true,
      details: { updatedConfig: newConfig }
    });
  }

  getSecurityConfig(): SecurityConfig {
    return { ...this.config };
  }

  // Utility methods
  private generateId(): string {
    return `sec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Cleanup expired data
  cleanup(): void {
    const now = Date.now();
    
    // Clean up expired rate limit entries
    for (const [key, data] of this.rateLimitTracker.entries()) {
      if (now > data.resetTime) {
        this.rateLimitTracker.delete(key);
      }
    }

    // Clean up old audit logs (older than 30 days)
    const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);
    this.auditLogs = this.auditLogs.filter(log => 
      new Date(log.timestamp).getTime() > thirtyDaysAgo
    );

    // Clean up old violations (older than 7 days)
    const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);
    this.violations = this.violations.filter(violation => 
      new Date(violation.timestamp).getTime() > sevenDaysAgo
    );
  }
}

// Export singleton instance
export const securityMiddleware = new SecurityMiddlewareService();

// Auto-cleanup every hour
setInterval(() => {
  securityMiddleware.cleanup();
}, 60 * 60 * 1000);
