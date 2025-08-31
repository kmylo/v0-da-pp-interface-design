// Web3 utility functions for the DeFi Bond Auction platform

export interface AuctionData {
  id: number
  borrower: string
  principal: string
  collateral: string
  duration: string
  minInterestRate: number
  currentBids: number
  timeLeft: string
  status: "active" | "completed" | "cancelled"
}

export interface BidData {
  auctionId: number
  bidder: string
  interestRate: number
  amount: string
  timestamp: number
}

// Contract addresses (placeholder - would be actual deployed contract addresses)
export const CONTRACT_ADDRESSES = {
  AUCTION_FACTORY: "0x...",
  BOND_NFT: "0x...",
  USDC: "0x...",
  DAI: "0x...",
}

// Sepolia testnet configuration
export const SEPOLIA_CONFIG = {
  chainId: "0xaa36a7",
  chainName: "Sepolia Test Network",
  nativeCurrency: {
    name: "SepoliaETH",
    symbol: "SEP",
    decimals: 18,
  },
  rpcUrls: ["https://sepolia.infura.io/v3/"],
  blockExplorerUrls: ["https://sepolia.etherscan.io/"],
}

// Helper function to format addresses
export const formatAddress = (address: string): string => {
  if (!address) return ""
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

// Helper function to format currency amounts
export const formatCurrency = (amount: string, symbol: string): string => {
  return `${Number.parseFloat(amount).toLocaleString()} ${symbol}`
}

// Check if MetaMask is installed
export const isMetaMaskInstalled = (): boolean => {
  return typeof window !== "undefined" && typeof window.ethereum !== "undefined"
}

// Connect to MetaMask
export const connectWallet = async (): Promise<string[]> => {
  if (!isMetaMaskInstalled()) {
    throw new Error("MetaMask is not installed")
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })
    return accounts
  } catch (error) {
    throw new Error("Failed to connect wallet")
  }
}

// Switch to Sepolia network
export const switchToSepolia = async (): Promise<void> => {
  if (!isMetaMaskInstalled()) {
    throw new Error("MetaMask is not installed")
  }

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: SEPOLIA_CONFIG.chainId }],
    })
  } catch (error: any) {
    // If the network doesn't exist, add it
    if (error.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [SEPOLIA_CONFIG],
      })
    } else {
      throw error
    }
  }
}

// Get current network
export const getCurrentNetwork = async (): Promise<string> => {
  if (!isMetaMaskInstalled()) {
    throw new Error("MetaMask is not installed")
  }

  return await window.ethereum.request({ method: "eth_chainId" })
}

// Check if on correct network (Sepolia)
export const isOnSepoliaNetwork = async (): Promise<boolean> => {
  try {
    const chainId = await getCurrentNetwork()
    return chainId === SEPOLIA_CONFIG.chainId
  } catch {
    return false
  }
}
