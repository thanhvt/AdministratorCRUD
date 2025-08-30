'use client'

import { useEffect, useCallback, useRef, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'

export interface UseSessionTimeoutOptions {
  onWarning?: () => void
  onTimeout?: () => void
  warningTime?: number // minutes before timeout to show warning
  maxIdleTime?: number // minutes of inactivity before timeout
}

export const useSessionTimeout = (options: UseSessionTimeoutOptions = {}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession()
  const [sessionWarningShown, setSessionWarningShown] = useState(false)
  
  const warningTimeoutRef = useRef<NodeJS.Timeout>()
  const logoutTimeoutRef = useRef<NodeJS.Timeout>()
  const lastActivityRef = useRef<Date>(new Date())

  const warningTime = options.warningTime || 5 // 5 minutes warning
  const maxIdleTime = options.maxIdleTime || 30 // 30 minutes max idle

  const isAuthenticated = status === 'authenticated'

  const resetTimers = useCallback(() => {
    // Clear existing timers
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current)
    }
    if (logoutTimeoutRef.current) {
      clearTimeout(logoutTimeoutRef.current)
    }

    if (!isAuthenticated) return

    // Set warning timer
    const warningTimeMs = (maxIdleTime - warningTime) * 60 * 1000
    warningTimeoutRef.current = setTimeout(() => {
      setSessionWarningShown(true)
      options.onWarning?.()
    }, warningTimeMs)

    // Set logout timer
    const logoutTimeMs = maxIdleTime * 60 * 1000
    logoutTimeoutRef.current = setTimeout(async () => {
      await signOut({ callbackUrl: '/login' })
      options.onTimeout?.()
    }, logoutTimeMs)
  }, [isAuthenticated, maxIdleTime, warningTime, options])

  const extendSession = useCallback(() => {
    // Directly hide the warning modal and reset the timers.
    setSessionWarningShown(false);
    lastActivityRef.current = new Date();
    resetTimers();
  }, [resetTimers]);

  const handleActivity = useCallback(() => {
    // If the warning is already shown, passive activity like mouse movement should not reset the timer.
    // The user must actively click the button in the modal.
    if (!isAuthenticated || sessionWarningShown) return;

    const now = new Date();
    const timeSinceLastActivity = now.getTime() - lastActivityRef.current.getTime();

    // Throttle to prevent excessive resets from constant events.
    if (timeSinceLastActivity > 60000) {
      lastActivityRef.current = new Date();
      resetTimers();
    }
  }, [isAuthenticated, sessionWarningShown, resetTimers]);

  const hideSessionWarning = useCallback(() => {
    setSessionWarningShown(false)
  }, [])

  useEffect(() => {
    if (!isAuthenticated) {
      // Clear timers when not authenticated
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current)
      }
      if (logoutTimeoutRef.current) {
        clearTimeout(logoutTimeoutRef.current)
      }
      setSessionWarningShown(false)
      return
    }

    // Set up activity listeners
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
    
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true)
    })

    // Initialize timers
    resetTimers()

    return () => {
      // Clean up event listeners
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true)
      })

      // Clear timers
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current)
      }
      if (logoutTimeoutRef.current) {
        clearTimeout(logoutTimeoutRef.current)
      }
    }
  }, [isAuthenticated, handleActivity, resetTimers])

  return {
    sessionWarningShown,
    extendSession,
    hideSessionWarning,
    timeUntilWarning: warningTime,
    timeUntilTimeout: maxIdleTime,
  }
}
