'use client'

import { useState } from 'react'
import { Button } from '@banking/ui'
import { ProfileManagement } from './profile-management'
import { SecuritySettingsComponent } from './security-settings'

export function UserSettingsModule() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Settings</h1>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'profile' ? 'default' : 'outline'}
            onClick={() => setActiveTab('profile')}
          >
            Profile Management
          </Button>
          <Button
            variant={activeTab === 'security' ? 'default' : 'outline'}
            onClick={() => setActiveTab('security')}
          >
            Security Settings
          </Button>
        </div>
      </div>

      <div className="min-h-[600px]">
        {activeTab === 'profile' && <ProfileManagement />}
        {activeTab === 'security' && <SecuritySettingsComponent />}
      </div>
    </div>
  )
}
