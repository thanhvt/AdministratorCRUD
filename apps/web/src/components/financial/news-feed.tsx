'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@banking/ui'
import { financialNews, type NewsItem } from '../../data/financial-data'
import { Newspaper, Clock, TrendingUp } from 'lucide-react'

interface NewsFeedProps {
  className?: string
}

export function NewsFeed({ className }: NewsFeedProps) {
  return (
    <Card className={`bg-green-gradient-tertiary border-2 border-green-600 dark:border-green-400 shadow-lg shadow-green-500/20 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-white dark:text-green-100 flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-green-200" />
          Market News
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {financialNews.slice(0, 3).map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-green-300/50">
          <div className="flex items-center justify-center gap-2 text-xs text-green-100 dark:text-green-200 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>Stay informed with real-time market updates</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function NewsItem({ news }: { news: NewsItem }) {
  const getCategoryColor = (category: NewsItem['category']) => {
    switch (category) {
      case 'economy':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      case 'earnings':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'market':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
      case 'crypto':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
      case 'commodities':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }

  return (
    <div className="p-3 rounded-lg bg-green-gradient-full border-2 border-green-400 dark:border-green-300 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-200 hover:scale-[1.01]">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm border border-white/30 text-white`}>
              {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
            </span>
            <div className="flex items-center gap-1 text-xs text-green-100 dark:text-green-200">
              <Clock className="w-3 h-3" />
              <span>{news.timestamp}</span>
            </div>
          </div>
          <h4 className="text-sm font-medium text-white dark:text-green-50 leading-tight mb-1">
            {news.headline}
          </h4>
          <p className="text-xs text-green-100 dark:text-green-200 font-medium">
            {news.source}
          </p>
        </div>
      </div>
    </div>
  )
}
