import { StreamPulseHeader } from '@/components/StreamPulseHeader'
import { MarketOverview } from '@/components/MarketOverview'
import { TopCreators } from '@/components/TopCreators'
import { LeaderCreators } from '@/components/LeaderCreators'
import { PredictionFeed } from '@/components/PredictionFeed'
import { CreateMarketForm } from '@/components/CreateMarketForm'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <StreamPulseHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-2">
            <nav className="space-y-2">
              <div className="card">
                <div className="space-y-1">
                  <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Streams
                  </a>
                  <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-400 hover:text-white rounded-md">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                    Markets
                  </a>
                  <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-400 hover:text-white rounded-md">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                    Leaderboard
                  </a>
                  <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-400 hover:text-white rounded-md">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                    Earnings
                  </a>
                  <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-400 hover:text-white rounded-md">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                    Statistics
                  </a>
                </div>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-7">
            <div className="space-y-6">
              <MarketOverview />
              <LeaderCreators />
              <PredictionFeed />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <TopCreators />
              <CreateMarketForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
