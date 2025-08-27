export interface UserProfile {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  phone?: string;
  department?: string;
  position?: string;
  avatar?: string;
  timezone: string;
  language: string;
  dateFormat: string;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  id: string;
  userId: string;
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    trading: boolean;
    security: boolean;
    system: boolean;
  };
  dashboard: {
    layout: 'grid' | 'list';
    widgets: string[];
    refreshInterval: number;
  };
  trading: {
    confirmOrders: boolean;
    defaultOrderType: 'market' | 'limit';
    riskWarnings: boolean;
    autoRefresh: boolean;
  };
}

export interface SecuritySettings {
  id: string;
  userId: string;
  twoFactorEnabled: boolean;
  twoFactorMethod: 'sms' | 'email' | 'authenticator';
  sessionTimeout: number;
  ipWhitelist: string[];
  loginNotifications: boolean;
  passwordLastChanged: Date;
  securityQuestions: SecurityQuestion[];
}

export interface SecurityQuestion {
  id: string;
  question: string;
  answer: string; // This would be hashed in real implementation
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  success: boolean;
  details?: any;
}
