'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@banking/ui'
import { marketIndices, type MarketIndex } from '../../data/financial-data'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface MarketOverviewProps {
  className?: string
}

export function MarketOverview({ className }: MarketOverviewProps) {
  return (
    <Card className={`bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-slate-200 dark:border-slate-700 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Market Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {marketIndices.map((index) => (
          <MarketIndexItem key={index.symbol} index={index} />
        ))}
      </CardContent>
    </Card>
  )
}

function MarketIndexItem({ index }: { index: MarketIndex }) {
  const isPositive = index.isPositive
  const changeColor = isPositive 
    ? 'text-emerald-600 dark:text-emerald-400' 
    : 'text-red-600 dark:text-red-400'
  const bgColor = isPositive 
    ? 'bg-emerald-50 dark:bg-emerald-900/20' 
    : 'bg-red-50 dark:bg-red-900/20'

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-200">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-slate-900 dark:text-slate-100">{index.name}</h3>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{index.symbol}</span>
        </div>
        <p className="text-lg font-semibold text-slate-800 dark:text-slate-200 mt-1">
          {index.value}
        </p>
      </div>
      <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${bgColor}`}>
        {isPositive ? (
          <TrendingUp className="w-3 h-3" />
        ) : (
          <TrendingDown className="w-3 h-3" />
        )}
        <div className={`text-sm font-medium ${changeColor}`}>
          <span className="block">{index.change}</span>
          <span className="text-xs">{index.changePercent}</span>
        </div>
      </div>
    </div>
  )
}
