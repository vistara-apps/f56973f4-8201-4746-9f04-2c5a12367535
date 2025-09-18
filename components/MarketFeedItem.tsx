'use client';

import { Market } from '@/lib/types';
import { formatCurrency, formatPercentage, calculateProbability } from '@/lib/utils';
import { Clock, TrendingUp, Users } from 'lucide-react';

interface MarketFeedItemProps {
  market: Market;
}

export function MarketFeedItem({ market }: MarketFeedItemProps) {
  const probability = calculateProbability(market.yesVolume, market.noVolume);
  const timeRemaining = Math.max(0, market.closingAt.getTime() - Date.now());
  const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <div className="card hover:border-gray-600 transition-all duration-200 cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="text-sm font-medium text-white mb-2 leading-tight">
            {market.eventDescription}
          </h4>
          <div className="flex items-center space-x-3 text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>
                {hoursRemaining > 0 ? `${hoursRemaining}h ${minutesRemaining}m` : `${minutesRemaining}m`}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>{Math.floor(Math.random() * 30) + 5}</span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-sm font-bold text-white">{formatCurrency(market.totalValue)}</p>
          <div className="flex items-center text-green-400 text-xs">
            <TrendingUp className="w-3 h-3 mr-1" />
            <span>+{(Math.random() * 15).toFixed(1)}%</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <p className="text-xs text-gray-400">YES</p>
            <p className="text-sm font-bold text-green-400">
              {formatPercentage(market.yesPrice)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400">NO</p>
            <p className="text-sm font-bold text-red-400">
              {formatPercentage(market.noPrice)}
            </p>
          </div>
        </div>

        <div className="w-24 bg-gray-700 rounded-full h-1">
          <div 
            className="bg-gradient-to-r from-green-400 to-green-500 h-1 rounded-full"
            style={{ width: `${probability * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
