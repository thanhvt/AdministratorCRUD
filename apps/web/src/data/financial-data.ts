export interface MarketIndex {
  name: string;
  symbol: string;
  value: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
}

export interface Stock {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
  volume: string;
  marketCap: string;
}

export interface NewsItem {
  id: string;
  headline: string;
  source: string;
  timestamp: string;
  category: 'market' | 'earnings' | 'economy' | 'crypto' | 'commodities';
}

export interface TradingStats {
  totalVolume: string;
  advancingStocks: number;
  decliningStocks: number;
  unchangedStocks: number;
  newHighs: number;
  newLows: number;
}

export const marketIndices: MarketIndex[] = [
  {
    name: 'S&P 500',
    symbol: 'SPX',
    value: '4,567.80',
    change: '+23.45',
    changePercent: '+0.52%',
    isPositive: true,
  },
  {
    name: 'NASDAQ Composite',
    symbol: 'IXIC',
    value: '14,239.88',
    change: '+89.12',
    changePercent: '+0.63%',
    isPositive: true,
  },
  {
    name: 'Dow Jones',
    symbol: 'DJI',
    value: '35,294.76',
    change: '-42.33',
    changePercent: '-0.12%',
    isPositive: false,
  },
  {
    name: 'Russell 2000',
    symbol: 'RUT',
    value: '2,089.44',
    change: '+12.67',
    changePercent: '+0.61%',
    isPositive: true,
  },
];

export const topStocks: Stock[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: '178.85',
    change: '+3.25',
    changePercent: '+1.85%',
    isPositive: true,
    volume: '52.4M',
    marketCap: '2.85T',
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: '378.90',
    change: '+5.67',
    changePercent: '+1.52%',
    isPositive: true,
    volume: '28.9M',
    marketCap: '2.81T',
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: '138.21',
    change: '+2.14',
    changePercent: '+1.57%',
    isPositive: true,
    volume: '31.2M',
    marketCap: '1.75T',
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: '144.05',
    change: '-1.89',
    changePercent: '-1.29%',
    isPositive: false,
    volume: '45.7M',
    marketCap: '1.49T',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: '248.50',
    change: '+8.92',
    changePercent: '+3.72%',
    isPositive: true,
    volume: '89.3M',
    marketCap: '789.2B',
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: '465.89',
    change: '+12.45',
    changePercent: '+2.75%',
    isPositive: true,
    volume: '42.1M',
    marketCap: '1.15T',
  },
];

export const financialNews: NewsItem[] = [
  {
    id: '1',
    headline: 'Federal Reserve signals potential rate cuts amid cooling inflation data',
    source: 'Reuters',
    timestamp: '2 hours ago',
    category: 'economy',
  },
  {
    id: '2',
    headline: 'Tech giants report strong Q3 earnings, beating analyst expectations',
    source: 'Bloomberg',
    timestamp: '4 hours ago',
    category: 'earnings',
  },
  {
    id: '3',
    headline: 'Oil prices climb 3% on Middle East supply concerns',
    source: 'MarketWatch',
    timestamp: '6 hours ago',
    category: 'commodities',
  },
  {
    id: '4',
    headline: 'Bitcoin surges past $45,000 as institutional adoption grows',
    source: 'CoinDesk',
    timestamp: '8 hours ago',
    category: 'crypto',
  },
  {
    id: '5',
    headline: 'Small-cap stocks outperform as investors rotate into value plays',
    source: 'Financial Times',
    timestamp: '12 hours ago',
    category: 'market',
  },
];

export const tradingStats: TradingStats = {
  totalVolume: '11.2B',
  advancingStocks: 1847,
  decliningStocks: 1203,
  unchangedStocks: 156,
  newHighs: 89,
  newLows: 23,
};

// Utility function to simulate real-time data updates
export const getRandomPriceChange = (basePrice: number, volatility: number = 0.02): number => {
  const change = (Math.random() - 0.5) * 2 * volatility * basePrice;
  return Math.round(change * 100) / 100;
};

// Function to format large numbers
export const formatLargeNumber = (num: number): string => {
  if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T';
  if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
  return num.toString();
};
