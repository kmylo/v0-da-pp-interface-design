"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface LoanCalculatorProps {
  calculatorTab: "borrow" | "supply"
  onTabChange: (tab: "borrow" | "supply") => void
  calculatorData: {
    amount: string
    duration: string
    repayment: string
    interestRate: number
    monthlyPayment: number
    targetRate: string
  }
  onUpdateCalculator: (field: string, value: string) => void
}

export function LoanCalculator({
  calculatorTab,
  onTabChange,
  calculatorData,
  onUpdateCalculator,
}: LoanCalculatorProps) {
  return (
    <div className="bg-gradient-to-br from-purple-900/50 to-cyan-900/50 rounded-2xl p-6 border border-purple-500/30">
      <Tabs value={calculatorTab} onValueChange={(value) => onTabChange(value as "borrow" | "supply")}>
        <TabsList className="grid w-full grid-cols-2 bg-slate-800">
          <TabsTrigger value="borrow" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Borrow
          </TabsTrigger>
          <TabsTrigger value="supply" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Supply
          </TabsTrigger>
        </TabsList>

        <TabsContent value="borrow" className="space-y-4 mt-6">
          <div>
            <Label className="text-slate-300 text-sm">Amount</Label>
            <div className="flex items-center space-x-2 mt-1">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">$</span>
                <Input
                  value={calculatorData.amount}
                  onChange={(e) => onUpdateCalculator("amount", e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white pl-8"
                  placeholder="500,000.00"
                />
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">USD</Badge>
            </div>
          </div>

          <div>
            <Label className="text-slate-300 text-sm">Duration</Label>
            <Select value={calculatorData.duration} onValueChange={(value) => onUpdateCalculator("duration", value)}>
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Year</SelectItem>
                <SelectItem value="3">3 Years</SelectItem>
                <SelectItem value="5">5 Years</SelectItem>
                <SelectItem value="7">7 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-slate-300 text-sm">Repayment</Label>
            <Select value={calculatorData.repayment} onValueChange={(value) => onUpdateCalculator("repayment", value)}>
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="annually">Annually</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4 border-t border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-300">Interest Rate</span>
              <span className="text-lg font-bold text-purple-400">{calculatorData.interestRate}% Fixed</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-300">Monthly Payment</span>
              <span className="text-2xl font-bold text-purple-400">
                ${calculatorData.monthlyPayment.toLocaleString()}
              </span>
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-3">
              Secure Funding
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="supply" className="space-y-4 mt-6">
          <div>
            <Label className="text-slate-300 text-sm">Supply Amount</Label>
            <div className="flex items-center space-x-2 mt-1">
              <Input placeholder="100000" className="bg-slate-800 border-slate-700 text-white" />
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">USDT</Badge>
            </div>
          </div>

          <div>
            <Label className="text-slate-300 text-sm">Target Interest Rate</Label>
            <div className="flex items-center space-x-2 mt-1">
              <Input placeholder="Enter Target Rate" className="bg-slate-800 border-slate-700 text-white" />
              <span className="text-slate-400">%</span>
            </div>
          </div>

          <div>
            <Label className="text-slate-300 text-sm">Duration</Label>
            <div className="flex space-x-2 mt-2">
              <Button variant="default" size="sm" className="bg-orange-500 hover:bg-orange-600">
                300
              </Button>
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 bg-transparent">
                900
              </Button>
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 bg-transparent">
                1800
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700">
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-3">
              Start Supplying
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
