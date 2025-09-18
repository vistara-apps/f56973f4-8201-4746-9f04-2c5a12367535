import { NextRequest, NextResponse } from 'next/server';
import { CreatorProfile } from '@/lib/types';

// Mock database - in production, this would be a real database
let creators: CreatorProfile[] = [
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
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const sortBy = searchParams.get('sortBy') || 'totalVolume';

    let sortedCreators = [...creators];

    // Sort creators based on the specified field
    switch (sortBy) {
      case 'totalVolume':
        sortedCreators.sort((a, b) => b.analyticsData.totalVolume - a.analyticsData.totalVolume);
        break;
      case 'accuracy':
        sortedCreators.sort((a, b) => b.analyticsData.accuracy - a.analyticsData.accuracy);
        break;
      case 'followers':
        sortedCreators.sort((a, b) => b.analyticsData.followers - a.analyticsData.followers);
        break;
      case 'totalMarkets':
        sortedCreators.sort((a, b) => b.analyticsData.totalMarkets - a.analyticsData.totalMarkets);
        break;
      default:
        break;
    }

    const limitedCreators = sortedCreators.slice(0, limit);

    return NextResponse.json({
      success: true,
      data: limitedCreators,
    });
  } catch (error) {
    console.error('Error fetching creators:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch creators' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { streamName, channelUrl, farcasterId } = body;

    // Validate required fields
    if (!streamName || !channelUrl) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if creator already exists
    const existingCreator = creators.find(
      creator => creator.streamName === streamName || creator.channelUrl === channelUrl
    );

    if (existingCreator) {
      return NextResponse.json({
        success: true,
        data: existingCreator,
        message: 'Creator already exists',
      });
    }

    // Create new creator profile
    const newCreator: CreatorProfile = {
      creatorId: `creator${creators.length + 1}`,
      streamName,
      channelUrl,
      analyticsData: {
        totalMarkets: 0,
        totalVolume: 0,
        accuracy: 0,
        followers: 0,
      },
      avatar: '/api/placeholder/32/32',
      isVerified: false,
    };

    creators.push(newCreator);

    return NextResponse.json({
      success: true,
      data: newCreator,
    });
  } catch (error) {
    console.error('Error creating creator:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create creator' },
      { status: 500 }
    );
  }
}

