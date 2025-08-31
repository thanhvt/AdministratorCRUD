'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import {
  Button,
} from '@banking/ui'
import { handleAuthError } from '../../lib/error-handling'
import { LogIn } from 'lucide-react'

export function LoginButton() {

  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  const handleKeycloakLogin = async () => {
    try {
      setIsLoading(true)

      // Redirect the user to the Keycloak login page.
      // next-auth will handle the redirect and callback automatically.
      await signIn('keycloak', {
        callbackUrl,
      })
    } catch (err: unknown) {
      const error = err as Error
      handleAuthError(error, { context: 'keycloak_signin_catch' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleKeycloakLogin}
      className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border-2 border-green-500 hover:border-green-600"
      variant="premium"
      loading={isLoading}
      disabled={isLoading}
    >
      <LogIn className="w-4 h-4 mr-2" />
      {isLoading ? 'Joining...' : 'Join Us'}
    </Button>
  )
}
