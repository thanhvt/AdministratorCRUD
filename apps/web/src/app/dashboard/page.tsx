'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@banking/services'
import { Button, Card, CardHeader, CardTitle, CardContent } from '@banking/ui'
import { DashboardLayout } from '../../components/layout/dashboard-layout'

export default function DashboardPage() {
  const { user, getCurrentUser, logout } = useAuthStore()

  useEffect(() => {
    getCurrentUser()
  }, [getCurrentUser])

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
          <p className="text-gray-600">Please wait while we load your dashboard.</p>
        </div>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button onClick={() => logout()} variant="outline">
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-600 capitalize">Role: {user.role}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Securities Module</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Manage securities portfolio and custody services
              </p>
              <Button className="w-full">
                Access Securities
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trading Module</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Execute trades and monitor market positions
              </p>
              <Button className="w-full">
                Access Trading
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Customize your personal preferences and security settings
              </p>
              <Button className="w-full">
                Manage Settings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">API Status:</span>
                  <span className="text-sm text-green-600">Online</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Database:</span>
                  <span className="text-sm text-green-600">Connected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Last Backup:</span>
                  <span className="text-sm text-gray-600">2 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full text-sm">
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full text-sm">
                  View Audit Log
                </Button>
                <Button variant="outline" className="w-full text-sm">
                  System Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
