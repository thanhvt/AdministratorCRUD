'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import {
  Button,
  Card,
  CardContent,
  Icon,
} from '@banking/ui'
import { ErrorNotification } from './error-notification'
import { handleAuthError } from '../../lib/error-handling'
import { LogIn, X } from 'lucide-react'

export function LoginButton() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  const handleKeycloakLogin = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await signIn('keycloak', {
        callbackUrl,
        redirect: false,
      })

      if (result?.error) {
        handleAuthError(new Error(result.error), { context: 'keycloak_signin' })
        setError('Authentication failed. Please try again.')
      } else if (result?.ok) {
        router.push(callbackUrl)
      }
    } catch (err: unknown) {
      const error = err as Error
      handleAuthError(error, { context: 'keycloak_signin_catch' })
      setError(error.message || 'An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Login Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-green-gradient-primary hover:bg-green-gradient-secondary border-2 border-green-500 dark:border-green-400 text-white font-bold px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        variant="premium"
      >
        <LogIn className="w-4 h-4 mr-2" />
        Login
      </Button>

      {/* Login Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-green-gradient-primary border-2 border-green-500 dark:border-green-400 shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-green-300/50">
              <h2 className="text-xl font-bold text-white">Login to FinanceTrader Pro</h2>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <CardContent className="p-6">
              <ErrorNotification />
              
              <div className="space-y-6">
                {error && (
                  <div className="text-white text-sm font-medium text-center bg-red-500/20 p-3 rounded-md border border-red-400/30">
                    {error}
                  </div>
                )}

                <div className="text-center mb-4">
                  <p className="text-green-100 dark:text-green-200 text-sm">
                    Access your professional trading dashboard
                  </p>
                  <div className="mt-2 flex items-center justify-center gap-2 text-xs text-green-200">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                    <span>Markets are open</span>
                  </div>
                </div>

                <Button
                  onClick={handleKeycloakLogin}
                  className="w-full bg-white/20 hover:bg-white/30 border-2 border-white/30 text-white font-bold backdrop-blur-sm"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign in with Keycloak'}
                </Button>

                <div className="text-center text-xs text-green-100 dark:text-green-200">
                  <p>You will be redirected to Keycloak for secure authentication</p>
                </div>

                {/* Security Features */}
                <div className="space-y-2 text-xs text-green-200 border-t border-green-300/50 pt-4">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-1 h-1 bg-green-300 rounded-full"></div>
                    <span>256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-1 h-1 bg-green-300 rounded-full"></div>
                    <span>Multi-factor authentication</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-1 h-1 bg-green-300 rounded-full"></div>
                    <span>SOC 2 Type II compliant</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center">
                <Icon name="Lock" className="h-4 w-4 text-green-200" />
                <p className="ml-2 text-xs text-green-200">Secure SSL Connection</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
