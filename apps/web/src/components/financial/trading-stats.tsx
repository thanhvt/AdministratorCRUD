'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@banking/ui'
import { tradingStats } from '../../data/financial-data'
import { Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface TradingStatsProps {
  className?: string
}

export function TradingStats({ className }: TradingStatsProps) {
  const totalStocks = tradingStats.advancingStocks + tradingStats.decliningStocks + tradingStats.unchangedStocks
  const advancingPercentage = ((tradingStats.advancingStocks / totalStocks) * 100).toFixed(1)
  const decliningPercentage = ((tradingStats.decliningStocks / totalStocks) * 100).toFixed(1)

  return (
    <Card className={`bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-700 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Market Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg border border-emerald-200 dark:border-emerald-700">
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {tradingStats.totalVolume}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Total Volume</div>
          </div>
          <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg border border-emerald-200 dark:border-emerald-700">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {totalStocks.toLocaleString()}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Active Stocks</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border border-emerald-200 dark:border-emerald-700">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Advancing</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-emerald-600 dark:text-emerald-400">
                {tradingStats.advancingStocks.toLocaleString()}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{advancingPercentage}%</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border border-emerald-200 dark:border-emerald-700">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Declining</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-red-600 dark:text-red-400">
                {tradingStats.decliningStocks.toLocaleString()}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{decliningPercentage}%</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border border-emerald-200 dark:border-emerald-700">
            <div className="flex items-center gap-2">
              <Minus className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Unchanged</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-slate-600 dark:text-slate-400">
                {tradingStats.unchangedStocks.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-emerald-200 dark:border-emerald-700">
          <div className="text-center p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
            <div className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
              {tradingStats.newHighs}
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400">New Highs</div>
          </div>
          <div className="text-center p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <div className="text-lg font-bold text-red-700 dark:text-red-300">
              {tradingStats.newLows}
            </div>
            <div className="text-xs text-red-600 dark:text-red-400">New Lows</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
