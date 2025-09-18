'use client';

import { useState } from 'react';
import { PredictionCard } from './PredictionCard';
import { useMarkets } from '@/lib/hooks';

export function PredictionFeed() {
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all');
  const { markets, loading, error } = useMarkets();

  const filteredPredictions = markets.filter(prediction => {
    if (filter === 'all') return true;
    return prediction.status === filter;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Live Predictions</h3>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setFilter('all')}
            className={`text-xs px-3 py-1 rounded-md transition-colors duration-200 ${
              filter === 'all' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('active')}
            className={`text-xs px-3 py-1 rounded-md transition-colors duration-200 ${
              filter === 'active' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Active
          </button>
          <button 
            onClick={() => setFilter('resolved')}
            className={`text-xs px-3 py-1 rounded-md transition-colors duration-200 ${
              filter === 'resolved' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Resolved
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-gray-400 mt-2">Loading predictions...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-400">Error loading predictions: {error}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPredictions.map((prediction) => (
            <PredictionCard key={prediction.marketId} market={prediction} />
          ))}
        </div>
      )}

      {!loading && !error && filteredPredictions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No predictions found for the selected filter.</p>
        </div>
      )}
    </div>
  );
}
