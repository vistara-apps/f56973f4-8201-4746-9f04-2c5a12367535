'use client';

import { useState } from 'react';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { TrendingUp, Star, Users } from 'lucide-react';

interface LeaderCreator {
  id: string;
  name: string;
  description: string;
  performance: number;
  accuracy: number;
  followers: number;
  avatar: string;
}

export function LeaderCreators() {
  const [leaders] = useState<LeaderCreator[]>([
    {
      id: '1',
      name: 'CryptoKing',
      description: 'Master Streamer',
      performance: 59.6,
      accuracy: 0.78,
      followers: 12500,
      avatar: '/api/placeholder/40/40',
    },
    {
      id: '2',
      name: 'Top Creators',
      description: 'Top Leaderboard Entry',
      performance: 0,
      accuracy: 0.85,
      followers: 8900,
      avatar: '/api/placeholder/40/40',
    },
    {
      id: '3',
      name: 'YourName',
      description: 'Enter the Leaderboard',
      performance: 25.8,
      accuracy: 0.72,
      followers: 3200,
      avatar: '/api/placeholder/40/40',
    },
    {
      id: '4',
      name: 'TradingGuru',
      description: 'Buy Bets 1x',
      performance: 0,
      accuracy: 0.68,
      followers: 5600,
      avatar: '/api/placeholder/40/40',
    },
  ]);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Leader Creators</h3>
        <div className="flex items-center space-x-2">
          <button className="btn-primary text-xs px-3 py-1">Buy</button>
          <button className="btn-secondary text-xs px-3 py-1">Sell</button>
        </div>
      </div>

      <div className="space-y-4">
        {leaders.map((leader) => (
          <div key={leader.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors duration-200">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {leader.name.charAt(0)}
                  </span>
                </div>
                {leader.performance > 50 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Star className="w-2 h-2 text-yellow-900" />
                  </div>
                )}
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-white">{leader.name}</h4>
                <p className="text-xs text-gray-400">{leader.description}</p>
                <div className="flex items-center space-x-3 mt-1">
                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <Users className="w-3 h-3" />
                    <span>{leader.followers.toLocaleString()}</span>
                  </div>
                  <span className="text-xs text-green-400">
                    {formatPercentage(leader.accuracy)} accuracy
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center space-x-2">
                <div>
                  <p className="text-sm font-bold text-white">
                    {leader.performance > 0 ? `${leader.performance}%` : '—'}
                  </p>
                  <div className="flex items-center text-green-400">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    <span className="text-xs">+{(Math.random() * 10).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-700">
        <button className="w-full btn-primary">
          View All Leaders
        </button>
      </div>
    </div>
  );
}
