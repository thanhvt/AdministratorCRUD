'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@banking/ui'
import { marketIndices, type MarketIndex } from '../../data/financial-data'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface MarketOverviewProps {
  className?: string
}

export function MarketOverview({ className }: MarketOverviewProps) {
  return (
    <Card className={`bg-green-gradient-primary border-2 border-green-600 dark:border-green-400 shadow-lg shadow-green-500/20 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-white dark:text-green-100 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
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
    <div className="flex items-center justify-between p-3 rounded-lg bg-green-gradient-secondary border-2 border-green-400 dark:border-green-300 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-200">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-white dark:text-green-100">{index.name}</h3>
          <span className="text-xs text-green-100 dark:text-green-200 font-mono">{index.symbol}</span>
        </div>
        <p className="text-lg font-semibold text-white dark:text-green-50 mt-1">
          {index.value}
        </p>
      </div>
      <div className={`flex items-center gap-1 px-3 py-2 rounded-md bg-white/20 backdrop-blur-sm border border-white/30`}>
        {isPositive ? (
          <TrendingUp className="w-4 h-4 text-green-200" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-300" />
        )}
        <div className={`text-sm font-bold text-white`}>
          <span className="block">{index.change}</span>
          <span className="text-xs">{index.changePercent}</span>
        </div>
      </div>
    </div>
  )
}
