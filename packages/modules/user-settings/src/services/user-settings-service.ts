import { UserProfile, UserPreferences, SecuritySettings, AuditLog } from '../types';

// Mock data for demo
const mockUserProfile: UserProfile = {
  id: '1',
  email: 'admin@banking.com',
  name: 'Administrator',
  firstName: 'Admin',
  lastName: 'User',
  phone: '+1-555-0123',
  department: 'IT Administration',
  position: 'System Administrator',
  timezone: 'America/New_York',
  language: 'en-US',
  dateFormat: 'MM/DD/YYYY',
  currency: 'USD',
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date(),
};

const mockUserPreferences: UserPreferences = {
  id: '1',
  userId: '1',
  theme: 'light',
  notifications: {
    email: true,
    push: true,
    sms: false,
    trading: true,
    security: true,
    system: true,
  },
  dashboard: {
    layout: 'grid',
    widgets: ['portfolio', 'market-data', 'recent-orders', 'alerts'],
    refreshInterval: 30,
  },
  trading: {
    confirmOrders: true,
    defaultOrderType: 'limit',
    riskWarnings: true,
    autoRefresh: true,
  },
};

const mockSecuritySettings: SecuritySettings = {
  id: '1',
  userId: '1',
  twoFactorEnabled: true,
  twoFactorMethod: 'authenticator',
  sessionTimeout: 30,
  ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],
  loginNotifications: true,
  passwordLastChanged: new Date('2024-06-15'),
  securityQuestions: [
    {
      id: '1',
      question: 'What was the name of your first pet?',
      answer: 'hashed_answer_1',
    },
    {
      id: '2',
      question: 'In what city were you born?',
      answer: 'hashed_answer_2',
    },
  ],
};

const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    userId: '1',
    action: 'LOGIN',
    resource: 'authentication',
    timestamp: new Date(),
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0...',
    success: true,
  },
  {
    id: '2',
    userId: '1',
    action: 'UPDATE_PROFILE',
    resource: 'user-profile',
    timestamp: new Date(Date.now() - 3600000),
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0...',
    success: true,
    details: { field: 'phone' },
  },
  {
    id: '3',
    userId: '1',
    action: 'CHANGE_PASSWORD',
    resource: 'security',
    timestamp: new Date(Date.now() - 86400000),
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0...',
    success: true,
  },
];

export class UserSettingsService {
  // Profile Management Feature 1: User Profile Management
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return userId === '1' ? mockUserProfile : null;
  }

  async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedProfile = {
      ...mockUserProfile,
      ...updates,
      updatedAt: new Date(),
    };
    
    // In real implementation, this would update the database
    Object.assign(mockUserProfile, updatedProfile);
    
    return updatedProfile;
  }

  // Profile Management Feature 2: User Preferences
  async getUserPreferences(userId: string): Promise<UserPreferences | null> {
    await new Promise(resolve => setTimeout(resolve, 250));
    return userId === '1' ? mockUserPreferences : null;
  }

  async updateUserPreferences(userId: string, updates: Partial<UserPreferences>): Promise<UserPreferences> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const updatedPreferences = {
      ...mockUserPreferences,
      ...updates,
    };
    
    Object.assign(mockUserPreferences, updatedPreferences);
    
    return updatedPreferences;
  }

  // Security Settings Feature 1: Security Configuration
  async getSecuritySettings(userId: string): Promise<SecuritySettings | null> {
    await new Promise(resolve => setTimeout(resolve, 350));
    return userId === '1' ? mockSecuritySettings : null;
  }

  async updateSecuritySettings(userId: string, updates: Partial<SecuritySettings>): Promise<SecuritySettings> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const updatedSettings = {
      ...mockSecuritySettings,
      ...updates,
    };
    
    Object.assign(mockSecuritySettings, updatedSettings);
    
    return updatedSettings;
  }

  async enableTwoFactor(userId: string, method: 'sms' | 'email' | 'authenticator'): Promise<{ secret?: string; qrCode?: string }> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    mockSecuritySettings.twoFactorEnabled = true;
    mockSecuritySettings.twoFactorMethod = method;
    
    if (method === 'authenticator') {
      return {
        secret: 'JBSWY3DPEHPK3PXP',
        qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
      };
    }
    
    return {};
  }

  async disableTwoFactor(userId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    mockSecuritySettings.twoFactorEnabled = false;
    return true;
  }

  // Security Settings Feature 2: Audit Log and Activity Monitoring
  async getAuditLogs(userId: string, limit: number = 50): Promise<AuditLog[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockAuditLogs
      .filter(log => log.userId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  async getSecuritySummary(userId: string) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const recentLogs = mockAuditLogs
      .filter(log => log.userId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 10);
    
    const failedLogins = recentLogs.filter(log => 
      log.action === 'LOGIN' && !log.success
    ).length;
    
    const uniqueIPs = new Set(recentLogs.map(log => log.ipAddress)).size;
    
    const lastLogin = recentLogs.find(log => 
      log.action === 'LOGIN' && log.success
    );
    
    return {
      twoFactorEnabled: mockSecuritySettings.twoFactorEnabled,
      passwordAge: Math.floor(
        (Date.now() - mockSecuritySettings.passwordLastChanged.getTime()) / (1000 * 60 * 60 * 24)
      ),
      recentFailedLogins: failedLogins,
      uniqueIPsLast30Days: uniqueIPs,
      lastSuccessfulLogin: lastLogin?.timestamp,
      securityScore: this.calculateSecurityScore(),
    };
  }

  private calculateSecurityScore(): number {
    let score = 0;
    
    // Two-factor authentication
    if (mockSecuritySettings.twoFactorEnabled) score += 30;
    
    // Password age
    const passwordAge = Math.floor(
      (Date.now() - mockSecuritySettings.passwordLastChanged.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (passwordAge < 90) score += 20;
    else if (passwordAge < 180) score += 10;
    
    // Security questions
    if (mockSecuritySettings.securityQuestions.length >= 2) score += 15;
    
    // Session timeout
    if (mockSecuritySettings.sessionTimeout <= 30) score += 15;
    
    // Login notifications
    if (mockSecuritySettings.loginNotifications) score += 10;
    
    // IP whitelist
    if (mockSecuritySettings.ipWhitelist.length > 0) score += 10;
    
    return Math.min(score, 100);
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // In real implementation, verify current password
    mockSecuritySettings.passwordLastChanged = new Date();
    
    // Add audit log
    mockAuditLogs.unshift({
      id: `audit-${Date.now()}`,
      userId,
      action: 'CHANGE_PASSWORD',
      resource: 'security',
      timestamp: new Date(),
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0...',
      success: true,
    });
    
    return true;
  }
}

export const userSettingsService = new UserSettingsService();
