import { NextRequest, NextResponse } from 'next/server';
import { FarcasterFrame } from '@/lib/farcaster';

// Main frame handler
export async function POST(request: NextRequest) {
  try {
    const frameData = await FarcasterFrame.validateFrameMessage(request);

    if (!frameData) {
      return NextResponse.json(
        { error: 'Invalid frame message' },
        { status: 400 }
      );
    }

    // Get active markets
    const marketsResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/markets?status=active&limit=1`);
    const marketsData = await marketsResponse.json();

    if (!marketsData.success || marketsData.data.length === 0) {
      // No active markets, show create market frame
      return NextResponse.json(
        FarcasterFrame.generateFrameResponse(
          'StreamPulse Bets',
          'No active markets. Create your first prediction market!',
          `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/image?type=empty`,
          [
            {
              label: 'Create Market',
              action: 'post',
              target: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/create`,
            },
          ]
        )
      );
    }

    const market = marketsData.data[0];

    // Show active market frame
    return NextResponse.json(
      FarcasterFrame.generateMarketFrame(market)
    );

  } catch (error) {
    console.error('Error handling frame:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

