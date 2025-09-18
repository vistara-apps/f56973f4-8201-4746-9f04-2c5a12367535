export interface User {
  userId: string;
  farcasterId: string;
  walletAddress: string;
  tokenBalance: number;
  predictionHistory: Prediction[];
}

export interface Market {
  marketId: string;
  creatorId: string;
  streamId: string;
  eventDescription: string;
  outcomeYes: string;
  outcomeNo: string;
  createdAt: Date;
  closingAt: Date;
  status: 'active' | 'closed' | 'resolved';
  totalValue: number;
  yesPrice: number;
  noPrice: number;
  yesVolume: number;
  noVolume: number;
}

export interface Bet {
  betId: string;
  userId: string;
  marketId: string;
  outcome: 'yes' | 'no';
  amount: number;
  timestamp: Date;
  isWinning?: boolean;
}

export interface Prediction {
  predictionId: string;
  marketId: string;
  outcome: 'yes' | 'no';
  confidence: number;
  timestamp: Date;
}

export interface CreatorProfile {
  creatorId: string;
  streamName: string;
  channelUrl: string;
  analyticsData: {
    totalMarkets: number;
    totalVolume: number;
    accuracy: number;
    followers: number;
  };
  avatar?: string;
  isVerified?: boolean;
}

export interface MarketStats {
  totalVolume: number;
  activeMarkets: number;
  totalUsers: number;
  topCreators: CreatorProfile[];
}
