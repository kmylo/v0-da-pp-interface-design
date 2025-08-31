"use client"

import { CheckCircle, Gauge } from "lucide-react"

interface InterestRateGaugeProps {
  rate: number
  riskLevel: "Low" | "Moderate" | "High"
}

export function InterestRateGauge({ rate, riskLevel }: InterestRateGaugeProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return "text-green-400"
      case "Moderate":
        return "text-yellow-400"
      case "High":
        return "text-red-400"
      default:
        return "text-green-400"
    }
  }

  const getRiskPercentage = (level: string) => {
    switch (level) {
      case "Low":
        return 0.3
      case "Moderate":
        return 0.6
      case "High":
        return 0.9
      default:
        return 0.3
    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-2xl p-6 border border-blue-500/30">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-4">Estimated Fixed Interest Rate</h3>
        <div className="flex items-center justify-center space-x-2 mb-4">
          <span className="text-3xl font-bold text-green-400">{rate}%</span>
          <CheckCircle className="h-6 w-6 text-green-400" />
        </div>

        <div className="mb-4">
          <div className="text-sm text-slate-300 mb-2">Risk Meter</div>
          <div className="relative w-24 h-24 mx-auto">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-slate-700"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 40 * getRiskPercentage(riskLevel)} ${2 * Math.PI * 40}`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Gauge className={`h-8 w-8 ${getRiskColor(riskLevel)}`} />
            </div>
          </div>
          <div className={`text-sm ${getRiskColor(riskLevel)} mt-2`}>Risk Level: {riskLevel}</div>
        </div>
      </div>
    </div>
  )
}
