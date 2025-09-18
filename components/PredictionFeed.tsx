'use client';

import { useState } from 'react';
import { PredictionCard } from './PredictionCard';
import { Market } from '@/lib/types';

export function PredictionFeed() {
  const [predictions] = useState<Market[]>([
    {
      marketId: '1',
      creatorId: '1',
      streamId: 'stream1',
      eventDescription: 'Will Leon Chia get over 1000 viewers in the next hour?',
      outcomeYes: 'Yes, over 1000',
      outcomeNo: 'No, under 1000',
      createdAt: new Date(),
      closingAt: new Date(Date.now() + 3600000),
      status: 'active',
      totalValue: 996.5,
      yesPrice: 0.65,
      noPrice: 0.35,
      yesVolume: 647,
      noVolume: 349,
    },
    {
      marketId: '2',
      creatorId: '2',
      streamId: 'stream2',
      eventDescription: 'Will the next donation be over $50?',
      outcomeYes: 'Over $50',
      outcomeNo: 'Under $50',
      createdAt: new Date(),
      closingAt: new Date(Date.now() + 1800000),
      status: 'active',
      totalValue: 159.66,
      yesPrice: 0.42,
      noPrice: 0.58,
      yesVolume: 67,
      noVolume: 93,
    },
    {
      marketId: '3',
      creatorId: '3',
      streamId: 'stream3',
      eventDescription: 'Will they complete the level without dying?',
      outcomeYes: 'Complete safely',
      outcomeNo: 'Will die',
      createdAt: new Date(),
      closingAt: new Date(Date.now() + 2700000),
      status: 'active',
      totalValue: 89.9,
      yesPrice: 0.38,
      noPrice: 0.62,
      yesVolume: 34,
      noVolume: 56,
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all');

  const filteredPredictions = predictions.filter(prediction => {
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

      <div className="space-y-4">
        {filteredPredictions.map((prediction) => (
          <PredictionCard key={prediction.marketId} market={prediction} />
        ))}
      </div>

      {filteredPredictions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No predictions found for the selected filter.</p>
        </div>
      )}
    </div>
  );
}
