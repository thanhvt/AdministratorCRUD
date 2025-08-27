'use client'

import { useState, useEffect } from 'react'
import { Button, Card, CardHeader, CardTitle, CardContent } from '@banking/ui'
import { CustodyAccount } from '../types'
import { securitiesService } from '../services/securities-service'

export function CustodyServices() {
  const [accounts, setAccounts] = useState<CustodyAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)
  const [safekeepingReport, setSafekeepingReport] = useState<any>(null)
  const [reportLoading, setReportLoading] = useState(false)

  useEffect(() => {
    loadCustodyAccounts()
  }, [])

  const loadCustodyAccounts = async () => {
    try {
      setLoading(true)
      const data = await securitiesService.getCustodyAccounts()
      setAccounts(data)
    } catch (err: any) {
      console.error('Failed to load custody accounts:', err)
    } finally {
      setLoading(false)
    }
  }

  const generateReport = async (accountId: string) => {
    try {
      setReportLoading(true)
      setSelectedAccount(accountId)
      const report = await securitiesService.generateSafekeepingReport(accountId)
      setSafekeepingReport(report)
    } catch (err: any) {
      console.error('Failed to generate report:', err)
    } finally {
      setReportLoading(false)
    }
  }

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'inactive': return 'text-gray-600 bg-gray-100'
      case 'frozen': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading custody accounts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Custody Services</h2>
        <p className="text-sm text-gray-600">
          {accounts.length} custody account{accounts.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Custody Accounts List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Custody Accounts</h3>
          {accounts.map((account) => (
            <Card key={account.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{account.clientName}</CardTitle>
                    <p className="text-sm text-gray-600">{account.accountNumber}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(account.status)}`}>
                    {account.status.toUpperCase()}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Total Assets:</span>
                    <span className="text-sm font-bold">
                      {formatCurrency(account.totalAssets, account.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Account Type:</span>
                    <span className="text-sm capitalize">{account.accountType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Open Date:</span>
                    <span className="text-sm">{account.openDate.toLocaleDateString()}</span>
                  </div>
                  <div className="pt-2">
                    <Button
                      onClick={() => generateReport(account.id)}
                      disabled={reportLoading && selectedAccount === account.id}
                      className="w-full"
                      size="sm"
                    >
                      {reportLoading && selectedAccount === account.id
                        ? 'Generating...'
                        : 'Generate Safekeeping Report'
                      }
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Safekeeping Report */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Safekeeping Report</h3>
          {safekeepingReport ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {safekeepingReport.accountInfo.clientName}
                </CardTitle>
                <p className="text-sm text-gray-600">
                  {safekeepingReport.accountInfo.accountNumber}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Asset Breakdown */}
                <div>
                  <h4 className="font-medium mb-2">Asset Breakdown</h4>
                  <div className="space-y-1">
                    {Object.entries(safekeepingReport.assetBreakdown).map(([asset, percentage]) => (
                      <div key={asset} className="flex justify-between text-sm">
                        <span className="capitalize">{asset}:</span>
                        <span>{percentage as number}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risk Metrics */}
                <div className="pt-2 border-t">
                  <h4 className="font-medium mb-2">Risk Metrics</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>VaR 95%:</span>
                      <span>{safekeepingReport.riskMetrics.var95}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Beta:</span>
                      <span>{safekeepingReport.riskMetrics.beta}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Sharpe Ratio:</span>
                      <span>{safekeepingReport.riskMetrics.sharpeRatio}</span>
                    </div>
                  </div>
                </div>

                {/* Compliance Status */}
                <div className="pt-2 border-t">
                  <h4 className="font-medium mb-2">Compliance Status</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Status:</span>
                      <span className="text-green-600 font-medium">
                        {safekeepingReport.complianceStatus.regulatoryCompliance}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Last Audit:</span>
                      <span>{safekeepingReport.complianceStatus.lastAudit.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Next Audit:</span>
                      <span>{safekeepingReport.complianceStatus.nextAudit.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-600">
                  Select a custody account and generate a safekeeping report to view details
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
