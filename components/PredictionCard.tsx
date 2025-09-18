'use client';

import { useState } from 'react';
import { Market } from '@/lib/types';
import { formatCurrency, formatPercentage, calculateProbability } from '@/lib/utils';
import { BettingButton } from './BettingButton';
import { Clock, TrendingUp, Users } from 'lucide-react';

interface PredictionCardProps {
  market: Market;
  variant?: 'active' | 'resolvedYes' | 'resolvedNo';
}

export function PredictionCard({ market, variant = 'active' }: PredictionCardProps) {
  const [selectedOutcome, setSelectedOutcome] = useState<'yes' | 'no' | null>(null);
  const probability = calculateProbability(market.yesVolume, market.noVolume);
  
  const timeRemaining = Math.max(0, market.closingAt.getTime() - Date.now());
  const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

  const getCardStyle = () => {
    switch (variant) {
      case 'resolvedYes':
        return 'border-green-500/50 bg-green-900/10';
      case 'resolvedNo':
        return 'border-red-500/50 bg-red-900/10';
      default:
        return 'border-gray-700 hover:border-gray-600';
    }
  };

  return (
    <div className={`card transition-all duration-200 ${getCardStyle()}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h4 className="text-sm font-medium text-white mb-2 leading-tight">
            {market.eventDescription}
          </h4>
          <div className="flex items-center space-x-4 text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>
                {hoursRemaining > 0 ? `${hoursRemaining}h ${minutesRemaining}m` : `${minutesRemaining}m`} left
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>{Math.floor(Math.random() * 50) + 10} bettors</span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-sm font-bold text-white">{formatCurrency(market.totalValue)}</p>
          <p className="text-xs text-gray-400">Total Volume</p>
        </div>
      </div>

      {/* Probability Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
          <span>Probability</span>
          <span>{formatPercentage(probability)} YES</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${probability * 100}%` }}
          />
        </div>
      </div>

      {/* Outcomes */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div 
          className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
            selectedOutcome === 'yes' 
              ? 'border-green-400 bg-green-400/10' 
              : 'border-gray-600 hover:border-gray-500'
          }`}
          onClick={() => setSelectedOutcome(selectedOutcome === 'yes' ? null : 'yes')}
        >
          <div className="text-center">
            <p className="text-xs text-gray-400 mb-1">YES</p>
            <p className="text-sm font-medium text-white">{market.outcomeYes}</p>
            <div className="flex items-center justify-center space-x-1 mt-2">
              <span className="text-lg font-bold text-green-400">
                {formatPercentage(market.yesPrice)}
              </span>
              <TrendingUp className="w-3 h-3 text-green-400" />
            </div>
          </div>
        </div>

        <div 
          className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
            selectedOutcome === 'no' 
              ? 'border-red-400 bg-red-400/10' 
              : 'border-gray-600 hover:border-gray-500'
          }`}
          onClick={() => setSelectedOutcome(selectedOutcome === 'no' ? null : 'no')}
        >
          <div className="text-center">
            <p className="text-xs text-gray-400 mb-1">NO</p>
            <p className="text-sm font-medium text-white">{market.outcomeNo}</p>
            <div className="flex items-center justify-center space-x-1 mt-2">
              <span className="text-lg font-bold text-red-400">
                {formatPercentage(market.noPrice)}
              </span>
              <TrendingUp className="w-3 h-3 text-red-400 rotate-180" />
            </div>
          </div>
        </div>
      </div>

      {/* Betting Buttons */}
      {variant === 'active' && (
        <div className="grid grid-cols-2 gap-3">
          <BettingButton 
            variant="buyYes" 
            market={market}
            disabled={!selectedOutcome}
            onClick={() => console.log('Buy YES', market.marketId)}
          />
          <BettingButton 
            variant="buyNo" 
            market={market}
            disabled={!selectedOutcome}
            onClick={() => console.log('Buy NO', market.marketId)}
          />
        </div>
      )}

      {/* Resolution Status */}
      {variant !== 'active' && (
        <div className={`text-center py-2 rounded-lg ${
          variant === 'resolvedYes' ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'
        }`}>
          <p className="text-sm font-medium">
            Resolved: {variant === 'resolvedYes' ? 'YES' : 'NO'}
          </p>
        </div>
      )}
    </div>
  );
}
