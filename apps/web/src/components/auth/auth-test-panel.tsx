'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Button, Card, CardContent, CardHeader, CardTitle, Icon, Badge } from '@banking/ui'
import { AuthTestRunner, TestResult } from '../../lib/test-auth-scenarios'

export function AuthTestPanel() {
  const { data: session, status } = useSession()
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const runTests = async () => {
    setIsRunning(true)
    try {
      const runner = new AuthTestRunner()
      const results = await runner.runAllTests()
      setTestResults(results)
    } catch (error) {
      console.error('Test execution failed:', error)
    } finally {
      setIsRunning(false)
    }
  }

  const simulateTokenExpiry = async () => {
    // Force a session update to trigger token refresh logic
    try {
      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trigger: 'refresh' })
      })
      console.log('Token refresh triggered:', response.status)
    } catch (error) {
      console.error('Failed to trigger token refresh:', error)
    }
  }

  const testLogout = async () => {
    if (confirm('This will log you out. Continue?')) {
      await signOut({ callbackUrl: '/login' })
    }
  }

  const testRouteAccess = () => {
    const routes = ['/dashboard', '/securities', '/trading', '/settings']
    routes.forEach(route => {
      window.open(route, '_blank')
    })
  }

  if (process.env.NODE_ENV === 'production') {
    return null // Don't show in production
  }

  return (
    <Card className="w-full max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="TestTube" className="h-5 w-5" />
          Authentication Test Panel
          <Badge variant="secondary">Development Only</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Session Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Session Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <Badge variant={status === 'authenticated' ? 'success' : 'secondary'}>
                    {status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>User:</span>
                  <span>{session?.user?.email || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Access Token:</span>
                  <Badge variant={session?.access_token ? 'success' : 'secondary'}>
                    {session?.access_token ? 'Present' : 'None'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Error:</span>
                  <span className="text-destructive">
                    {session?.error || 'None'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={simulateTokenExpiry}
                className="w-full"
              >
                <Icon name="RefreshCw" className="mr-2 h-3 w-3" />
                Trigger Token Refresh
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={testRouteAccess}
                className="w-full"
              >
                <Icon name="ExternalLink" className="mr-2 h-3 w-3" />
                Test Route Access
              </Button>
              <Button 
                size="sm" 
                variant="destructive" 
                onClick={testLogout}
                className="w-full"
              >
                <Icon name="LogOut" className="mr-2 h-3 w-3" />
                Test Logout
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Test Runner */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Comprehensive Tests</h3>
            <Button 
              onClick={runTests} 
              disabled={isRunning}
              loading={isRunning}
            >
              <Icon name="Play" className="mr-2 h-4 w-4" />
              Run All Tests
            </Button>
          </div>

          {testResults.length > 0 && (
            <div className="space-y-2">
              {testResults.map((result, index) => (
                <Card key={index} className={`border-l-4 ${
                  result.success ? 'border-l-green-500' : 'border-l-red-500'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon 
                            name={result.success ? "CheckCircle" : "XCircle"} 
                            className={`h-4 w-4 ${
                              result.success ? 'text-green-500' : 'text-red-500'
                            }`} 
                          />
                          <span className="font-medium text-sm">
                            {result.message}
                          </span>
                        </div>
                        {result.details && (
                          <details className="mt-2">
                            <summary className="cursor-pointer text-xs text-muted-foreground">
                              Show Details
                            </summary>
                            <pre className="mt-1 text-xs bg-muted p-2 rounded overflow-auto">
                              {JSON.stringify(result.details, null, 2)}
                            </pre>
                          </details>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {result.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Manual Test Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Manual Testing Guide</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <div>
              <h4 className="font-medium mb-1">1. Login Flow</h4>
              <p className="text-muted-foreground">
                Navigate to /login and test Keycloak authentication. Verify redirect to dashboard on success.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">2. Route Protection</h4>
              <p className="text-muted-foreground">
                Try accessing protected routes while logged out. Should redirect to login.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">3. Session Timeout</h4>
              <p className="text-muted-foreground">
                Wait for session timeout warning (default: 25 minutes of inactivity).
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">4. Token Refresh</h4>
              <p className="text-muted-foreground">
                Monitor network tab for automatic token refresh 5 minutes before expiration.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">5. Error Handling</h4>
              <p className="text-muted-foreground">
                Test network disconnection, invalid tokens, and Keycloak server errors.
              </p>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
