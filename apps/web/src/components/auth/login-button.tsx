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
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border-2 border-green-500 hover:border-green-600"
        variant="premium"
      >
        <LogIn className="w-4 h-4 mr-2" />
        Join Us
      </Button>

      {/* Login Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-600 shadow-2xl rounded-2xl">
            <div className="flex items-center justify-between p-6 border-b border-green-100 dark:border-green-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Join EcoNest</h2>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <CardContent className="p-6">
              <ErrorNotification />

              <div className="space-y-6">
                {error && (
                  <div className="text-red-700 dark:text-red-300 text-sm font-medium text-center bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-800">
                    {error}
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <LogIn className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Welcome to Our Community
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Join thousands of environmental advocates making a difference
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-2 text-xs text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-medium">Community is active</span>
                  </div>
                </div>

                <Button
                  onClick={handleKeycloakLogin}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? 'Joining...' : 'Join with Secure Login'}
                </Button>

                <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                  <p>Secure authentication powered by Keycloak</p>
                </div>

                {/* Security & Trust Features */}
                <div className="space-y-3 text-xs text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Secure SSL encryption</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Privacy-first approach</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Trusted by 50K+ members</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center">
                <Icon name="Lock" className="h-4 w-4 text-green-500" />
                <p className="ml-2 text-xs text-gray-500 dark:text-gray-400">Protected Connection</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
