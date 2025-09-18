'use client';

import { formatCurrency, formatPercentage } from '@/lib/utils';
import { TrendingUp, Verified } from 'lucide-react';
import { useCreators } from '@/lib/hooks';

export function TopCreators() {
  const { creators, loading, error } = useCreators(5, 'totalVolume');

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Top Creators</h3>
        <div className="flex items-center space-x-2">
          <button className="text-xs text-gray-400 hover:text-white">All</button>
          <button className="text-xs text-gray-400 hover:text-white">24h</button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
          <p className="text-gray-400 text-sm mt-2">Loading creators...</p>
        </div>
      ) : error ? (
        <div className="text-center py-4">
          <p className="text-red-400 text-sm">Error loading creators</p>
        </div>
      ) : (
        <div className="space-y-3">
          {creators.map((creator, index) => (
            <div key={creator.creatorId} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    <p className="text-sm font-medium text-white">{creator.streamName}</p>
                    {creator.isVerified && (
                      <Verified className="w-3 h-3 text-blue-400" />
                    )}
                  </div>
                  <p className="text-xs text-gray-400">
                    {formatPercentage(creator.analyticsData.accuracy)} accuracy
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <div>
                    <p className="text-sm font-medium text-white">
                      {formatCurrency(creator.analyticsData.totalVolume)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {creator.analyticsData.totalMarkets} markets
                    </p>
                  </div>
                  <div className="text-green-400">
                    <TrendingUp className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="text-center">
          <p className="text-2xl font-bold text-white">{formatCurrency(73500)}</p>
          <p className="text-sm text-gray-400">Total Portfolio</p>
        </div>
      </div>
    </div>
  );
}
