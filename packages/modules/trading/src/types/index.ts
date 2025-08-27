export interface Order {
  id: string;
  clientId: string;
  symbol: string;
  side: 'buy' | 'sell';
  orderType: 'market' | 'limit' | 'stop' | 'stop_limit';
  quantity: number;
  price?: number;
  stopPrice?: number;
  timeInForce: 'day' | 'gtc' | 'ioc' | 'fok';
  status: 'pending' | 'partial' | 'filled' | 'cancelled' | 'rejected';
  filledQuantity: number;
  averageFillPrice?: number;
  createdAt: Date;
  updatedAt: Date;
  executedAt?: Date;
}

export interface Trade {
  id: string;
  orderId: string;
  symbol: string;
  side: 'buy' | 'sell';
  quantity: number;
  price: number;
  commission: number;
  executedAt: Date;
  counterparty?: string;
}

export interface MarketData {
  symbol: string;
  lastPrice: number;
  bid: number;
  ask: number;
  bidSize: number;
  askSize: number;
  volume: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  timestamp: Date;
}

export interface Position {
  id: string;
  clientId: string;
  symbol: string;
  quantity: number;
  averagePrice: number;
  marketValue: number;
  unrealizedPnL: number;
  realizedPnL: number;
  lastUpdated: Date;
}

export interface TradingAccount {
  id: string;
  clientId: string;
  accountNumber: string;
  accountType: 'cash' | 'margin';
  buyingPower: number;
  cashBalance: number;
  marginUsed: number;
  dayTradingBuyingPower: number;
  status: 'active' | 'restricted' | 'closed';
}
