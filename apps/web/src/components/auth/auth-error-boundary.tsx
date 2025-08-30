'use client'

import React, { Component, ReactNode } from 'react'
import { Button, Card, CardContent, CardHeader, CardTitle, Icon } from '@banking/ui'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class AuthErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Authentication error caught by boundary:', error, errorInfo)
    
    // Log authentication errors for monitoring
    if (this.isAuthError(error)) {
      this.logAuthError(error)
    }
  }

  private isAuthError(error: Error): boolean {
    const authErrorMessages = [
      'NEXT_AUTH',
      'token',
      'session',
      'authentication',
      'unauthorized',
      'RefreshAccessTokenError'
    ]
    
    return authErrorMessages.some(msg => 
      error.message.toLowerCase().includes(msg.toLowerCase()) ||
      error.name.toLowerCase().includes(msg.toLowerCase())
    )
  }

  private logAuthError(error: Error) {
    // In a real application, you would send this to your logging service
    const errorData = {
      timestamp: new Date().toISOString(),
      error: error.message,
      stack: error.stack,
      userAgent: navigator.userAgent,
      url: window.location.href,
    }
    
    console.error('Auth Error Log:', errorData)
    
    // You could send to an error tracking service like Sentry here
    // Sentry.captureException(error, { extra: errorData })
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
    window.location.reload()
  }

  private handleGoToLogin = () => {
    window.location.href = '/login'
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                <Icon name="AlertTriangle" className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Authentication Error
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                {this.isAuthError(this.state.error!) 
                  ? "There was a problem with your authentication session. Please try logging in again."
                  : "An unexpected error occurred. Please try refreshing the page."
                }
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="text-left text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded">
                  <summary className="cursor-pointer font-medium">Error Details</summary>
                  <pre className="mt-2 whitespace-pre-wrap text-xs">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
              
              <div className="flex gap-3 justify-center">
                <Button onClick={this.handleRetry} variant="outline">
                  <Icon name="RefreshCw" className="mr-2 h-4 w-4" />
                  Retry
                </Button>
                <Button onClick={this.handleGoToLogin} variant="default">
                  <Icon name="LogIn" className="mr-2 h-4 w-4" />
                  Go to Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
