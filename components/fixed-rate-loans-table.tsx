"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface FixedRateLoansTableProps {
  loans: Array<{
    rate: string
    duration: string
    minAmount: string
    maxAmount: string
  }>
}

export function FixedRateLoansTable({ loans }: FixedRateLoansTableProps) {
  const [selectedToken, setSelectedToken] = useState("USDT")
  const tokens = ["USDT", "USDC", "FDUSD", "TRX"]

  return (
    <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Fixed Rate Loans</h2>
        <p className="text-slate-300">Borrow and Supply with Your Chosen Fixed Interest Rate</p>
      </div>

      {/* Token Selection */}
      <div className="flex space-x-2 mb-6">
        {tokens.map((token) => (
          <Button
            key={token}
            variant={selectedToken === token ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedToken(token)}
            className={
              selectedToken === token
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "border-slate-600 text-slate-300 bg-transparent hover:bg-slate-700"
            }
          >
            {token}
          </Button>
        ))}
      </div>

      {/* Table */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">I want to Borrow</h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 text-slate-300 font-medium">Fixed Rate (APY)</th>
                <th className="text-left py-3 text-slate-300 font-medium">Duration</th>
                <th className="text-left py-3 text-slate-300 font-medium">Min Borrow Amount</th>
                <th className="text-left py-3 text-slate-300 font-medium">Max Borrowable Amount</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan, index) => (
                <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                  <td className="py-4 text-orange-400 font-medium">{loan.rate}</td>
                  <td className="py-4 text-slate-300">{loan.duration}</td>
                  <td className="py-4 text-slate-300">{loan.minAmount}</td>
                  <td className="py-4 text-slate-300">{loan.maxAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
