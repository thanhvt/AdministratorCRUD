'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@banking/ui'
import { topStocks, type Stock } from '../../data/financial-data'
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react'

interface StockTickerProps {
  className?: string
}

export function StockTicker({ className }: StockTickerProps) {
  return (
    <Card className={`bg-green-gradient-secondary border-2 border-green-500 dark:border-green-400 shadow-lg shadow-green-500/20 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-white dark:text-green-100 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-green-200" />
          Top Performers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topStocks.slice(0, 4).map((stock) => (
            <StockItem key={stock.symbol} stock={stock} />
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-green-300/50">
          <p className="text-xs text-green-100 dark:text-green-200 text-center font-medium">
            Real-time market data • Updated every 15 seconds
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function StockItem({ stock }: { stock: Stock }) {
  const isPositive = stock.isPositive
  const changeColor = isPositive 
    ? 'text-emerald-600 dark:text-emerald-400' 
    : 'text-red-600 dark:text-red-400'
  const bgColor = isPositive 
    ? 'bg-emerald-50 dark:bg-emerald-900/20' 
    : 'bg-red-50 dark:bg-red-900/20'

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-green-gradient-tertiary border-2 border-green-400 dark:border-green-300 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-200 hover:scale-[1.02]">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white dark:text-green-100 text-sm">{stock.symbol}</span>
          <span className="text-xs text-green-100 dark:text-green-200 truncate max-w-24">{stock.name}</span>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <span className="font-semibold text-white dark:text-green-50">${stock.price}</span>
          <span className="text-xs text-green-100 dark:text-green-200">Vol: {stock.volume}</span>
        </div>
      </div>
      <div className={`flex flex-col items-end gap-1 px-3 py-2 rounded-md bg-white/20 backdrop-blur-sm border border-white/30`}>
        <div className={`flex items-center gap-1 text-white`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-green-200" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-300" />
          )}
          <span className="text-sm font-bold">{stock.changePercent}</span>
        </div>
        <span className={`text-xs font-bold text-white`}>{stock.change}</span>
      </div>
    </div>
  )
}
