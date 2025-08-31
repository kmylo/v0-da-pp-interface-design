"use client"

import { Shield, Twitter, Github, MessageCircle, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-red-500">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">OKBond</h3>
            </div>
            <p className="text-slate-400 text-sm">
              Your marketplace for fixed-rate capital. Connecting borrowers and lenders through transparent,
              decentralized bond auctions on Ethereum.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Products</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  Bond Auctions
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  Loan Calculator
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  Portfolio Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  AI Assistant
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  Risk Assessment
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  DeFi Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  Smart Contracts
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  Security Audits
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-slate-400" />
                <span className="text-slate-400">(+62) 123 4567 8901</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-slate-400" />
                <span className="text-slate-400">support@okbond.finance</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-slate-400 text-sm">Network: Ethereum Sepolia Testnet</p>
              <p className="text-slate-400 text-sm">Chain ID: 11155111</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">© 2024 OKBond. All rights reserved. Built on Ethereum.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0 text-sm">
            <span className="text-slate-400">Powered by Smart Contracts</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-slate-400">Sepolia Network</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
