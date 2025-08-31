import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users } from "lucide-react"

export function AuctionListSection() {
  const auctions = [
    {
      id: "AUC-001",
      borrower: "0x1234...5678",
      amount: "250,000 USDC",
      collateral: "125 ETH",
      maxRate: "8.5%",
      duration: "12 months",
      bids: 12,
      timeLeft: "2d 14h",
      status: "active",
    },
    {
      id: "AUC-002",
      borrower: "0x9876...4321",
      amount: "500,000 USDT",
      collateral: "IP + Revenue",
      maxRate: "7.2%",
      duration: "24 months",
      bids: 8,
      timeLeft: "5d 8h",
      status: "active",
    },
    {
      id: "AUC-003",
      borrower: "0x5555...9999",
      amount: "100,000 USDC",
      collateral: "50 ETH",
      maxRate: "9.1%",
      duration: "6 months",
      bids: 15,
      timeLeft: "1d 3h",
      status: "ending-soon",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">Active Auctions</h2>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          Browse live bond auctions and place competitive bids to earn fixed returns on your capital.
        </p>
      </div>

      <div className="grid gap-6">
        {auctions.map((auction) => (
          <Card
            key={auction.id}
            className="bg-slate-800 border-slate-700 hover:border-purple-500/50 transition-all duration-300"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CardTitle className="text-white text-lg">{auction.id}</CardTitle>
                  <Badge
                    variant={auction.status === "ending-soon" ? "destructive" : "secondary"}
                    className={
                      auction.status === "ending-soon" ? "bg-red-500/20 text-red-400" : "bg-slate-700 text-slate-300"
                    }
                  >
                    {auction.status === "ending-soon" ? "Ending Soon" : "Active"}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 text-slate-400">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{auction.timeLeft}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="text-sm text-slate-400">Loan Amount</div>
                  <div className="text-xl font-bold text-white">{auction.amount}</div>
                  <div className="text-sm text-slate-400">Borrower: {auction.borrower}</div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-slate-400">Collateral</div>
                  <div className="text-lg font-semibold text-purple-400">{auction.collateral}</div>
                  <div className="text-sm text-slate-400">Duration: {auction.duration}</div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-slate-400">Max Interest Rate</div>
                  <div className="text-2xl font-bold text-green-400">{auction.maxRate}</div>
                  <div className="flex items-center space-x-1 text-sm text-slate-400">
                    <Users className="h-3 w-3" />
                    <span>{auction.bids} bids</span>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">Place Bid</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent">
          View All Auctions
        </Button>
      </div>
    </div>
  )
}
