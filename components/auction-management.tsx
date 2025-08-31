"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Clock, AlertTriangle, Gavel, Users, DollarSign } from "lucide-react"

interface AuctionManagementProps {
  auction: {
    id: number
    principal: string
    principalAmount: number
    collateral: string
    duration: string
    minRate: string
    status: string
    bids: number
    timeLeft: string
    funded: string
    fundedPercent: number
    borrower: string
    description?: string
  }
  onFinalize?: (auctionId: number) => void
  onCancel?: (auctionId: number) => void
  onExtend?: (auctionId: number) => void
}

export function AuctionManagement({ auction, onFinalize, onCancel, onExtend }: AuctionManagementProps) {
  const [showBidders, setShowBidders] = useState(false)

  // Mock bidder data
  const bidders = [
    { address: "0xabc1...2345", amount: "3,000 USDC", rate: 5.1, timestamp: "2 hours ago" },
    { address: "0xdef6...7890", amount: "2,500 USDC", rate: 5.2, timestamp: "4 hours ago" },
    { address: "0x1234...5678", amount: "1,500 USDC", rate: 5.5, timestamp: "6 hours ago" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "completed":
        return "secondary"
      case "cancelled":
        return "destructive"
      case "finalizing":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <AlertTriangle className="h-4 w-4" />
      case "finalizing":
        return <Gavel className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const canFinalize = auction.status === "active" && auction.fundedPercent >= 50
  const canCancel = auction.status === "active" && auction.fundedPercent < 25
  const canExtend = auction.status === "active" && auction.timeLeft.includes("h") && !auction.timeLeft.includes("d")

  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{auction.principal} Auction</CardTitle>
            <CardDescription>{auction.description || `Auction ID: ${auction.id}`}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={getStatusColor(auction.status)} className="flex items-center space-x-1">
              {getStatusIcon(auction.status)}
              <span>{auction.status}</span>
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Collateral</p>
            <p className="font-semibold">{auction.collateral}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Duration</p>
            <p className="font-semibold">{auction.duration}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Min Rate</p>
            <p className="font-semibold text-primary">{auction.minRate}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Time Left</p>
            <p className="font-semibold">{auction.timeLeft}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Funding Progress</span>
            <span>
              {auction.fundedPercent}% ({auction.bids} bids)
            </span>
          </div>
          <Progress value={auction.fundedPercent} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Minimum: 50%</span>
            <span>Target: 100%</span>
          </div>
        </div>

        {auction.status === "active" && (
          <div className="space-y-3">
            {auction.fundedPercent >= 100 && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Auction fully funded! You can finalize to issue bonds and receive principal.
                </AlertDescription>
              </Alert>
            )}

            {auction.fundedPercent >= 50 && auction.fundedPercent < 100 && (
              <Alert>
                <Gavel className="h-4 w-4" />
                <AlertDescription>
                  Auction meets minimum funding. You can finalize early or wait for more bids.
                </AlertDescription>
              </Alert>
            )}

            {auction.fundedPercent < 50 && canExtend && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Auction ending soon with low funding. Consider extending the duration.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setShowBidders(true)}>
                  <Users className="h-3 w-3 mr-1" />
                  View Bids ({auction.bids})
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Auction Bids</DialogTitle>
                  <DialogDescription>Current bids for {auction.principal} auction</DialogDescription>
                </DialogHeader>

                <div className="space-y-3">
                  {bidders.map((bidder, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{bidder.address}</p>
                        <p className="text-sm text-muted-foreground">{bidder.timestamp}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{bidder.amount}</p>
                        <p className="text-sm text-primary">{bidder.rate}% APY</p>
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex items-center space-x-2">
            {canExtend && (
              <Button variant="outline" size="sm" onClick={() => onExtend?.(auction.id)}>
                Extend Time
              </Button>
            )}

            {canCancel && (
              <Button variant="destructive" size="sm" onClick={() => onCancel?.(auction.id)}>
                Cancel
              </Button>
            )}

            {canFinalize && (
              <Button size="sm" onClick={() => onFinalize?.(auction.id)}>
                <DollarSign className="h-3 w-3 mr-1" />
                Finalize Auction
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
