import { useEffect, useCallback, useRef } from 'react';
import { useAuthStore } from '../stores/auth-store';

export interface UseSessionTimeoutOptions {
  onWarning?: () => void;
  onTimeout?: () => void;
  warningTime?: number; // minutes before timeout to show warning
  maxIdleTime?: number; // minutes of inactivity before timeout
}

export const useSessionTimeout = (options: UseSessionTimeoutOptions = {}) => {
  const {
    updateActivity,
    showSessionWarning,
    hideSessionWarning,
    logout,
    sessionConfig,
    sessionWarningShown,
    isAuthenticated,
  } = useAuthStore();

  const warningTimeoutRef = useRef<NodeJS.Timeout>();
  const logoutTimeoutRef = useRef<NodeJS.Timeout>();
  const lastActivityRef = useRef<Date>(new Date());

  const warningTime = options.warningTime || sessionConfig.warningTime;
  const maxIdleTime = options.maxIdleTime || sessionConfig.maxIdleTime;

  const resetTimers = useCallback(() => {
    // Clear existing timers
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
    }
    if (logoutTimeoutRef.current) {
      clearTimeout(logoutTimeoutRef.current);
    }

    if (!isAuthenticated) return;

    // Set warning timer
    const warningTimeMs = (maxIdleTime - warningTime) * 60 * 1000;
    warningTimeoutRef.current = setTimeout(() => {
      showSessionWarning();
      options.onWarning?.();
    }, warningTimeMs);

    // Set logout timer
    const logoutTimeMs = maxIdleTime * 60 * 1000;
    logoutTimeoutRef.current = setTimeout(async () => {
      await logout();
      options.onTimeout?.();
    }, logoutTimeMs);
  }, [isAuthenticated, maxIdleTime, warningTime, showSessionWarning, logout, options]);

  const handleActivity = useCallback(() => {
    if (!isAuthenticated) return;
    
    const now = new Date();
    const timeSinceLastActivity = now.getTime() - lastActivityRef.current.getTime();
    
    // Only update if more than 1 minute has passed to avoid excessive updates
    if (timeSinceLastActivity > 60000) {
      lastActivityRef.current = now;
      updateActivity();
      hideSessionWarning();
      resetTimers();
    }
  }, [isAuthenticated, updateActivity, hideSessionWarning, resetTimers]);

  const extendSession = useCallback(() => {
    handleActivity();
  }, [handleActivity]);

  useEffect(() => {
    if (!isAuthenticated) {
      // Clear timers when not authenticated
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
      if (logoutTimeoutRef.current) {
        clearTimeout(logoutTimeoutRef.current);
      }
      return;
    }

    // Set up activity listeners
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Initialize timers
    resetTimers();

    return () => {
      // Clean up event listeners
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });

      // Clear timers
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
      if (logoutTimeoutRef.current) {
        clearTimeout(logoutTimeoutRef.current);
      }
    };
  }, [isAuthenticated, handleActivity, resetTimers]);

  return {
    sessionWarningShown,
    extendSession,
    timeUntilWarning: warningTime,
    timeUntilTimeout: maxIdleTime,
  };
};
