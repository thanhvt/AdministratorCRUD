'use client'

import { Card, CardContent } from '@banking/ui'
import { marketIndices, topStocks, financialNews } from '../../data/financial-data'
import { TrendingUp, TrendingDown, BarChart3, Newspaper } from 'lucide-react'

interface MobileMarketSummaryProps {
  className?: string
}

export function MobileMarketSummary({ className }: MobileMarketSummaryProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Market Indices Carousel */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 text-sm">Market Indices</h3>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {marketIndices.map((index) => (
              <div key={index.symbol} className="flex-shrink-0 min-w-[140px] p-3 bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-blue-700">
                <div className="text-xs font-medium text-slate-600 dark:text-slate-400">{index.name}</div>
                <div className="font-semibold text-slate-900 dark:text-slate-100 text-sm mt-1">{index.value}</div>
                <div className={`flex items-center gap-1 text-xs mt-1 ${
                  index.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {index.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{index.changePercent}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Stocks */}
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-700">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-semibold text-emerald-800 dark:text-emerald-200 text-sm">Top Movers</h3>
          </div>
          <div className="space-y-2">
            {topStocks.slice(0, 3).map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between p-2 bg-white dark:bg-slate-800 rounded-lg border border-emerald-200 dark:border-emerald-700">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-900 dark:text-slate-100">{stock.symbol}</span>
                  <span className="text-xs text-slate-600 dark:text-slate-400">${stock.price}</span>
                </div>
                <div className={`flex items-center gap-1 text-xs ${
                  stock.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {stock.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{stock.changePercent}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Latest News */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-700">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Newspaper className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <h3 className="font-semibold text-amber-800 dark:text-amber-200 text-sm">Latest News</h3>
          </div>
          <div className="space-y-2">
            {financialNews.slice(0, 2).map((news) => (
              <div key={news.id} className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-amber-200 dark:border-amber-700">
                <div className="text-xs font-medium text-slate-900 dark:text-slate-100 leading-tight mb-1">
                  {news.headline}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400">{news.source}</span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">{news.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
