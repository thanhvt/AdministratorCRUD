'use client'

import { useState } from 'react'
import { Button } from '@banking/ui'
import { PortfolioOverview } from './portfolio-overview'
import { CustodyServices } from './custody-services'

export function SecuritiesModule() {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'custody'>('portfolio')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Securities Management</h1>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'portfolio' ? 'default' : 'outline'}
            onClick={() => setActiveTab('portfolio')}
          >
            Portfolio Overview
          </Button>
          <Button
            variant={activeTab === 'custody' ? 'default' : 'outline'}
            onClick={() => setActiveTab('custody')}
          >
            Custody Services
          </Button>
        </div>
      </div>

      <div className="min-h-[600px]">
        {activeTab === 'portfolio' && <PortfolioOverview />}
        {activeTab === 'custody' && <CustodyServices />}
      </div>
    </div>
  )
}
