'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@banking/ui'
import { MarketData } from '../types'
import { tradingService } from '../services/trading-service'

export function MarketDataComponent() {
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [marketSummary, setMarketSummary] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMarketData()
    loadMarketSummary()
  }, [])

  const loadMarketData = async () => {
    try {
      const data = await tradingService.getMarketData()
      setMarketData(data)
    } catch (err) {
      console.error('Failed to load market data:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadMarketSummary = async () => {
    try {
      const summary = await tradingService.getMarketSummary()
      setMarketSummary(summary)
    } catch (err) {
      console.error('Failed to load market summary:', err)
    }
  }

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`
  }

  const formatChange = (change: number, changePercent: number) => {
    const color = change >= 0 ? 'text-green-600' : 'text-red-600'
    const sign = change >= 0 ? '+' : ''
    return (
      <span className={color}>
        {sign}{change.toFixed(2)} ({sign}{changePercent.toFixed(2)}%)
      </span>
    )
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`
    }
    return volume.toString()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading market data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Market Data</h2>
        <p className="text-sm text-gray-600">
          Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>

      {/* Market Summary */}
      {marketSummary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{marketSummary.marketOverview.totalSymbols}</p>
                <p className="text-sm text-gray-600">Total Symbols</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{formatVolume(marketSummary.marketOverview.totalVolume)}</p>
                <p className="text-sm text-gray-600">Total Volume</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className={`text-2xl font-bold ${marketSummary.marketOverview.averageChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {marketSummary.marketOverview.averageChange >= 0 ? '+' : ''}{marketSummary.marketOverview.averageChange}%
                </p>
                <p className="text-sm text-gray-600">Average Change</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">{marketSummary.marketOverview.gainersCount}</p>
                <p className="text-lg font-bold text-red-600">{marketSummary.marketOverview.losersCount}</p>
                <p className="text-sm text-gray-600">Gainers / Losers</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Market Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Real-time Quotes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Symbol</th>
                  <th className="text-right p-2">Last Price</th>
                  <th className="text-right p-2">Change</th>
                  <th className="text-right p-2">Bid/Ask</th>
                  <th className="text-right p-2">Volume</th>
                  <th className="text-right p-2">High/Low</th>
                </tr>
              </thead>
              <tbody>
                {marketData.map((data) => (
                  <tr key={data.symbol} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{data.symbol}</td>
                    <td className="p-2 text-right font-medium">{formatPrice(data.lastPrice)}</td>
                    <td className="p-2 text-right">{formatChange(data.change, data.changePercent)}</td>
                    <td className="p-2 text-right text-xs">
                      <div>{formatPrice(data.bid)} / {formatPrice(data.ask)}</div>
                      <div className="text-gray-500">{data.bidSize} / {data.askSize}</div>
                    </td>
                    <td className="p-2 text-right">{formatVolume(data.volume)}</td>
                    <td className="p-2 text-right text-xs">
                      <div>{formatPrice(data.high)}</div>
                      <div className="text-gray-500">{formatPrice(data.low)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Top Movers */}
      {marketSummary && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">Top Gainers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {marketSummary.topGainers.map((stock: MarketData) => (
                  <div key={stock.symbol} className="flex justify-between items-center">
                    <span className="font-medium">{stock.symbol}</span>
                    <div className="text-right">
                      <div>{formatPrice(stock.lastPrice)}</div>
                      <div className="text-sm text-green-600">
                        +{stock.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Top Losers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {marketSummary.topLosers.map((stock: MarketData) => (
                  <div key={stock.symbol} className="flex justify-between items-center">
                    <span className="font-medium">{stock.symbol}</span>
                    <div className="text-right">
                      <div>{formatPrice(stock.lastPrice)}</div>
                      <div className="text-sm text-red-600">
                        {stock.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
