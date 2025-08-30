'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'

export function useAuth() {
  const { data: session, status, update } = useSession()
  const router = useRouter()

  const isLoading = status === 'loading'
  const isAuthenticated = status === 'authenticated'

  // Transform NextAuth user to match the expected User interface
  const user = session?.user ? {
    id: session.user.id,
    email: session.user.email || '',
    name: session.user.name || '',
    role: 'admin' as const, // Default role, should be extracted from Keycloak token
    permissions: ['read', 'write', 'admin'], // Default permissions, should be extracted from Keycloak token
    lastLogin: new Date(),
  } : null

  // Handle session errors (like token refresh failures)
  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      // Force sign out if refresh token is invalid
      signOut({ callbackUrl: '/login' })
    }
  }, [session?.error])

  const logout = useCallback(async () => {
    try {
      await signOut({ 
        callbackUrl: '/login',
        redirect: true 
      })
    } catch (error) {
      console.error('Logout error:', error)
      // Force redirect to login even if logout fails
      router.push('/login')
    }
  }, [router])

  const refreshSession = useCallback(async () => {
    try {
      await update()
    } catch (error) {
      console.error('Session refresh error:', error)
    }
  }, [update])

  return {
    user,
    session,
    isLoading,
    isAuthenticated,
    logout,
    refreshSession,
    accessToken: session?.access_token,
  }
}
