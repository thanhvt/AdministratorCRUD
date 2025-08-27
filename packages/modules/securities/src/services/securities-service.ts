import { Security, Portfolio, CustodyAccount, Transaction } from '../types';

// Mock data for demo
const mockSecurities: Security[] = [
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    type: 'stock',
    cusip: '037833100',
    isin: 'US0378331005',
    currentPrice: 175.50,
    currency: 'USD',
    exchange: 'NASDAQ',
    sector: 'Technology',
    lastUpdated: new Date(),
  },
  {
    id: '2',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    type: 'stock',
    cusip: '02079K305',
    isin: 'US02079K3059',
    currentPrice: 142.80,
    currency: 'USD',
    exchange: 'NASDAQ',
    sector: 'Technology',
    lastUpdated: new Date(),
  },
  {
    id: '3',
    symbol: 'SPY',
    name: 'SPDR S&P 500 ETF Trust',
    type: 'etf',
    cusip: '78462F103',
    isin: 'US78462F1030',
    currentPrice: 445.20,
    currency: 'USD',
    exchange: 'NYSE',
    lastUpdated: new Date(),
  },
];

const mockPortfolios: Portfolio[] = [
  {
    id: '1',
    clientId: 'client-001',
    clientName: 'John Smith',
    totalValue: 125000.00,
    currency: 'USD',
    holdings: [
      {
        id: 'h1',
        securityId: '1',
        security: mockSecurities[0],
        quantity: 100,
        averageCost: 150.00,
        currentValue: 17550.00,
        unrealizedGainLoss: 2550.00,
        percentageOfPortfolio: 14.04,
      },
      {
        id: 'h2',
        securityId: '2',
        security: mockSecurities[1],
        quantity: 200,
        averageCost: 130.00,
        currentValue: 28560.00,
        unrealizedGainLoss: 2560.00,
        percentageOfPortfolio: 22.85,
      },
    ],
    lastUpdated: new Date(),
  },
];

const mockCustodyAccounts: CustodyAccount[] = [
  {
    id: '1',
    accountNumber: 'CUST-001-2024',
    clientId: 'client-001',
    clientName: 'John Smith',
    accountType: 'individual',
    totalAssets: 125000.00,
    currency: 'USD',
    status: 'active',
    openDate: new Date('2024-01-15'),
    lastActivity: new Date(),
  },
  {
    id: '2',
    accountNumber: 'CUST-002-2024',
    clientId: 'client-002',
    clientName: 'ABC Corporation',
    accountType: 'corporate',
    totalAssets: 2500000.00,
    currency: 'USD',
    status: 'active',
    openDate: new Date('2024-02-01'),
    lastActivity: new Date(),
  },
];

export class SecuritiesService {
  // Portfolio Management Feature 1: Get Portfolio Overview
  async getPortfolios(): Promise<Portfolio[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockPortfolios;
  }

  async getPortfolioById(id: string): Promise<Portfolio | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockPortfolios.find(p => p.id === id) || null;
  }

  // Portfolio Management Feature 2: Calculate Portfolio Analytics
  async getPortfolioAnalytics(portfolioId: string) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const portfolio = mockPortfolios.find(p => p.id === portfolioId);
    
    if (!portfolio) return null;

    const totalGainLoss = portfolio.holdings.reduce((sum, h) => sum + h.unrealizedGainLoss, 0);
    const totalCost = portfolio.holdings.reduce((sum, h) => sum + (h.averageCost * h.quantity), 0);
    const returnPercentage = (totalGainLoss / totalCost) * 100;

    return {
      totalValue: portfolio.totalValue,
      totalCost,
      totalGainLoss,
      returnPercentage,
      topHoldings: portfolio.holdings
        .sort((a, b) => b.percentageOfPortfolio - a.percentageOfPortfolio)
        .slice(0, 5),
      sectorAllocation: this.calculateSectorAllocation(portfolio.holdings),
    };
  }

  // Custody Services Feature 1: Account Management
  async getCustodyAccounts(): Promise<CustodyAccount[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockCustodyAccounts;
  }

  async getCustodyAccountById(id: string): Promise<CustodyAccount | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCustodyAccounts.find(a => a.id === id) || null;
  }

  // Custody Services Feature 2: Asset Safekeeping Report
  async generateSafekeepingReport(accountId: string) {
    await new Promise(resolve => setTimeout(resolve, 800));
    const account = mockCustodyAccounts.find(a => a.id === accountId);
    
    if (!account) return null;

    return {
      accountInfo: account,
      assetBreakdown: {
        stocks: 65.5,
        bonds: 20.3,
        etfs: 10.2,
        cash: 4.0,
      },
      riskMetrics: {
        var95: 2.5, // Value at Risk 95%
        beta: 1.15,
        sharpeRatio: 1.8,
      },
      complianceStatus: {
        regulatoryCompliance: 'Compliant',
        lastAudit: new Date('2024-07-15'),
        nextAudit: new Date('2024-10-15'),
      },
    };
  }

  private calculateSectorAllocation(holdings: any[]) {
    const sectorMap = new Map();
    
    holdings.forEach(holding => {
      const sector = holding.security.sector || 'Other';
      const current = sectorMap.get(sector) || 0;
      sectorMap.set(sector, current + holding.percentageOfPortfolio);
    });

    return Array.from(sectorMap.entries()).map(([sector, percentage]) => ({
      sector,
      percentage: Number(percentage.toFixed(2)),
    }));
  }
}

export const securitiesService = new SecuritiesService();
