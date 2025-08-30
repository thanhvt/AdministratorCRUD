'use client'

import { useState } from 'react'
import { Button } from '@banking/ui'
import { useAuth } from '@banking/services'
import { OrderManagement } from './order-management'
import { MarketDataComponent } from './market-data'

export function TradingModule() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'orders' | 'market'>('orders')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Trading Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name || 'Trader'}.</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'orders' ? 'default' : 'outline'}
            onClick={() => setActiveTab('orders')}
          >
            Order Management
          </Button>
          <Button
            variant={activeTab === 'market' ? 'default' : 'outline'}
            onClick={() => setActiveTab('market')}
          >
            Market Data
          </Button>
        </div>
      </div>

      <div className="min-h-[600px]">
        {activeTab === 'orders' && <OrderManagement />}
        {activeTab === 'market' && <MarketDataComponent />}
      </div>
    </div>
  )
}
