'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, Icon, Button } from '@banking/ui'

interface ErrorNotificationProps {
  onDismiss?: () => void
}

export function ErrorNotification({ onDismiss }: ErrorNotificationProps) {
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const [errorType, setErrorType] = useState<string | null>(null)

  useEffect(() => {
    const errorParam = searchParams.get('error')
    const errorDescription = searchParams.get('error_description')
    
    if (errorParam) {
      setErrorType(errorParam)
      setError(getErrorMessage(errorParam, errorDescription))
    }
  }, [searchParams])

  const getErrorMessage = (errorCode: string, description?: string | null): string => {
    switch (errorCode) {
      case 'Configuration':
        return 'Authentication service configuration error. Please contact support.'
      case 'AccessDenied':
        return 'Access denied. You do not have permission to access this application.'
      case 'Verification':
        return 'Email verification required. Please check your email and verify your account.'
      case 'Default':
        return 'Authentication failed. Please try again.'
      case 'OAuthSignin':
        return 'Error occurred during sign-in process. Please try again.'
      case 'OAuthCallback':
        return 'Authentication callback error. Please try signing in again.'
      case 'OAuthCreateAccount':
        return 'Error creating account. Please contact support if this persists.'
      case 'EmailCreateAccount':
        return 'Error creating account with email. Please try again.'
      case 'Callback':
        return 'Authentication callback failed. Please try again.'
      case 'OAuthAccountNotLinked':
        return 'Account not linked. Please sign in with the same method you used before.'
      case 'EmailSignin':
        return 'Error sending sign-in email. Please try again.'
      case 'CredentialsSignin':
        return 'Invalid credentials. Please check your username and password.'
      case 'SessionRequired':
        return 'Session required. Please sign in to continue.'
      case 'RefreshAccessTokenError':
        return 'Session expired. Please sign in again.'
      default:
        return description || 'An authentication error occurred. Please try again.'
    }
  }

  const getErrorIcon = (errorCode: string): string => {
    switch (errorCode) {
      case 'AccessDenied':
        return 'Shield'
      case 'Configuration':
        return 'Settings'
      case 'RefreshAccessTokenError':
      case 'SessionRequired':
        return 'Clock'
      default:
        return 'AlertTriangle'
    }
  }

  const handleDismiss = () => {
    setError(null)
    setErrorType(null)
    onDismiss?.()
    
    // Clear error from URL
    const url = new URL(window.location.href)
    url.searchParams.delete('error')
    url.searchParams.delete('error_description')
    window.history.replaceState({}, '', url.toString())
  }

  const handleRetry = () => {
    handleDismiss()
    window.location.reload()
  }

  if (!error) return null

  return (
    <Card className="mb-6 border-destructive bg-destructive/5">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Icon 
              name={getErrorIcon(errorType || '')} 
              className="h-5 w-5 text-destructive" 
            />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-destructive">
              Authentication Error
            </h3>
            <p className="mt-1 text-sm text-destructive/80">
              {error}
            </p>
            <div className="mt-3 flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleRetry}
                className="text-xs"
              >
                <Icon name="RefreshCw" className="mr-1 h-3 w-3" />
                Retry
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDismiss}
                className="text-xs"
              >
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
