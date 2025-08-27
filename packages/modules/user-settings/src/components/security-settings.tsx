'use client'

import { useState, useEffect } from 'react'
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from '@banking/ui'
import { SecuritySettings, AuditLog } from '../types'
import { userSettingsService } from '../services/user-settings-service'

export function SecuritySettingsComponent() {
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings | null>(null)
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [securitySummary, setSecuritySummary] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'settings' | 'activity'>('settings')
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  useEffect(() => {
    loadSecurityData()
  }, [])

  const loadSecurityData = async () => {
    try {
      setLoading(true)
      const [settings, logs, summary] = await Promise.all([
        userSettingsService.getSecuritySettings('1'),
        userSettingsService.getAuditLogs('1'),
        userSettingsService.getSecuritySummary('1'),
      ])
      setSecuritySettings(settings)
      setAuditLogs(logs)
      setSecuritySummary(summary)
    } catch (err) {
      console.error('Failed to load security data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleTwoFactor = async () => {
    if (!securitySettings) return
    
    try {
      if (securitySettings.twoFactorEnabled) {
        await userSettingsService.disableTwoFactor('1')
      } else {
        await userSettingsService.enableTwoFactor('1', 'authenticator')
      }
      loadSecurityData()
    } catch (err) {
      console.error('Failed to toggle 2FA:', err)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const currentPassword = formData.get('currentPassword') as string
    const newPassword = formData.get('newPassword') as string
    
    try {
      await userSettingsService.changePassword('1', currentPassword, newPassword)
      setShowPasswordForm(false)
      loadSecurityData()
    } catch (err) {
      console.error('Failed to change password:', err)
    }
  }

  const getSecurityScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading security settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Security Settings</h2>
        {securitySummary && (
          <div className="text-right">
            <p className="text-sm text-gray-600">Security Score</p>
            <p className={`text-2xl font-bold ${getSecurityScoreColor(securitySummary.securityScore)}`}>
              {securitySummary.securityScore}/100
            </p>
          </div>
        )}
      </div>

      {/* Security Summary */}
      {securitySummary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">
                {securitySummary.twoFactorEnabled ? 'ON' : 'OFF'}
              </p>
              <p className="text-sm text-gray-600">Two-Factor Auth</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-orange-600">
                {securitySummary.passwordAge}
              </p>
              <p className="text-sm text-gray-600">Password Age (days)</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-red-600">
                {securitySummary.recentFailedLogins}
              </p>
              <p className="text-sm text-gray-600">Failed Logins</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                {securitySummary.uniqueIPsLast30Days}
              </p>
              <p className="text-sm text-gray-600">Unique IPs</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="border-b">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'settings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Security Settings
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'activity'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Activity Log
          </button>
        </nav>
      </div>

      {/* Settings Tab */}
      {activeTab === 'settings' && securitySettings && (
        <div className="space-y-6">
          {/* Two-Factor Authentication */}
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">
                    Status: {securitySettings.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </p>
                  {securitySettings.twoFactorEnabled && (
                    <p className="text-sm text-gray-600">
                      Method: {securitySettings.twoFactorMethod}
                    </p>
                  )}
                </div>
                <Button
                  onClick={handleToggleTwoFactor}
                  variant={securitySettings.twoFactorEnabled ? 'outline' : 'default'}
                >
                  {securitySettings.twoFactorEnabled ? 'Disable' : 'Enable'} 2FA
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Password Management */}
          <Card>
            <CardHeader>
              <CardTitle>Password Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Password</p>
                    <p className="text-sm text-gray-600">
                      Last changed: {securitySettings.passwordLastChanged.toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    onClick={() => setShowPasswordForm(!showPasswordForm)}
                    variant="outline"
                  >
                    Change Password
                  </Button>
                </div>

                {showPasswordForm && (
                  <form onSubmit={handlePasswordChange} className="space-y-3 p-4 bg-gray-50 rounded">
                    <div>
                      <label className="block text-sm font-medium mb-1">Current Password</label>
                      <Input name="currentPassword" type="password" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">New Password</label>
                      <Input name="newPassword" type="password" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                      <Input name="confirmPassword" type="password" required />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" size="sm">Update Password</Button>
                      <Button type="button" variant="outline" size="sm" onClick={() => setShowPasswordForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Session Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Session Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Session Timeout</span>
                  <span>{securitySettings.sessionTimeout} minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Login Notifications</span>
                  <span className={securitySettings.loginNotifications ? 'text-green-600' : 'text-red-600'}>
                    {securitySettings.loginNotifications ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Activity Tab */}
      {activeTab === 'activity' && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {auditLogs.map((log) => (
                <div key={log.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{log.action.replace('_', ' ')}</p>
                    <p className="text-sm text-gray-600">
                      {formatDate(log.timestamp)} • {log.ipAddress}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    log.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {log.success ? 'Success' : 'Failed'}
                  </span>
                </div>
              ))}
              {auditLogs.length === 0 && (
                <p className="text-center text-gray-600 py-4">No recent activity</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
