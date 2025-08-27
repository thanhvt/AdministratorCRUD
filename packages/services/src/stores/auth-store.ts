import { create } from 'zustand';
import { AuthState, User, LoginCredentials, SessionTimeoutConfig } from '../types/auth';
import { authService } from '../auth/auth-service';

interface AuthStore extends AuthState {
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  
  // Session timeout
  sessionConfig: SessionTimeoutConfig;
  lastActivity: Date;
  sessionWarningShown: boolean;
  updateActivity: () => void;
  showSessionWarning: () => void;
  hideSessionWarning: () => void;
  checkSessionTimeout: () => boolean;
}

const DEFAULT_SESSION_CONFIG: SessionTimeoutConfig = {
  warningTime: 5, // 5 minutes warning
  maxIdleTime: 30, // 30 minutes max idle
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  sessionConfig: DEFAULT_SESSION_CONFIG,
  lastActivity: new Date(),
  sessionWarningShown: false,

  // Actions
  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login(credentials);
      set({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        lastActivity: new Date(),
      });
    } catch (error: any) {
      set({
        error: error.message || 'Login failed',
        isLoading: false,
        isAuthenticated: false,
        user: null,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        sessionWarningShown: false,
      });
    }
  },

  refreshToken: async () => {
    try {
      await authService.refreshToken();
      set({ lastActivity: new Date() });
    } catch (error: any) {
      set({
        user: null,
        isAuthenticated: false,
        error: error.message || 'Token refresh failed',
      });
      throw error;
    }
  },

  getCurrentUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const user = await authService.getCurrentUser();
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
        lastActivity: new Date(),
      });
    } catch (error: any) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error.message || 'Failed to get user',
      });
    }
  },

  clearError: () => set({ error: null }),
  
  setLoading: (loading: boolean) => set({ isLoading: loading }),

  // Session timeout management
  updateActivity: () => {
    set({ 
      lastActivity: new Date(),
      sessionWarningShown: false 
    });
  },

  showSessionWarning: () => set({ sessionWarningShown: true }),
  
  hideSessionWarning: () => set({ sessionWarningShown: false }),

  checkSessionTimeout: () => {
    const { lastActivity, sessionConfig } = get();
    const now = new Date();
    const timeSinceLastActivity = (now.getTime() - lastActivity.getTime()) / (1000 * 60); // minutes
    
    return timeSinceLastActivity >= sessionConfig.maxIdleTime;
  },
}));
