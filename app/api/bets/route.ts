import { NextRequest, NextResponse } from 'next/server';
import { Bet } from '@/lib/types';

// Mock database - in production, this would be a real database
let bets: Bet[] = [
  {
    betId: '1',
    userId: 'user1',
    marketId: '1',
    outcome: 'yes',
    amount: 100,
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    isWinning: undefined,
  },
  {
    betId: '2',
    userId: 'user2',
    marketId: '1',
    outcome: 'no',
    amount: 75,
    timestamp: new Date(Date.now() - 180000), // 3 minutes ago
    isWinning: undefined,
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const marketId = searchParams.get('marketId');
    const userId = searchParams.get('userId');

    let filteredBets = bets;

    if (marketId) {
      filteredBets = filteredBets.filter(bet => bet.marketId === marketId);
    }

    if (userId) {
      filteredBets = filteredBets.filter(bet => bet.userId === userId);
    }

    return NextResponse.json({
      success: true,
      data: filteredBets,
    });
  } catch (error) {
    console.error('Error fetching bets:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bets' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, marketId, outcome, amount } = body;

    // Validate required fields
    if (!userId || !marketId || !outcome || !amount) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate outcome
    if (!['yes', 'no'].includes(outcome)) {
      return NextResponse.json(
        { success: false, error: 'Invalid outcome. Must be "yes" or "no"' },
        { status: 400 }
      );
    }

    // Validate amount
    if (amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Amount must be greater than 0' },
        { status: 400 }
      );
    }

    // Create new bet
    const newBet: Bet = {
      betId: (bets.length + 1).toString(),
      userId,
      marketId,
      outcome,
      amount,
      timestamp: new Date(),
      isWinning: undefined,
    };

    bets.push(newBet);

    // In a real implementation, this would:
    // 1. Check if the market is still active
    // 2. Update market volumes and prices
    // 3. Process the blockchain transaction
    // 4. Update user balance

    return NextResponse.json({
      success: true,
      data: newBet,
    });
  } catch (error) {
    console.error('Error creating bet:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create bet' },
      { status: 500 }
    );
  }
}

