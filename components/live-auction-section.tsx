import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, AlertCircle } from "lucide-react"

export function LiveAuctionSection() {
  const currentBids = [
    { lender: "0xABC...123", rate: "6.8%", amount: "50,000 USDC", timestamp: "2 min ago" },
    { lender: "0xDEF...456", rate: "7.1%", amount: "75,000 USDC", timestamp: "5 min ago" },
    { lender: "0xGHI...789", rate: "7.5%", amount: "100,000 USDC", timestamp: "8 min ago" },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">Live Auction</h2>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          Watch real-time bidding and participate in active bond auctions.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Auction Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-xl">AUC-001 - Startup Funding</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-green-400 text-sm">Live</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-white mb-1">250,000</div>
                  <div className="text-sm text-slate-400">USDC Requested</div>
                </div>
                <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400 mb-1">8.5%</div>
                  <div className="text-sm text-slate-400">Max Rate</div>
                </div>
                <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-400 mb-1">2d 14h</div>
                  <div className="text-sm text-slate-400">Time Left</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Current Bids</h3>
                  <Badge className="bg-slate-700 text-slate-300">
                    <Users className="h-3 w-3 mr-1" />
                    12 bidders
                  </Badge>
                </div>

                <div className="space-y-3">
                  {currentBids.map((bid, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="text-sm text-slate-400">{bid.lender}</div>
                        <Badge variant="outline" className="border-slate-600 text-slate-300">
                          {bid.rate}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">{bid.amount}</div>
                        <div className="text-xs text-slate-400">{bid.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bid Form */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-purple-900/50 to-slate-800 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white">Place Your Bid</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Bid Amount (USDC)</Label>
                <Input placeholder="50,000" className="bg-slate-700 border-slate-600 text-white" />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Interest Rate (%)</Label>
                <Input placeholder="7.2" className="bg-slate-700 border-slate-600 text-white" />
                <div className="text-xs text-slate-400">Current best: 6.8% • Max allowed: 8.5%</div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300">
                    Your bid will be automatically matched if it's the lowest rate when the auction ends.
                  </div>
                </div>
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Submit Bid</Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-sm">Auction Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Funded</span>
                  <span className="text-white">180,000 / 250,000 USDC</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full"
                    style={{ width: "72%" }}
                  ></div>
                </div>
                <div className="text-xs text-slate-400 text-center">72% funded</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
