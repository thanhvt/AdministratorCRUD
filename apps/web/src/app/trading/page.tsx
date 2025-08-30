'use client'

import { TradingModule } from '@banking/modules'
import { ProtectedRoute } from '../../components/auth/protected-route'
import { PERMISSIONS } from '../../lib/permissions'

export default function TradingPage() {
  return (
    <ProtectedRoute requiredPermissions={[PERMISSIONS.TRADING_VIEW]}>
      <TradingModule />
    </ProtectedRoute>
  )
}

