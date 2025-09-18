'use client';

import { useState } from 'react';
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/utils';
import { TrendingUp, Users, Target, DollarSign } from 'lucide-react';

interface CreatorStats {
  totalMarkets: number;
  totalVolume: number;
  accuracy: number;
  followers: number;
  activeMarkets: number;
  avgMarketValue: number;
}

interface CreatorDashboardWidgetProps {
  variant: 'marketStats' | 'engagement';
}

export function CreatorDashboardWidget({ variant }: CreatorDashboardWidgetProps) {
  const [stats] = useState<CreatorStats>({
    totalMarkets: 45,
    totalVolume: 12500,
    accuracy: 0.78,
    followers: 3200,
    activeMarkets: 8,
    avgMarketValue: 278,
  });

  if (variant === 'marketStats') {
    return (
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Market Stats</h3>
          <div className="text-xs text-gray-400">Last 30 days</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 rounded-lg bg-gray-800/30">
            <div className="flex items-center justify-center mb-2">
              <Target className="w-4 h-4 text-primary mr-1" />
            </div>
            <p className="text-xl font-bold text-white">{stats.totalMarkets}</p>
            <p className="text-xs text-gray-400">Total Markets</p>
          </div>

          <div className="text-center p-3 rounded-lg bg-gray-800/30">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="w-4 h-4 text-accent mr-1" />
            </div>
            <p className="text-xl font-bold text-white">{formatCurrency(stats.totalVolume)}</p>
            <p className="text-xs text-gray-400">Total Volume</p>
          </div>

          <div className="text-center p-3 rounded-lg bg-gray-800/30">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            </div>
            <p className="text-xl font-bold text-white">{formatPercentage(stats.accuracy)}</p>
            <p className="text-xs text-gray-400">Accuracy</p>
          </div>

          <div className="text-center p-3 rounded-lg bg-gray-800/30">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-4 h-4 text-blue-400 mr-1" />
            </div>
            <p className="text-xl font-bold text-white">{formatNumber(stats.followers)}</p>
            <p className="text-xs text-gray-400">Followers</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Active Markets:</span>
            <span className="text-white font-medium">{stats.activeMarkets}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-gray-400">Avg Market Value:</span>
            <span className="text-white font-medium">{formatCurrency(stats.avgMarketValue)}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Engagement</h3>
        <div className="text-xs text-gray-400">This week</div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm text-gray-300">Market Participation</span>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-white">85%</p>
            <p className="text-xs text-green-400">+12%</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-sm text-gray-300">Viewer Retention</span>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-white">72%</p>
            <p className="text-xs text-blue-400">+8%</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span className="text-sm text-gray-300">Prediction Accuracy</span>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-white">78%</p>
            <p className="text-xs text-purple-400">+5%</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <span className="text-sm text-gray-300">New Followers</span>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-white">+127</p>
            <p className="text-xs text-orange-400">+23%</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <button className="w-full btn-primary text-sm">
          View Detailed Analytics
        </button>
      </div>
    </div>
  );
}
