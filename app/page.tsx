"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Home, Building2, PieChart, Coins, TrendingUp, CheckCircle } from "lucide-react"
import { AuctionListSection } from "@/components/auction-list-section"
import { LiveAuctionSection } from "@/components/live-auction-section"

import { AIChatInterface } from "@/components/ai-chat-interface"
import { LoanCalculator } from "@/components/loan-calculator"
import { FixedRateLoansTable } from "@/components/fixed-rate-loans-table"
import { DeFiEducationSection } from "@/components/defi-education-section"
import { Footer } from "@/components/footer"

declare global {
  interface Window {
    ethereum?: any
  }
}

type UseCase = "personal" | "startup" | "asset" | "stable" | null
type ChatMessage = {
  id: string
  type: "user" | "system"
  content: string
  timestamp: Date
}

export default function OKBondAI() {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState<string>("")
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)

  const [calculatorTab, setCalculatorTab] = useState<"borrow" | "supply">("borrow")
  const [calculatorData, setCalculatorData] = useState({
    amount: "500000",
    duration: "5",
    repayment: "monthly",
    interestRate: 7.5,
    monthlyPayment: 10024,
    targetRate: "",
  })

  const [loanCalculator, setLoanCalculator] = useState({
    amount: "",
    duration: "300",
    interestRate: "",
    collateral: "",
    monthlyPayment: 0,
    isVisible: false,
  })

  const [marketComparison, setMarketComparison] = useState({
    okbondRate: 7.5,
    traditionalRate: 12.5,
    equityCost: 0,
    traditionalEquity: 25,
    isVisible: false,
  })

  const fixedRateLoans = [
    { rate: "5.1%", duration: "30 Days", minAmount: "50,000", maxAmount: "100,000" },
    { rate: "5.9%", duration: "30 Days", minAmount: "50,000", maxAmount: "100,000" },
    { rate: "5.18%", duration: "30 Days", minAmount: "50,000", maxAmount: "100,000" },
  ]

  const updateCalculator = (field: string, value: string) => {
    setCalculatorData((prev) => {
      const updated = { ...prev, [field]: value }

      // Recalculate monthly payment when amount or duration changes
      if (field === "amount" || field === "duration") {
        const amount = Number.parseFloat(updated.amount) || 0
        const years = Number.parseFloat(updated.duration) || 1
        const rate = updated.interestRate / 100 / 12
        const months = years * 12

        if (amount > 0 && months > 0) {
          const monthlyPayment = (amount * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1)
          updated.monthlyPayment = Math.round(monthlyPayment)
        }
      }

      return updated
    })
  }

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        setAccount(accounts[0])
        setIsConnected(true)
      } catch (error) {
        console.error("Failed to connect wallet:", error)
      }
    } else {
      alert("Please install MetaMask to use this application")
    }
  }

  const addMessage = (type: "user" | "system", content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
    }
    setChatMessages((prev) => [...prev, newMessage])
  }

  const handleUseCaseSelect = (useCase: UseCase) => {
    setSelectedUseCase(useCase)
    setChatMessages([])

    if (useCase === "personal") {
      addMessage("system", "I'm looking for a loan to buy a house.")
      setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
          addMessage(
            "system",
            "Great! To help me find the best options, please tell me: What is the approximate loan amount you need (e.g., in USDC) and over what duration (in months)?",
          )
        }, 1500)
      }, 500)
    } else if (useCase === "startup") {
      addMessage("system", "I need funding for my startup.")
      setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
          addMessage(
            "system",
            "Excellent! Startup funding without equity dilution is our specialty. How much capital does your startup need, and what's your preferred repayment period?",
          )
        }, 1500)
      }, 500)
    }
  }

  const handleChatMessage = (message: string) => {
    addMessage("user", message)
    const input = message.toLowerCase()

    setTimeout(() => {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)

        if (input.includes("250") || input.includes("250000")) {
          // Personal loan scenario
          setLoanCalculator({
            amount: "250,000",
            duration: "300",
            interestRate: "7.2",
            collateral: "125 ETH",
            monthlyPayment: 1610.49,
            isVisible: true,
          })
          addMessage(
            "system",
            "Excellent! I've pre-filled the details in the calculator below. Based on your $250,000 loan request, I can offer you a competitive 7.2% fixed rate. Now, let's discuss your collateral: What digital asset (e.g., ETH, WBTC) do you plan to use?",
          )
        } else if (input.includes("500") || input.includes("500000")) {
          // Startup funding scenario
          setLoanCalculator({
            amount: "500,000",
            duration: "1800",
            interestRate: "7.5",
            collateral: "IP + Revenue",
            monthlyPayment: 10024,
            isVisible: true,
          })
          setMarketComparison({
            okbondRate: 7.5,
            traditionalRate: 15.0,
            equityCost: 0,
            traditionalEquity: 25,
            isVisible: true,
          })
          addMessage(
            "system",
            "Perfect! I've structured a $500,000 startup funding offer at 7.5% fixed rate with 0% equity dilution. This is significantly better than traditional VC rounds that typically cost 20-30% equity. We can assess non-traditional collateral like IP, future revenue potential, and smaller data sets.",
          )
        } else {
          addMessage(
            "system",
            "I understand. Could you provide more specific details about the amount and timeframe you're looking for? This will help me create the best offer for you.",
          )
        }
      }, 2000)
    }, 500)
  }

  const useCases = [
    {
      id: "personal",
      title: "Personal Loan",
      description: "Get financing for personal needs like buying a home or car.",
      icon: Home,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "startup",
      title: "Startup Funding",
      description: "Secure the capital you need to launch and grow your business.",
      icon: Building2,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "asset",
      title: "Asset Leverage",
      description: "Leverage your digital assets to unlock liquidity without selling.",
      icon: PieChart,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "stable",
      title: "Stable Returns",
      description: "Lend capital at fixed rates for predictable, stable returns.",
      icon: Coins,
      color: "from-orange-500 to-red-500",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-red-500">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">OKBond</h1>
            </div>

            <nav className="hidden md:flex items-center space-x-8 text-sm">
              <a href="#" className="text-slate-300 hover:text-white">
                Calculator
              </a>
              <a href="#" className="text-slate-300 hover:text-white">
                Auctions
              </a>
              <a href="#" className="text-slate-300 hover:text-white">
                Dashboard
              </a>
              <a href="#" className="text-slate-300 hover:text-white">
                About
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4 text-sm text-slate-300">
                <span>(+62) 123 4567 8901</span>
                <span>Help Center</span>
              </div>

              {isConnected ? (
                <div className="flex items-center space-x-3 bg-slate-800 rounded-full px-4 py-2">
                  <Badge variant="secondary" className="bg-slate-700 text-slate-200">
                    {account.slice(0, 6)}...{account.slice(-4)}
                  </Badge>
                  <div className="h-2 w-2 rounded-full bg-green-400"></div>
                </div>
              ) : (
                <Button
                  onClick={connectWallet}
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-6"
                >
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4">
        {!selectedUseCase ? (
          <div className="space-y-12">
            <div className="grid lg:grid-cols-12 gap-8 min-h-[80vh]">
              {/* Left side - Hero content */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-6">
                  <h1 className="text-5xl font-bold text-white leading-tight">
                    Your Marketplace for Fixed-Rate Capital.
                  </h1>
                  <p className="text-xl text-slate-300 leading-relaxed">
                    Access fixed-rate capital and stable returns in one place.
                  </p>
                </div>

                <AIChatInterface messages={chatMessages} onSendMessage={handleChatMessage} isTyping={isTyping} />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Explore Use Cases</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {useCases.map((useCase) => {
                      const IconComponent = useCase.icon
                      return (
                        <button
                          key={useCase.id}
                          onClick={() => handleUseCaseSelect(useCase.id as UseCase)}
                          className="group relative overflow-hidden rounded-xl bg-slate-800 border border-slate-700 p-4 text-left transition-all duration-300 hover:border-slate-600 hover:bg-slate-700/50"
                        >
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${useCase.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                          ></div>
                          <div className="relative">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className={`p-2 rounded-lg bg-gradient-to-br ${useCase.color}`}>
                                <IconComponent className="h-4 w-4 text-white" />
                              </div>
                              <h4 className="font-semibold text-white text-sm">{useCase.title}</h4>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">{useCase.description}</p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-1">13+</div>
                    <div className="text-sm text-slate-400">Years of Industry Expertise</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-1">578M+</div>
                    <div className="text-sm text-slate-400">User Active</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-1">123.4+</div>
                    <div className="text-sm text-slate-400">Technology</div>
                  </div>
                </div>
              </div>

              {/* Center - 3D Visual */}
              <div className="lg:col-span-4 flex items-center justify-center">
                <div className="relative">
                  <div className="w-80 h-80 bg-gradient-to-br from-orange-400 via-pink-500 to-cyan-400 rounded-full opacity-20 blur-3xl"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="/abstract-3d-twisted-shape-orange-teal-gradient-mod.png"
                      alt="3D Abstract Shape"
                      className="w-64 h-64 object-contain"
                    />
                  </div>

                  {/* Floating cards */}
                  <div className="absolute -top-4 -right-4 bg-slate-800 rounded-lg p-3 border border-slate-700">
                    <div className="text-xs text-slate-400 mb-1">Build Smarter Workflows</div>
                    <div className="text-sm text-white">AI-driven growth</div>
                  </div>

                  <div className="absolute -bottom-4 -left-4 bg-slate-800 rounded-lg p-3 border border-slate-700">
                    <div className="text-xs text-slate-400 mb-1">Discover The Future</div>
                    <div className="text-sm text-white">Of AI</div>
                  </div>
                </div>
              </div>

              {/* Right side - Loan Calculator */}
              <div className="lg:col-span-3">
                <LoanCalculator
                  calculatorTab={calculatorTab}
                  onTabChange={setCalculatorTab}
                  calculatorData={calculatorData}
                  onUpdateCalculator={updateCalculator}
                />
              </div>
            </div>

            {/* Fixed Rate Loans Table with better spacing */}
            <div className="mt-24">
              <FixedRateLoansTable loans={fixedRateLoans} />
            </div>

            {/* Visual break with gradient divider */}
            <div className="my-24 flex items-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
              <div className="px-6">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
            </div>

            {/* Live Auction Section */}
            <div className="mb-24">
              <LiveAuctionSection />
            </div>

            {/* Visual break */}
            <div className="my-24 flex items-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
              <div className="px-6">
                <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
            </div>

            {/* Auction List Section */}
            <div className="mb-24">
              <AuctionListSection />
            </div>

            {/* Visual break */}
            <div className="my-24 flex items-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
              <div className="px-6">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
            </div>

            {/* DeFi Education Section with better spacing */}
            <div className="mb-24">
              <DeFiEducationSection />
            </div>

            {/* Visual break */}
            <div className="my-24 flex items-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
              <div className="px-6">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
            </div>

            {/* Collateral Flexibility Section with improved spacing */}
            <div className="mb-16">
              <div className="bg-slate-800 rounded-2xl p-12 border border-slate-700">
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center space-x-3 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500">
                      <Shield className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Collateral Flexibility</h2>
                  </div>
                  <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                    We understand startups. OKBond's AI evaluates various factors beyond traditional assets.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-slate-700/50 rounded-xl p-8 text-center">
                    <div className="flex justify-center mb-6">
                      <div className="p-4 rounded-xl bg-purple-500/20">
                        <Building2 className="h-8 w-8 text-purple-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4">Intellectual Property</h3>
                    <p className="text-slate-300">
                      Your patents, trademarks, and code are valuable assets we can assess.
                    </p>
                  </div>

                  <div className="bg-slate-700/50 rounded-xl p-8 text-center">
                    <div className="flex justify-center mb-6">
                      <div className="p-4 rounded-xl bg-purple-500/20">
                        <TrendingUp className="h-8 w-8 text-purple-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4">Future Revenue</h3>
                    <p className="text-slate-300">We analyze your growth potential and projected cash flows.</p>
                  </div>

                  <div className="bg-slate-700/50 rounded-xl p-8 text-center">
                    <div className="flex justify-center mb-6">
                      <div className="p-4 rounded-xl bg-purple-500/20">
                        <TrendingUp className="h-8 w-8 text-purple-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4">Smaller Data Sets</h3>
                    <p className="text-slate-300">
                      Our AI models are trained to find signals in limited historical data, perfect for new ventures.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Left side - Complete flow */}
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 space-y-8">
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedUseCase(null)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-800"
                  >
                    ← Back to Overview
                  </Button>

                  <h1 className="text-4xl font-bold text-white leading-tight">
                    {selectedUseCase === "personal" && "Personal Loan Solutions"}
                    {selectedUseCase === "startup" && "Fuel Your Startup's Growth Without Diluting Equity."}
                    {selectedUseCase === "asset" && "Leverage Your Digital Assets"}
                    {selectedUseCase === "stable" && "Earn Stable Returns"}
                  </h1>

                  <p className="text-lg text-slate-300">
                    {selectedUseCase === "personal" && "Get financing for personal needs with competitive fixed rates."}
                    {selectedUseCase === "startup" &&
                      "Secure the capital you need with fixed-rate loans, maintaining full ownership of your vision."}
                    {selectedUseCase === "asset" && "Unlock liquidity from your digital assets without selling them."}
                    {selectedUseCase === "stable" && "Lend capital at fixed rates for predictable, stable returns."}
                  </p>
                </div>

                <AIChatInterface
                  messages={chatMessages}
                  onSendMessage={handleChatMessage}
                  isTyping={isTyping}
                  placeholder="Tell me more about your needs..."
                />

                 <div className="space-y-3">
                <h4 className="text-sm font-medium text-slate-400">Switch Use Case</h4>
                <div className="flex flex-wrap gap-2">
                  {useCases.map((useCase) => (
                    <button
                      key={useCase.id}
                      onClick={() => handleUseCaseSelect(useCase.id as UseCase)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        selectedUseCase === useCase.id
                          ? "bg-purple-600 text-white"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      {useCase.title}
                    </button>
                  ))}
                </div>
              </div>

                {/* Stats for specific use case */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-1">
                      {selectedUseCase === "startup"
                        ? "0%"
                        : selectedUseCase === "personal"
                          ? "5.2%"
                          : selectedUseCase === "asset"
                            ? "4.8%"
                            : "6.5%"}
                    </div>
                    <div className="text-sm text-slate-400">
                      {selectedUseCase === "startup"
                        ? "Equity Dilution"
                        : selectedUseCase === "stable"
                          ? "Min APY"
                          : "Starting Rate"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-1">
                      {selectedUseCase === "startup"
                        ? "24hr"
                        : selectedUseCase === "personal"
                          ? "30d"
                          : selectedUseCase === "asset"
                            ? "Instant"
                            : "Fixed"}
                    </div>
                    <div className="text-sm text-slate-400">
                      {selectedUseCase === "startup"
                        ? "Funding Decisions"
                        : selectedUseCase === "asset"
                          ? "Liquidity"
                          : selectedUseCase === "stable"
                            ? "Terms"
                            : "Avg Duration"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-1">100%</div>
                    <div className="text-sm text-slate-400">
                      {selectedUseCase === "startup" ? "Founder Control" : "Success Rate"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Complete panels */}
              <div className="lg:col-span-6 space-y-6">
                {/* Funding Offer Panel (for startup) */}
                {selectedUseCase === "startup" && (
                  <div className="bg-gradient-to-br from-purple-900/50 to-cyan-900/50 rounded-2xl p-6 border border-purple-500/30">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500">
                        <TrendingUp className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Your Funding Offer</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-sm text-slate-400 mb-1">Your Offer</div>
                        <div className="text-lg font-semibold text-white">Typical VC Round</div>
                      </div>
                      <div></div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Interest Rate</span>
                        <div className="flex justify-between w-48">
                          <div className="text-center">
                            <span className="text-2xl font-bold text-green-400">7.5%</span>
                            <div className="text-xs text-green-400">Fixed</div>
                          </div>
                          <span className="text-slate-500">N/A</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Equity Cost</span>
                        <div className="flex justify-between w-48">
                          <span className="text-2xl font-bold text-green-400">0%</span>
                          <span className="text-slate-400">20-30%</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Monthly Payment</span>
                        <div className="flex justify-between w-48">
                          <span className="text-2xl font-bold text-purple-400">$10,024</span>
                          <span className="text-slate-500">N/A</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-800 rounded-lg p-4 mb-6">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-white font-medium mb-2">Why this is a smart move:</div>
                          <p className="text-slate-300 text-sm">
                            You secure $500,000 for growth while retaining full ownership and control of your company.
                            Your payments are predictable, protecting your cash flow from market interest rate hikes.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-3">
                      Accept & Secure Funding
                    </Button>
                  </div>
                )}

                {/* Funding Calculator */}
                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                  <h3 className="text-xl font-bold text-white mb-6">
                    {selectedUseCase === "startup" ? "Funding Calculator" : "Loan Calculator"}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        {selectedUseCase === "startup" ? "Funding Amount" : "Loan Amount"}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">$</span>
                        <input
                          type="text"
                          value={loanCalculator.amount || (selectedUseCase === "startup" ? "500,000" : "250,000")}
                          onChange={(e) => setLoanCalculator((prev) => ({ ...prev, amount: e.target.value }))}
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-8 py-3 text-white focus:outline-none focus:border-purple-500"
                          placeholder="Enter amount"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">USD</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Collateral (e.g., ARR, Assets)
                      </label>
                      <input
                        type="text"
                        value={
                          loanCalculator.collateral || (selectedUseCase === "startup" ? "e.g. $1M ARR" : "125 ETH")
                        }
                        onChange={(e) => setLoanCalculator((prev) => ({ ...prev, collateral: e.target.value }))}
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                        placeholder="Describe your collateral"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Offered Interest Rate</label>
                      <input
                        type="text"
                        value={
                          loanCalculator.interestRate ||
                          (selectedUseCase === "startup" ? "7.5% (Fixed)" : "7.2% (Fixed)")
                        }
                        readOnly
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Term (Years)</label>
                      <input
                        type="text"
                        value={selectedUseCase === "startup" ? "5" : "3"}
                        readOnly
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none"
                      />
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-slate-600">
                      <span className="text-slate-300">Est. Monthly Payment:</span>
                      <span className="text-2xl font-bold text-purple-400">
                        ${selectedUseCase === "startup" ? "10,024" : "1,610"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Collateral Flexibility (for startup) */}
                {selectedUseCase === "startup" && (
                  <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500">
                        <Shield className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Collateral Flexibility</h3>
                    </div>
                    <p className="text-slate-300 mb-6">
                      We understand startups. OKBond's AI evaluates various factors beyond traditional assets.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-lg bg-purple-500/20">
                          <Building2 className="h-4 w-4 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">Intellectual Property</h4>
                          <p className="text-sm text-slate-300">
                            Your patents, trademarks, and code are valuable assets we can assess.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-lg bg-purple-500/20">
                          <TrendingUp className="h-4 w-4 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">Future Revenue</h4>
                          <p className="text-sm text-slate-300">
                            We analyze your growth potential and projected cash flows.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-lg bg-purple-500/20">
                          <TrendingUp className="h-4 w-4 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">Smaller Data Sets</h4>
                          <p className="text-sm text-slate-300">
                            Our AI models are trained to find signals in limited historical data, perfect for new
                            ventures.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Explore Other Use Cases */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-white text-center mb-8">Explore Other Use Cases</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {useCases.map((useCase) => {
                  const IconComponent = useCase.icon
                  const isActive = selectedUseCase === useCase.id
                  return (
                    <button
                      key={useCase.id}
                      onClick={() => handleUseCaseSelect(useCase.id as UseCase)}
                      className={`group relative overflow-hidden rounded-xl p-6 text-center transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-br from-purple-600 to-cyan-600 border-2 border-purple-400"
                          : "bg-slate-800 border border-slate-700 hover:border-slate-600 hover:bg-slate-700/50"
                      }`}
                    >
                      <div className="flex justify-center mb-4">
                        <img
                          src={`/abstract-geometric-shapes.png?key=ty30j&height=80&width=80&query=${useCase.title.toLowerCase().replace(" ", "-")}-icon`}
                          alt={useCase.title}
                          className="w-20 h-20 rounded-lg"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{useCase.title}</h3>
                      <p className="text-sm text-slate-300">{useCase.description}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
