'use client'

import { useSessionTimeout } from '../../hooks/use-session-timeout'
import { SessionTimeoutModal } from '../auth/session-timeout-modal'

interface SessionTimeoutProviderProps {
  children: React.ReactNode
}

export function SessionTimeoutProvider({ children }: SessionTimeoutProviderProps) {
  const { sessionWarningShown, extendSession } = useSessionTimeout({
    onWarning: () => {
      console.log('Session warning triggered')
    },
    onTimeout: () => {
      console.log('Session timeout - user logged out')
    },
  })

  return (
    <>
      {children}
      <SessionTimeoutModal 
        isOpen={sessionWarningShown}
        onExtendSession={extendSession}
      />
    </>
  )
}
