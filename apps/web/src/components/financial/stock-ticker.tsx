'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@banking/ui'
import { topStocks, type Stock } from '../../data/financial-data'
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react'

interface StockTickerProps {
  className?: string
}

export function StockTicker({ className }: StockTickerProps) {
  return (
    <Card className={`bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Top Performers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topStocks.slice(0, 4).map((stock) => (
            <StockItem key={stock.symbol} stock={stock} />
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-blue-200 dark:border-blue-700">
          <p className="text-xs text-blue-600 dark:text-blue-400 text-center">
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
    <div className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-700 hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">{stock.symbol}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-24">{stock.name}</span>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <span className="font-semibold text-slate-800 dark:text-slate-200">${stock.price}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">Vol: {stock.volume}</span>
        </div>
      </div>
      <div className={`flex flex-col items-end gap-1 px-2 py-1 rounded-md ${bgColor}`}>
        <div className={`flex items-center gap-1 ${changeColor}`}>
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          <span className="text-sm font-medium">{stock.changePercent}</span>
        </div>
        <span className={`text-xs font-medium ${changeColor}`}>{stock.change}</span>
      </div>
    </div>
  )
}
