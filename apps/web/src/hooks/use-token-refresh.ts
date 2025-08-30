'use client'

import { useEffect, useRef } from 'react'
import { useAuth } from '@banking/services'

export function useTokenRefresh() {
  const { accessToken, refreshSession: update } = useAuth()
  const refreshTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // Clear existing timeout
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current)
    }

    if (!accessToken) {
      return
    }

    // Calculate time until token refresh (5 minutes before expiration)
    const now = Date.now()
    const tokenData = parseJwt(accessToken)
    
    if (!tokenData?.exp) {
      return
    }

    const expirationTime = tokenData.exp * 1000 // Convert to milliseconds
    const fiveMinutesInMs = 5 * 60 * 1000
    const refreshTime = expirationTime - fiveMinutesInMs
    const timeUntilRefresh = refreshTime - now

    // Only set timeout if refresh time is in the future
    if (timeUntilRefresh > 0) {
      refreshTimeoutRef.current = setTimeout(async () => {
        try {
          console.log('Refreshing token proactively...')
          await update()
        } catch (error) {
          console.error('Token refresh failed:', error)
        }
      }, timeUntilRefresh)
    }

    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current)
      }
    }
  }, [accessToken, update])
}

// Helper function to parse JWT token
function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('Failed to parse JWT:', error)
    return null
  }
}
