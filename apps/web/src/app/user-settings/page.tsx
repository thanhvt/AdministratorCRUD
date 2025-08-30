'use client'

import { UserSettingsModule } from '@banking/modules'
import { ProtectedRoute } from '../../components/auth/protected-route'
import { AuthTestPanel } from '../../components/auth/auth-test-panel'
import { PERMISSIONS } from '../../lib/permissions'

export default function UserSettingsPage() {
  return (
    <ProtectedRoute requiredPermissions={[PERMISSIONS.READ]}>
      <div className="space-y-8">
        <UserSettingsModule />
        <AuthTestPanel />
      </div>
    </ProtectedRoute>
  )
}

