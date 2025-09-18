import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/lib/types';

// Mock database - in production, this would be a real database
let users: User[] = [
  {
    userId: 'user1',
    farcasterId: 'fc123',
    walletAddress: '0x1234567890123456789012345678901234567890',
    tokenBalance: 1000,
    predictionHistory: [],
  },
  {
    userId: 'user2',
    farcasterId: 'fc456',
    walletAddress: '0x0987654321098765432109876543210987654321',
    tokenBalance: 750,
    predictionHistory: [],
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const farcasterId = searchParams.get('farcasterId');
    const walletAddress = searchParams.get('walletAddress');

    let filteredUsers = users;

    if (farcasterId) {
      filteredUsers = filteredUsers.filter(user => user.farcasterId === farcasterId);
    }

    if (walletAddress) {
      filteredUsers = filteredUsers.filter(user => user.walletAddress === walletAddress);
    }

    return NextResponse.json({
      success: true,
      data: filteredUsers,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { farcasterId, walletAddress } = body;

    // Validate required fields
    if (!farcasterId || !walletAddress) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = users.find(
      user => user.farcasterId === farcasterId || user.walletAddress === walletAddress
    );

    if (existingUser) {
      return NextResponse.json({
        success: true,
        data: existingUser,
        message: 'User already exists',
      });
    }

    // Create new user
    const newUser: User = {
      userId: `user${users.length + 1}`,
      farcasterId,
      walletAddress,
      tokenBalance: 100, // Starting balance
      predictionHistory: [],
    };

    users.push(newUser);

    return NextResponse.json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

