'use client'

import { SecuritiesModule } from '@banking/modules'
import { ProtectedRoute } from '../../components/auth/protected-route'
import { PERMISSIONS } from '../../lib/permissions'

export default function SecuritiesPage() {
  return (
    <ProtectedRoute requiredPermissions={[PERMISSIONS.SECURITIES_VIEW]}>
      <SecuritiesModule />
    </ProtectedRoute>
  )
}

