export interface Security {
  id: string;
  symbol: string;
  name: string;
  type: 'stock' | 'bond' | 'etf' | 'mutual_fund';
  cusip: string;
  isin: string;
  currentPrice: number;
  currency: string;
  exchange: string;
  sector?: string;
  lastUpdated: Date;
}

export interface Portfolio {
  id: string;
  clientId: string;
  clientName: string;
  totalValue: number;
  currency: string;
  holdings: Holding[];
  lastUpdated: Date;
}

export interface Holding {
  id: string;
  securityId: string;
  security: Security;
  quantity: number;
  averageCost: number;
  currentValue: number;
  unrealizedGainLoss: number;
  percentageOfPortfolio: number;
}

export interface CustodyAccount {
  id: string;
  accountNumber: string;
  clientId: string;
  clientName: string;
  accountType: 'individual' | 'corporate' | 'trust' | 'pension';
  totalAssets: number;
  currency: string;
  status: 'active' | 'inactive' | 'frozen';
  openDate: Date;
  lastActivity: Date;
}

export interface Transaction {
  id: string;
  portfolioId: string;
  securityId: string;
  type: 'buy' | 'sell' | 'dividend' | 'interest' | 'fee';
  quantity: number;
  price: number;
  totalAmount: number;
  currency: string;
  executionDate: Date;
  settlementDate: Date;
  status: 'pending' | 'executed' | 'settled' | 'cancelled';
}
