'use client'

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { useTokenRefresh } from "../../hooks/use-token-refresh"

interface SessionProviderProps {
  children: ReactNode
}

function SessionProviderContent({ children }: SessionProviderProps) {
  useTokenRefresh()
  return <>{children}</>
}

export function SessionProvider({ children }: SessionProviderProps) {
  return (
    <NextAuthSessionProvider>
      <SessionProviderContent>
        {children}
      </SessionProviderContent>
    </NextAuthSessionProvider>
  )
}
