'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import {
  Button,
  Card,
  CardContent,
  Icon,
} from '@banking/ui'
import { ErrorNotification } from './error-notification'
import { handleAuthError } from '../../lib/error-handling'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
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
    <div className="w-full space-y-4">
      <ErrorNotification />

      <Card variant="glass" className="w-full">
        <CardContent className="p-6">
          <div className="space-y-6">
            {error && (
              <div className="text-destructive text-sm font-medium text-center bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}

          <Button
            onClick={handleKeycloakLogin}
            className="w-full"
            loading={isLoading}
            variant="premium"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in with Keycloak'}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <p>You will be redirected to Keycloak for secure authentication</p>
          </div>
        </div>
      </CardContent>

        <div className="mt-6 flex items-center justify-center">
          <Icon name="Lock" className="h-4 w-4 text-muted-foreground" />
          <p className="ml-2 text-xs text-muted-foreground">Secure SSL Connection</p>
        </div>
      </Card>
    </div>
  )
}
