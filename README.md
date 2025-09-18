# StreamPulse Bets

Predict the pulse of your stream. Earn with every guess.

## Overview

StreamPulse Bets is a Base Mini App that enables live prediction markets for streamers and their audiences directly within Base Wallet. The app fosters engagement and rewards accurate predictions through tokenized betting markets.

## Features

- **Real-time Prediction Markets**: Binary prediction markets tied to live stream events
- **Tokenized Viewer Rewards**: Platform-specific tokens for correct predictions and engagement
- **Dynamic Pricing Algorithm**: Market prices adjust based on real-time demand
- **Creator Dashboard**: Simple interface for creators to manage markets and view analytics
- **In-Stream Integration**: Seamless integration within Base Wallet frame

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (Ethereum L2)
- **Wallet Integration**: MiniKit + OnchainKit
- **Styling**: Tailwind CSS
- **TypeScript**: Full type safety

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd streampulse-bets
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Add your OnchainKit API key from [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main dashboard page
│   ├── providers.tsx      # MiniKit and OnchainKit providers
│   └── globals.css        # Global styles and Tailwind
├── components/            # React components
│   ├── StreamPulseHeader.tsx
│   ├── PredictionCard.tsx
│   ├── CreateMarketForm.tsx
│   └── ...
├── lib/                   # Utilities and types
│   ├── types.ts          # TypeScript interfaces
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

## Key Components

### Data Models

- **User**: Farcaster identity with wallet and prediction history
- **Market**: Prediction market with binary outcomes and pricing
- **Bet**: Individual user bets on market outcomes
- **CreatorProfile**: Streamer profiles with analytics

### Core Features

1. **Market Creation**: Streamers can create binary prediction markets
2. **Betting Interface**: Users can buy YES/NO positions
3. **Real-time Updates**: Live price updates based on market activity
4. **Leaderboards**: Top creators and most accurate predictors
5. **Portfolio Tracking**: User balance and prediction history

## Design System

- **Colors**: Blue primary (#3B82F6), Orange accent (#F97316)
- **Typography**: Inter font family with semantic sizing
- **Components**: Modular, reusable UI components
- **Dark Theme**: Optimized for Base Wallet's dark interface

## Development

### Adding New Features

1. Define TypeScript interfaces in `lib/types.ts`
2. Create reusable components in `components/`
3. Implement business logic with proper error handling
4. Add responsive styling with Tailwind CSS

### Testing

```bash
npm run lint    # ESLint checking
npm run build   # Production build test
```

## Deployment

The app is designed to be deployed as a Base Mini App within the Base Wallet ecosystem.

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Deploy to your hosting platform**
   - Vercel (recommended)
   - Netlify
   - Custom hosting

3. **Configure Base Mini App manifest**
   - Set up proper domain verification
   - Configure webhook endpoints
   - Submit for Base App directory

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper TypeScript types
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For questions and support:
- Create an issue in this repository
- Join the Base developer community
- Check the [Base Mini Apps documentation](https://docs.base.org/mini-apps/)
