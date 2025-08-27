export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'trader';
  permissions: string[];
  lastLogin?: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface SessionTimeoutConfig {
  warningTime: number; // minutes before showing warning
  maxIdleTime: number; // minutes of inactivity before auto logout
}
