'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@banking/services'
import { Button, Card, CardHeader, CardTitle, CardContent, Skeleton, Icon, Badge } from '@banking/ui'
import { DashboardLayout } from '../../components/layout/dashboard-layout'

export default function DashboardPage() {
    const router = useRouter()
  const { user, getCurrentUser, logout } = useAuthStore()

  useEffect(() => {
    getCurrentUser()
  }, [getCurrentUser])

  if (!user) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Skeleton className="h-9 w-48" />
            <Skeleton className="h-9 w-24" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button onClick={() => logout()} variant="outline">
            <Icon name="LogOut" className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card variant="interactive" className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Welcome Back, {user.name}!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Here's a summary of your administrative panel.</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="font-semibold">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Role</p>
                  <p className="font-semibold capitalize">{user.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="interactive">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>System Status</CardTitle>
              <Icon name="Server" className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">API Status</span>
                  <Badge variant="success"><Icon name="CheckCircle" className="mr-1 h-3 w-3" />Online</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Database</span>
                  <Badge variant="success"><Icon name="CheckCircle" className="mr-1 h-3 w-3" />Connected</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Last Backup</span>
                  <span className="font-semibold">2 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="interactive">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Quick Actions</CardTitle>
              <Icon name="Zap" className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-sm transition-all duration-200 hover:pl-4"><Icon name="FileText" className="mr-2 h-4 w-4" /> Generate Report</Button>
                <Button variant="outline" className="w-full justify-start text-sm transition-all duration-200 hover:pl-4"><Icon name="History" className="mr-2 h-4 w-4" /> View Audit Log</Button>
                <Button variant="outline" className="w-full justify-start text-sm transition-all duration-200 hover:pl-4"><Icon name="Settings" className="mr-2 h-4 w-4" /> System Settings</Button>
              </div>
            </CardContent>
          </Card>

          <Card variant="interactive">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Securities</CardTitle>
              <Icon name="Landmark" className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Manage securities portfolio and custody services.
              </p>
              <Button variant="premium" className="w-full" onClick={() => router.push('/securities')}>
                Access Securities
              </Button>
            </CardContent>
          </Card>

          <Card variant="interactive">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Trading</CardTitle>
              <Icon name="TrendingUp" className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Execute trades and monitor market positions.
              </p>
              <Button variant="premium" className="w-full" onClick={() => router.push('/trading')}>
                Access Trading
              </Button>
            </CardContent>
          </Card>

          <Card variant="interactive">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>User Settings</CardTitle>
              <Icon name="UserCog" className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Customize your personal preferences and security.
              </p>
              <Button variant="premium" className="w-full" onClick={() => router.push('/user-settings')}>
                Manage Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
