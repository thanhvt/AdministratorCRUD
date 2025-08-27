'use client'

import { useState, useEffect } from 'react'
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from '@banking/ui'
import { UserProfile, UserPreferences } from '../types'
import { userSettingsService } from '../services/user-settings-service'

export function ProfileManagement() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [preferences, setPreferences] = useState<UserPreferences | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences'>('profile')

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      setLoading(true)
      const [profileData, preferencesData] = await Promise.all([
        userSettingsService.getUserProfile('1'),
        userSettingsService.getUserPreferences('1'),
      ])
      setProfile(profileData)
      setPreferences(preferencesData)
    } catch (err) {
      console.error('Failed to load user data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleProfileUpdate = async (updates: Partial<UserProfile>) => {
    if (!profile) return
    
    try {
      setSaving(true)
      const updatedProfile = await userSettingsService.updateUserProfile('1', updates)
      setProfile(updatedProfile)
    } catch (err) {
      console.error('Failed to update profile:', err)
    } finally {
      setSaving(false)
    }
  }

  const handlePreferencesUpdate = async (updates: Partial<UserPreferences>) => {
    if (!preferences) return
    
    try {
      setSaving(true)
      const updatedPreferences = await userSettingsService.updateUserPreferences('1', updates)
      setPreferences(updatedPreferences)
    } catch (err) {
      console.error('Failed to update preferences:', err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Profile Management</h2>
      </div>

      {/* Tab Navigation */}
      <div className="border-b">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'profile'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Personal Information
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'preferences'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Preferences
          </button>
        </nav>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && profile && (
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                handleProfileUpdate({
                  firstName: formData.get('firstName') as string,
                  lastName: formData.get('lastName') as string,
                  phone: formData.get('phone') as string,
                  department: formData.get('department') as string,
                  position: formData.get('position') as string,
                  timezone: formData.get('timezone') as string,
                  language: formData.get('language') as string,
                })
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <Input name="firstName" defaultValue={profile.firstName} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <Input name="lastName" defaultValue={profile.lastName} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input value={profile.email} disabled className="bg-gray-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <Input name="phone" defaultValue={profile.phone} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Department</label>
                  <Input name="department" defaultValue={profile.department} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Position</label>
                  <Input name="position" defaultValue={profile.position} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Timezone</label>
                  <select
                    name="timezone"
                    defaultValue={profile.timezone}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                    <option value="Europe/London">London</option>
                    <option value="Asia/Tokyo">Tokyo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Language</label>
                  <select
                    name="language"
                    defaultValue={profile.language}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="es-ES">Spanish</option>
                    <option value="fr-FR">French</option>
                    <option value="de-DE">German</option>
                    <option value="ja-JP">Japanese</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && preferences && (
        <div className="space-y-6">
          {/* Theme & Display */}
          <Card>
            <CardHeader>
              <CardTitle>Theme & Display</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Theme</label>
                  <div className="flex gap-4">
                    {['light', 'dark', 'system'].map((theme) => (
                      <label key={theme} className="flex items-center">
                        <input
                          type="radio"
                          name="theme"
                          value={theme}
                          checked={preferences.theme === theme}
                          onChange={(e) => handlePreferencesUpdate({ theme: e.target.value as any })}
                          className="mr-2"
                        />
                        <span className="capitalize">{theme}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Dashboard Layout</label>
                  <div className="flex gap-4">
                    {['grid', 'list'].map((layout) => (
                      <label key={layout} className="flex items-center">
                        <input
                          type="radio"
                          name="layout"
                          value={layout}
                          checked={preferences.dashboard.layout === layout}
                          onChange={(e) => 
                            handlePreferencesUpdate({
                              dashboard: { ...preferences.dashboard, layout: e.target.value as any }
                            })
                          }
                          className="mr-2"
                        />
                        <span className="capitalize">{layout}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(preferences.notifications).map(([key, value]) => (
                  <label key={key} className="flex items-center justify-between">
                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) =>
                        handlePreferencesUpdate({
                          notifications: {
                            ...preferences.notifications,
                            [key]: e.target.checked,
                          },
                        })
                      }
                      className="rounded"
                    />
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trading Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Trading Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <span>Confirm Orders</span>
                  <input
                    type="checkbox"
                    checked={preferences.trading.confirmOrders}
                    onChange={(e) =>
                      handlePreferencesUpdate({
                        trading: {
                          ...preferences.trading,
                          confirmOrders: e.target.checked,
                        },
                      })
                    }
                    className="rounded"
                  />
                </label>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Default Order Type</label>
                  <select
                    value={preferences.trading.defaultOrderType}
                    onChange={(e) =>
                      handlePreferencesUpdate({
                        trading: {
                          ...preferences.trading,
                          defaultOrderType: e.target.value as any,
                        },
                      })
                    }
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="market">Market</option>
                    <option value="limit">Limit</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
