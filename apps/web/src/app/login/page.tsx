import { LoginButton } from '../../components/auth/login-button';
import { Logo } from '../../components/layout/logo';
import { MarketOverview, StockTicker, NewsFeed, TradingStats } from '../../components/financial';
import { MobileMarketSummary } from '../../components/financial/mobile-market-summary';

export default function LoginPage() {
  return (
    <main className="relative min-h-screen bg-green-gradient-full overflow-hidden">
      {/* Top Navigation with Login Button */}
      <div className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <div>
              <h1 className="text-2xl font-bold text-white dark:text-green-100">
                FinanceTrader Pro
              </h1>
              <p className="text-green-100 dark:text-green-200 text-sm">Professional Trading Platform</p>
            </div>
          </div>
          <LoginButton />
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-green-700/10 -z-10" />
      <div className="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-r from-green-400/30 to-emerald-500/30 rounded-full filter blur-3xl opacity-60 animate-[blob_8s_infinite]" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-r from-emerald-400/30 to-teal-500/30 rounded-full filter blur-3xl opacity-60 animate-[blob_8s_infinite_4s]" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-full filter blur-3xl opacity-40 animate-[blob_12s_infinite_2s]" />

      {/* Financial Chart Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 dark:opacity-15">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
          <path d="M0 400 Q300 200 600 300 T1200 250" stroke="currentColor" strokeWidth="2" className="text-green-300" />
          <path d="M0 500 Q300 300 600 400 T1200 350" stroke="currentColor" strokeWidth="2" className="text-emerald-300" />
          <path d="M0 300 Q300 100 600 200 T1200 150" stroke="currentColor" strokeWidth="2" className="text-teal-300" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen pt-24 p-8">
        {/* Mobile Market Summary */}
        <div className="lg:hidden mb-8">
          <MobileMarketSummary />
        </div>

        {/* Desktop Market Data Grid */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-slide-up">
            <div className="space-y-8">
              <MarketOverview className="animate-fade-in" />
              <TradingStats className="animate-fade-in" />
            </div>
            <div className="space-y-8">
              <StockTicker className="animate-fade-in" />
              <NewsFeed className="animate-fade-in" />
            </div>
          </div>
        </div>

        {/* Footer Information */}
        <div className="mt-12 pt-8 border-t border-green-300/30 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-green-gradient-secondary rounded-xl backdrop-blur-sm border-2 border-green-400/50">
              <div className="text-3xl font-bold text-white dark:text-green-50">99.9%</div>
              <div className="text-sm text-green-100 dark:text-green-200 font-medium">Uptime Guarantee</div>
            </div>
            <div className="p-6 bg-green-gradient-secondary rounded-xl backdrop-blur-sm border-2 border-green-400/50">
              <div className="text-3xl font-bold text-white dark:text-green-50">24/7</div>
              <div className="text-sm text-green-100 dark:text-green-200 font-medium">Market Monitoring</div>
            </div>
            <div className="p-6 bg-green-gradient-secondary rounded-xl backdrop-blur-sm border-2 border-green-400/50">
              <div className="text-3xl font-bold text-white dark:text-green-50">Real-time</div>
              <div className="text-sm text-green-100 dark:text-green-200 font-medium">Data Streaming</div>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="text-center mt-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-white dark:text-green-50 mb-4">
            Welcome to Professional Trading
          </h2>
          <p className="text-xl text-green-100 dark:text-green-200 mb-6">
            Real-time market data, advanced analytics, and secure trading platform
          </p>
          <div className="flex items-center justify-center gap-2 text-green-200">
            <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
            <span className="font-medium">Markets are open • Live data streaming</span>
          </div>
        </div>
      </div>
    </main>
  );
}
