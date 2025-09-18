import { NextRequest } from 'next/server';

// Farcaster Frame validation and utilities
export interface FrameData {
  fid: number;
  url: string;
  messageHash: string;
  timestamp: number;
  network: number;
  buttonIndex: number;
  inputText?: string;
  state?: string;
}

export class FarcasterFrame {
  static async validateFrameMessage(request: NextRequest): Promise<FrameData | null> {
    try {
      const body = await request.json();

      // In production, this would validate the Farcaster message signature
      // For demo purposes, we'll simulate validation

      if (!body || !body.untrustedData) {
        return null;
      }

      const { untrustedData } = body;

      return {
        fid: untrustedData.fid,
        url: untrustedData.url,
        messageHash: untrustedData.messageHash,
        timestamp: untrustedData.timestamp,
        network: untrustedData.network,
        buttonIndex: untrustedData.buttonIndex,
        inputText: untrustedData.inputText,
        state: untrustedData.state,
      };
    } catch (error) {
      console.error('Error validating frame message:', error);
      return null;
    }
  }

  static generateFrameResponse(
    title: string,
    description: string,
    imageUrl: string,
    buttons: Array<{
      label: string;
      action?: 'post' | 'post_redirect';
      target?: string;
    }>,
    state?: string
  ) {
    return {
      type: 'frame',
      frame: {
        version: 'vNext',
        image: {
          url: imageUrl,
          aspectRatio: '1.91:1',
        },
        buttons: buttons.map((button, index) => ({
          index: index + 1,
          title: button.label,
          action: button.action || 'post',
          target: button.target,
        })),
        postUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`,
        state,
      },
    };
  }

  static generateMarketFrame(market: any, userBalance?: number) {
    const imageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/image?marketId=${market.marketId}`;

    const buttons = [
      {
        label: `Buy YES (${(market.yesPrice * 100).toFixed(1)}%)`,
        action: 'post' as const,
        target: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/bet?outcome=yes&marketId=${market.marketId}`,
      },
      {
        label: `Buy NO (${(market.noPrice * 100).toFixed(1)}%)`,
        action: 'post' as const,
        target: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/bet?outcome=no&marketId=${market.marketId}`,
      },
      {
        label: 'View Details',
        action: 'post' as const,
        target: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/details?marketId=${market.marketId}`,
      },
    ];

    return this.generateFrameResponse(
      'StreamPulse Bets',
      market.eventDescription,
      imageUrl,
      buttons,
      JSON.stringify({ marketId: market.marketId, userBalance })
    );
  }

  static generateResultFrame(market: any, result: 'yes' | 'no') {
    const imageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/result?marketId=${market.marketId}&result=${result}`;

    const buttons = [
      {
        label: 'New Market',
        action: 'post' as const,
        target: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/create`,
      },
      {
        label: 'View Stats',
        action: 'post' as const,
        target: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/stats`,
      },
    ];

    return this.generateFrameResponse(
      'Market Resolved!',
      `Result: ${result === 'yes' ? market.outcomeYes : market.outcomeNo}`,
      imageUrl,
      buttons
    );
  }
}

// Farcaster user utilities
export class FarcasterUser {
  static async getUserProfile(fid: number) {
    try {
      // In production, this would call the Farcaster Hubs API
      console.log('Getting user profile for FID:', fid);

      // Simulate user profile
      return {
        success: true,
        profile: {
          fid,
          username: `user${fid}`,
          displayName: `User ${fid}`,
          pfp: `https://api.dicebear.com/7.x/avataaars/svg?seed=${fid}`,
          bio: 'StreamPulse user',
        },
      };
    } catch (error) {
      console.error('Error getting user profile:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  static async linkWallet(fid: number, walletAddress: string) {
    try {
      // In production, this would verify the wallet ownership
      console.log('Linking wallet for FID:', fid, 'Address:', walletAddress);

      return {
        success: true,
        linked: true,
      };
    } catch (error) {
      console.error('Error linking wallet:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
}
