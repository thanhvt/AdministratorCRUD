import { LoginForm } from '../../components/auth/login-form';
import { Logo } from '../../components/layout/logo';
import { MarketOverview, StockTicker, NewsFeed, TradingStats } from '../../components/financial';
import { MobileMarketSummary } from '../../components/financial/mobile-market-summary';

export default function LoginPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 -z-10" />
      <div className="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-indigo-500/20 rounded-full filter blur-3xl opacity-60 animate-[blob_8s_infinite]" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 rounded-full filter blur-3xl opacity-60 animate-[blob_8s_infinite_4s]" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-400/10 to-pink-500/10 rounded-full filter blur-3xl opacity-40 animate-[blob_12s_infinite_2s]" />

      {/* Financial Chart Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
          <path d="M0 400 Q300 200 600 300 T1200 250" stroke="currentColor" strokeWidth="2" className="text-blue-600" />
          <path d="M0 500 Q300 300 600 400 T1200 350" stroke="currentColor" strokeWidth="2" className="text-emerald-600" />
          <path d="M0 300 Q300 100 600 200 T1200 150" stroke="currentColor" strokeWidth="2" className="text-purple-600" />
        </svg>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Financial Information */}
        <div className="hidden lg:flex lg:w-2/3 xl:w-3/4 p-8 flex-col">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <Logo />
              <div>
                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
                  FinanceTrader Pro
                </h1>
                <p className="text-slate-600 dark:text-slate-400">Professional Trading Platform</p>
              </div>
            </div>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"></div>
          </div>

          {/* Market Data Grid */}
          <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-6 animate-slide-up">
            <div className="space-y-6">
              <MarketOverview className="animate-fade-in" />
              <TradingStats className="animate-fade-in" />
            </div>
            <div className="space-y-6">
              <StockTicker className="animate-fade-in" />
              <NewsFeed className="animate-fade-in" />
            </div>
          </div>

          {/* Footer Information */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">99.9%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Uptime Guarantee</div>
              </div>
              <div className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">24/7</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Market Monitoring</div>
              </div>
              <div className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">Real-time</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Data Streaming</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/3 xl:w-1/4 min-h-screen flex items-center justify-center p-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-l border-slate-200/50 dark:border-slate-700/50">
          <div className="w-full max-w-md animate-slide-up">
            {/* Mobile Logo */}
            <div className="lg:hidden flex justify-center mb-8">
              <div className="text-center">
                <Logo />
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-2">
                  FinanceTrader Pro
                </h1>
              </div>
            </div>

            {/* Mobile Market Summary */}
            <div className="lg:hidden mb-8">
              <MobileMarketSummary />
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-2">
                Welcome Back
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Access your professional trading dashboard
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span>Markets are open</span>
              </div>
            </div>

            <LoginForm />

            {/* Security Features */}
            <div className="mt-8 space-y-3 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center justify-center gap-2">
                <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                <span>256-bit SSL encryption</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                <span>Multi-factor authentication</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                <span>SOC 2 Type II compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
