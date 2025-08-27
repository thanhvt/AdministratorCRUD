import { Order, Trade, MarketData, Position, TradingAccount } from '../types';

// Mock data for demo
const mockOrders: Order[] = [
  {
    id: 'ord-001',
    clientId: 'client-001',
    symbol: 'AAPL',
    side: 'buy',
    orderType: 'limit',
    quantity: 100,
    price: 175.00,
    timeInForce: 'day',
    status: 'pending',
    filledQuantity: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'ord-002',
    clientId: 'client-001',
    symbol: 'GOOGL',
    side: 'sell',
    orderType: 'market',
    quantity: 50,
    timeInForce: 'ioc',
    status: 'filled',
    filledQuantity: 50,
    averageFillPrice: 142.85,
    createdAt: new Date(Date.now() - 3600000),
    updatedAt: new Date(Date.now() - 3500000),
    executedAt: new Date(Date.now() - 3500000),
  },
];

const mockMarketData: MarketData[] = [
  {
    symbol: 'AAPL',
    lastPrice: 175.50,
    bid: 175.48,
    ask: 175.52,
    bidSize: 100,
    askSize: 200,
    volume: 45678900,
    change: 2.30,
    changePercent: 1.33,
    high: 176.80,
    low: 173.20,
    open: 174.10,
    previousClose: 173.20,
    timestamp: new Date(),
  },
  {
    symbol: 'GOOGL',
    lastPrice: 142.80,
    bid: 142.75,
    ask: 142.85,
    bidSize: 150,
    askSize: 100,
    volume: 23456789,
    change: -1.45,
    changePercent: -1.00,
    high: 144.50,
    low: 142.10,
    open: 143.80,
    previousClose: 144.25,
    timestamp: new Date(),
  },
  {
    symbol: 'TSLA',
    lastPrice: 248.50,
    bid: 248.40,
    ask: 248.60,
    bidSize: 75,
    askSize: 125,
    volume: 34567890,
    change: 5.20,
    changePercent: 2.14,
    high: 250.00,
    low: 243.30,
    open: 245.00,
    previousClose: 243.30,
    timestamp: new Date(),
  },
];

const mockPositions: Position[] = [
  {
    id: 'pos-001',
    clientId: 'client-001',
    symbol: 'AAPL',
    quantity: 200,
    averagePrice: 170.00,
    marketValue: 35100.00,
    unrealizedPnL: 1100.00,
    realizedPnL: 0,
    lastUpdated: new Date(),
  },
  {
    id: 'pos-002',
    clientId: 'client-001',
    symbol: 'MSFT',
    quantity: 150,
    averagePrice: 320.00,
    marketValue: 48750.00,
    unrealizedPnL: 750.00,
    realizedPnL: 250.00,
    lastUpdated: new Date(),
  },
];

export class TradingService {
  // Order Management Feature 1: Order Management
  async getOrders(clientId?: string): Promise<Order[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return clientId 
      ? mockOrders.filter(order => order.clientId === clientId)
      : mockOrders;
  }

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      clientId: orderData.clientId || 'client-001',
      symbol: orderData.symbol || '',
      side: orderData.side || 'buy',
      orderType: orderData.orderType || 'market',
      quantity: orderData.quantity || 0,
      price: orderData.price,
      stopPrice: orderData.stopPrice,
      timeInForce: orderData.timeInForce || 'day',
      status: 'pending',
      filledQuantity: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockOrders.push(newOrder);
    return newOrder;
  }

  async cancelOrder(orderId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const orderIndex = mockOrders.findIndex(order => order.id === orderId);
    if (orderIndex !== -1 && mockOrders[orderIndex].status === 'pending') {
      mockOrders[orderIndex].status = 'cancelled';
      mockOrders[orderIndex].updatedAt = new Date();
      return true;
    }
    return false;
  }

  // Order Management Feature 2: Position Tracking
  async getPositions(clientId?: string): Promise<Position[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return clientId 
      ? mockPositions.filter(position => position.clientId === clientId)
      : mockPositions;
  }

  async getPositionSummary(clientId: string) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const positions = mockPositions.filter(pos => pos.clientId === clientId);
    
    const totalMarketValue = positions.reduce((sum, pos) => sum + pos.marketValue, 0);
    const totalUnrealizedPnL = positions.reduce((sum, pos) => sum + pos.unrealizedPnL, 0);
    const totalRealizedPnL = positions.reduce((sum, pos) => sum + pos.realizedPnL, 0);
    
    return {
      totalPositions: positions.length,
      totalMarketValue,
      totalUnrealizedPnL,
      totalRealizedPnL,
      totalPnL: totalUnrealizedPnL + totalRealizedPnL,
      topPositions: positions
        .sort((a, b) => b.marketValue - a.marketValue)
        .slice(0, 5),
    };
  }

  // Market Data Feature 1: Real-time Market Data
  async getMarketData(symbols?: string[]): Promise<MarketData[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return symbols 
      ? mockMarketData.filter(data => symbols.includes(data.symbol))
      : mockMarketData;
  }

  async getMarketDataBySymbol(symbol: string): Promise<MarketData | null> {
    await new Promise(resolve => setTimeout(resolve, 150));
    return mockMarketData.find(data => data.symbol === symbol) || null;
  }

  // Market Data Feature 2: Market Analytics
  async getMarketSummary() {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const gainers = mockMarketData
      .filter(data => data.change > 0)
      .sort((a, b) => b.changePercent - a.changePercent)
      .slice(0, 5);
    
    const losers = mockMarketData
      .filter(data => data.change < 0)
      .sort((a, b) => a.changePercent - b.changePercent)
      .slice(0, 5);
    
    const totalVolume = mockMarketData.reduce((sum, data) => sum + data.volume, 0);
    const avgChange = mockMarketData.reduce((sum, data) => sum + data.changePercent, 0) / mockMarketData.length;
    
    return {
      marketOverview: {
        totalSymbols: mockMarketData.length,
        totalVolume,
        averageChange: Number(avgChange.toFixed(2)),
        gainersCount: gainers.length,
        losersCount: losers.length,
      },
      topGainers: gainers,
      topLosers: losers,
      highestVolume: mockMarketData
        .sort((a, b) => b.volume - a.volume)
        .slice(0, 5),
    };
  }

  // Simulate real-time price updates
  subscribeToMarketData(symbols: string[], callback: (data: MarketData) => void) {
    const interval = setInterval(() => {
      symbols.forEach(symbol => {
        const data = mockMarketData.find(d => d.symbol === symbol);
        if (data) {
          // Simulate price movement
          const change = (Math.random() - 0.5) * 2; // Random change between -1 and 1
          data.lastPrice += change;
          data.change += change;
          data.changePercent = (data.change / data.previousClose) * 100;
          data.timestamp = new Date();
          
          callback(data);
        }
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }
}

export const tradingService = new TradingService();
