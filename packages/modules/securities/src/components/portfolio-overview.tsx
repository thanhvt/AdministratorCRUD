'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@banking/ui'
import { Portfolio } from '../types'
import { securitiesService } from '../services/securities-service'

export function PortfolioOverview() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadPortfolios()
  }, [])

  const loadPortfolios = async () => {
    try {
      setLoading(true)
      const data = await securitiesService.getPortfolios()
      setPortfolios(data)
    } catch (err: any) {
      setError(err.message || 'Failed to load portfolios')
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading portfolios...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={loadPortfolios}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Portfolio Overview</h2>
        <p className="text-sm text-gray-600">
          {portfolios.length} portfolio{portfolios.length !== 1 ? 's' : ''} managed
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((portfolio) => (
          <Card key={portfolio.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{portfolio.clientName}</CardTitle>
              <p className="text-sm text-gray-600">Client ID: {portfolio.clientId}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Value:</span>
                  <span className="text-lg font-bold text-green-600">
                    {formatCurrency(portfolio.totalValue, portfolio.currency)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Holdings:</span>
                  <span className="text-sm">{portfolio.holdings.length} securities</span>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-xs text-gray-500 mb-2">Top Holdings:</p>
                  {portfolio.holdings.slice(0, 3).map((holding) => (
                    <div key={holding.id} className="flex justify-between text-xs mb-1">
                      <span className="truncate mr-2">{holding.security.symbol}</span>
                      <span className="text-gray-600">
                        {holding.percentageOfPortfolio.toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-gray-500 text-center pt-2 border-t">
                  Last updated: {portfolio.lastUpdated.toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {portfolios.length === 0 && (
        <div className="text-center p-8">
          <p className="text-gray-600">No portfolios found</p>
        </div>
      )}
    </div>
  )
}
