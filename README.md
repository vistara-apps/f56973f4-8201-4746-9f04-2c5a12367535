# StreamPulse Bets

**Predict the pulse of your stream. Earn with every guess.**

StreamPulse Bets is a decentralized prediction market platform built on Base, designed specifically for live streamers and their audiences. Users can create and participate in prediction markets tied to real-time streaming events, fostering engagement and rewarding accurate predictions with tokenized rewards.

## 🚀 Features

### Core Features
- **Real-time Prediction Markets**: Create binary prediction markets for live streaming events
- **Tokenized Rewards**: Earn platform tokens for accurate predictions and engagement
- **Dynamic Pricing**: Market prices adjust based on real-time demand and sentiment
- **Creator Dashboard**: Comprehensive analytics and market management tools
- **In-Stream Integration**: Seamless integration with Farcaster frames

### Technical Features
- **Base Chain Integration**: Built on Base for fast, low-cost transactions
- **Farcaster Integration**: Native social features and identity verification
- **Real-time Updates**: Live market data and price feeds
- **Mobile-First Design**: Optimized for all devices
- **Production Ready**: Comprehensive error handling and performance optimizations

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Web3**: Wagmi, Viem, RainbowKit
- **Blockchain**: Base Chain
- **Social**: Farcaster
- **State Management**: React Query, Zustand
- **Deployment**: Vercel/Netlify

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- MetaMask or another Web3 wallet
- Base network access

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/streampulse-bets.git
   cd streampulse-bets
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```

   Configure your environment variables:
   ```env
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FARCASTER_CLIENT_ID=your_client_id
   NEXT_PUBLIC_PREDICTION_CONTRACT=your_contract_address
   NEXT_PUBLIC_TOKEN_CONTRACT=your_token_address
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
streampulse-bets/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   ├── create/                   # Create market page
│   ├── markets/                  # Markets listing page
│   └── globals.css               # Global styles
├── src/
│   ├── components/               # React components
│   │   ├── layout/              # Layout components
│   │   ├── markets/             # Market-related components
│   │   ├── ui/                  # Reusable UI components
│   │   └── web3/                # Web3 integration components
│   ├── lib/                     # Utility libraries
│   │   ├── constants.ts         # App constants
│   │   ├── utils.ts             # Utility functions
│   │   └── web3.ts              # Web3 configuration
│   └── types/                   # TypeScript type definitions
├── public/                      # Static assets
└── tailwind.config.ts          # Tailwind configuration
```

## 🎯 Usage

### For Streamers (Market Creators)

1. **Connect Wallet**: Connect your Web3 wallet to access creator features
2. **Create Market**: Use the create market form to set up prediction events
3. **Share with Audience**: Share market links in your stream
4. **Monitor Analytics**: Track engagement and performance in your dashboard

### For Viewers (Bettors)

1. **Browse Markets**: Explore active prediction markets
2. **Place Bets**: Choose outcomes and place bets with tokens
3. **Track Performance**: Monitor your betting history and rewards
4. **Earn Rewards**: Win tokens for accurate predictions

## 🔧 API Documentation

### Markets API

#### Get All Markets
```http
GET /api/markets
```

Query Parameters:
- `status`: Filter by market status (active, resolved_yes, resolved_no, cancelled)
- `creatorId`: Filter by creator ID
- `streamId`: Filter by stream ID
- `limit`: Number of results (default: 20)
- `offset`: Pagination offset (default: 0)

#### Create Market
```http
POST /api/markets
```

Body:
```json
{
  "eventDescription": "Will we reach 1000 viewers?",
  "outcomeYes": "Yes - 1000+ viewers",
  "outcomeNo": "No - Under 1000 viewers",
  "closingAt": "2024-01-01T12:00:00Z",
  "streamId": "stream_123",
  "creatorId": "user_456"
}
```

#### Get Market Details
```http
GET /api/markets/[marketId]
```

#### Place Bet
```http
POST /api/markets/[marketId]/bets
```

Body:
```json
{
  "userId": "user_123",
  "outcome": "yes",
  "amount": 10.5
}
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Accent**: Orange (#F59E0B)
- **Background**: Light gray (#F8FAFC)
- **Text**: Dark gray (#1F2937)

### Typography
- **Display**: 3xl font-bold
- **Heading**: 2xl font-semibold
- **Body**: base leading-6
- **Caption**: sm text-muted

### Components
- PredictionCard: Market display with betting interface
- CreateMarketForm: Market creation form
- BalanceDisplay: Token balance display
- WalletConnect: Web3 wallet connection

## 🔒 Security

- Smart contract audits recommended before mainnet deployment
- Input validation on all user inputs
- Rate limiting on API endpoints
- Secure wallet connections only

## 📊 Analytics & Metrics

### Creator Dashboard
- Market performance tracking
- Audience engagement metrics
- Revenue analytics
- Betting volume trends

### Platform Metrics
- Total markets created
- Total volume traded
- Active users
- Prediction accuracy rates

## 🚀 Deployment

### Environment Variables
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_FARCASTER_CLIENT_ID=your_client_id
NEXT_PUBLIC_PREDICTION_CONTRACT=deployed_contract_address
NEXT_PUBLIC_TOKEN_CONTRACT=deployed_token_address
NEXT_PUBLIC_API_BASE_URL=your_api_url
```

### Build Commands
```bash
npm run build
npm start
```

### Deployment Platforms
- **Vercel**: Recommended for Next.js apps
- **Netlify**: Alternative option
- **Railway**: For full-stack deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.streampulse.bets](https://docs.streampulse.bets)
- **Discord**: [Join our community](https://discord.gg/streampulse)
- **Twitter**: [@StreamPulseBets](https://twitter.com/StreamPulseBets)
- **Email**: support@streampulse.bets

## 🙏 Acknowledgments

- Base team for the amazing L2 infrastructure
- Farcaster for the social primitives
- RainbowKit for the wallet connection UX
- shadcn/ui for the beautiful component library

---

**Built with ❤️ for the streaming community**

