'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@banking/services'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermissions?: string[]
  fallbackUrl?: string
}

export function ProtectedRoute({ 
  children, 
  requiredPermissions = [], 
  fallbackUrl = '/login' 
}: ProtectedRouteProps) {
  const { session, isLoading, isAuthenticated, error } = useAuth()
  const status = isLoading ? 'loading' : isAuthenticated ? 'authenticated' : 'unauthenticated'
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') {
      return // Still loading
    }

    if (status === 'unauthenticated') {
      router.push(fallbackUrl)
      return
    }

    // Check for session errors (like expired tokens)
    if (error === 'RefreshAccessTokenError') {
      router.push('/login')
      return
    }

    // TODO: Implement permission checking when roles/permissions are available from Keycloak
    // For now, we just check authentication
    if (requiredPermissions.length > 0) {
      // This would check against user permissions from Keycloak token
      console.log('Permission checking not yet implemented for:', requiredPermissions)
    }
  }, [session, status, router, requiredPermissions, fallbackUrl])

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Don't render children if not authenticated
  if (status === 'unauthenticated' || error === 'RefreshAccessTokenError') {
    return null
  }

  return <>{children}</>
}

// HOC version for wrapping pages
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options: Omit<ProtectedRouteProps, 'children'> = {}
) {
  return function AuthenticatedComponent(props: P) {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    )
  }
}
