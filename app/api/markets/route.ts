import { NextRequest, NextResponse } from 'next/server';
import { Market } from '@/lib/types';

// Mock database - in production, this would be a real database
let markets: Market[] = [
  {
    marketId: '1',
    creatorId: '1',
    streamId: 'stream1',
    eventDescription: 'Will the next donation be over $100?',
    outcomeYes: 'Yes, over $100',
    outcomeNo: 'No, under $100',
    createdAt: new Date(),
    closingAt: new Date(Date.now() + 3600000),
    status: 'active',
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
    status: 'active',
    totalValue: 1800,
    yesPrice: 0.42,
    noPrice: 0.58,
    yesVolume: 756,
    noVolume: 1044,
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const creatorId = searchParams.get('creatorId');

    let filteredMarkets = markets;

    if (status) {
      filteredMarkets = filteredMarkets.filter(market => market.status === status);
    }

    if (creatorId) {
      filteredMarkets = filteredMarkets.filter(market => market.creatorId === creatorId);
    }

    // Update market statuses based on closing time
    const now = new Date();
    filteredMarkets.forEach(market => {
      if (market.status === 'active' && market.closingAt <= now) {
        market.status = 'closed';
      }
    });

    return NextResponse.json({
      success: true,
      data: filteredMarkets,
    });
  } catch (error) {
    console.error('Error fetching markets:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch markets' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      creatorId,
      streamId,
      eventDescription,
      outcomeYes,
      outcomeNo,
      duration,
      initialValue,
    } = body;

    // Validate required fields
    if (!creatorId || !eventDescription || !outcomeYes || !outcomeNo) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new market
    const newMarket: Market = {
      marketId: (markets.length + 1).toString(),
      creatorId,
      streamId: streamId || 'default-stream',
      eventDescription,
      outcomeYes,
      outcomeNo,
      createdAt: new Date(),
      closingAt: new Date(Date.now() + (duration * 60 * 1000)), // duration in minutes
      status: 'active',
      totalValue: initialValue || 100,
      yesPrice: 0.5,
      noPrice: 0.5,
      yesVolume: initialValue ? initialValue / 2 : 50,
      noVolume: initialValue ? initialValue / 2 : 50,
    };

    markets.push(newMarket);

    return NextResponse.json({
      success: true,
      data: newMarket,
    });
  } catch (error) {
    console.error('Error creating market:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create market' },
      { status: 500 }
    );
  }
}

