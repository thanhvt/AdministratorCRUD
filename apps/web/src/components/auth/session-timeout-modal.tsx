'use client'

import { useState, useEffect } from 'react'
import { Button } from '@banking/ui'
import { useAuthStore } from '@banking/services'

interface SessionTimeoutModalProps {
  isOpen: boolean
  onExtendSession: () => void
}

export function SessionTimeoutModal({ isOpen, onExtendSession }: SessionTimeoutModalProps) {
  const [countdown, setCountdown] = useState(300) // 5 minutes in seconds
  const { logout } = useAuthStore()

  useEffect(() => {
    if (!isOpen) {
      setCountdown(300)
      return
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          logout()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen, logout])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Session Expiring Soon
          </h2>
          <p className="text-gray-600 mb-4">
            Your session will expire in{' '}
            <span className="font-mono font-bold text-red-600">
              {formatTime(countdown)}
            </span>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Click "Stay Logged In" to extend your session, or you will be automatically logged out.
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={onExtendSession}
              className="px-6"
            >
              Stay Logged In
            </Button>
            <Button
              onClick={() => logout()}
              variant="outline"
              className="px-6"
            >
              Logout Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
