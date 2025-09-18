import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`
}

export function calculateProbability(yesVolume: number, noVolume: number): number {
  const total = yesVolume + noVolume
  if (total === 0) return 0.5
  return yesVolume / total
}

export function generateMockData() {
  return {
    totalVolume: 73500,
    activeMarkets: 24,
    totalUsers: 1250,
    topCreators: [
      {
        creatorId: '1',
        streamName: 'Her Gyrates Pros Ms',
        channelUrl: 'https://twitch.tv/hergyrates',
        analyticsData: {
          totalMarkets: 45,
          totalVolume: 12500,
          accuracy: 0.78,
          followers: 3200,
        },
        avatar: '/api/placeholder/32/32',
        isVerified: true,
      },
      {
        creatorId: '2',
        streamName: 'TechWiz',
        channelUrl: 'https://twitch.tv/techwiz',
        analyticsData: {
          totalMarkets: 32,
          totalVolume: 8900,
          accuracy: 0.82,
          followers: 2100,
        },
        avatar: '/api/placeholder/32/32',
        isVerified: false,
      },
    ],
    markets: [
      {
        marketId: '1',
        creatorId: '1',
        streamId: 'stream1',
        eventDescription: 'Will the next donation be over $100?',
        outcomeYes: 'Yes, over $100',
        outcomeNo: 'No, under $100',
        createdAt: new Date(),
        closingAt: new Date(Date.now() + 3600000),
        status: 'active' as const,
        totalValue: 2500,
        yesPrice: 0.65,
        noPrice: 0.35,
        yesVolume: 1625,
        noVolume: 875,
      },
      {
        marketId: '2',
        creatorId: '2',
        streamId: 'stream2',
        eventDescription: 'Will they beat the boss on first try?',
        outcomeYes: 'First try victory',
        outcomeNo: 'Multiple attempts',
        createdAt: new Date(),
        closingAt: new Date(Date.now() + 1800000),
        status: 'active' as const,
        totalValue: 1800,
        yesPrice: 0.42,
        noPrice: 0.58,
        yesVolume: 756,
        noVolume: 1044,
      },
    ],
  }
}
