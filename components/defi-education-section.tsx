"use client"

import { Shield, TrendingUp, Users, Lock, Coins, BarChart3 } from "lucide-react"

export function DeFiEducationSection() {
  return (
    <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Understanding DeFi Bond Auctions</h2>
        <p className="text-slate-300 text-lg">
          Learn how decentralized finance revolutionizes traditional lending through transparent, blockchain-based
          auctions
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-700/50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Shield className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Decentralized & Trustless</h3>
          </div>
          <p className="text-slate-300 text-sm">
            Smart contracts on Ethereum eliminate intermediaries, ensuring transparent and automated loan processes
            without traditional banking overhead.
          </p>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <TrendingUp className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Competitive Interest Rates</h3>
          </div>
          <p className="text-slate-300 text-sm">
            Market-driven auctions allow lenders to compete, resulting in better rates for borrowers compared to
            traditional finance.
          </p>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Users className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Global Access</h3>
          </div>
          <p className="text-slate-300 text-sm">
            Anyone with an Ethereum wallet can participate as a borrower or lender, breaking down geographical barriers.
          </p>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Lock className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Collateral Protection</h3>
          </div>
          <p className="text-slate-300 text-sm">
            Over-collateralization ensures lender protection while smart contracts automatically manage collateral
            ratios and liquidations.
          </p>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Coins className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Bond NFTs</h3>
          </div>
          <p className="text-slate-300 text-sm">
            Successful loans create tradeable ERC-1155 bond tokens, allowing lenders to transfer or sell their loan
            positions.
          </p>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <BarChart3 className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Transparent Auctions</h3>
          </div>
          <p className="text-slate-300 text-sm">
            All auction data is on-chain and publicly verifiable, ensuring complete transparency in the lending process.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 rounded-lg p-6 border border-purple-500/30">
        <h3 className="text-xl font-bold text-white mb-4">How Bond Auctions Work</h3>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto text-white font-bold">
              1
            </div>
            <h4 className="text-white font-medium">Create Auction</h4>
            <p className="text-slate-300 text-sm">Borrower sets loan terms and deposits collateral</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto text-white font-bold">
              2
            </div>
            <h4 className="text-white font-medium">Lenders Bid</h4>
            <p className="text-slate-300 text-sm">Investors compete by offering capital at different rates</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto text-white font-bold">
              3
            </div>
            <h4 className="text-white font-medium">Auction Finalizes</h4>
            <p className="text-slate-300 text-sm">Best rates win, bond NFTs are issued to lenders</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto text-white font-bold">
              4
            </div>
            <h4 className="text-white font-medium">Loan Servicing</h4>
            <p className="text-slate-300 text-sm">Borrower pays interest, lenders earn returns</p>
          </div>
        </div>
      </div>
    </div>
  )
}
