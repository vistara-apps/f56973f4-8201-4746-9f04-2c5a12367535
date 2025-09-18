'use client';

import { useState } from 'react';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { TrendingUp, Verified } from 'lucide-react';

interface Creator {
  id: string;
  name: string;
  performance: number;
  buyPrice: number;
  accuracy: number;
  change: number;
  isVerified: boolean;
}

export function TopCreators() {
  const [creators] = useState<Creator[]>([
    {
      id: '1',
      name: 'Her Gyrates Pros Ms',
      performance: 1500,
      buyPrice: 45,
      accuracy: 0.78,
      change: 0.12,
      isVerified: true,
    },
    {
      id: '2',
      name: 'TechMaster',
      performance: 1200,
      buyPrice: 38,
      accuracy: 0.82,
      change: 0.08,
      isVerified: false,
    },
    {
      id: '3',
      name: 'GamePro',
      performance: 980,
      buyPrice: 32,
      accuracy: 0.75,
      change: -0.03,
      isVerified: true,
    },
  ]);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Top Creators</h3>
        <div className="flex items-center space-x-2">
          <button className="text-xs text-gray-400 hover:text-white">All</button>
          <button className="text-xs text-gray-400 hover:text-white">24h</button>
        </div>
      </div>

      <div className="space-y-3">
        {creators.map((creator, index) => (
          <div key={creator.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors duration-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{index + 1}</span>
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <p className="text-sm font-medium text-white">{creator.name}</p>
                  {creator.isVerified && (
                    <Verified className="w-3 h-3 text-blue-400" />
                  )}
                </div>
                <p className="text-xs text-gray-400">
                  {formatPercentage(creator.accuracy)} accuracy
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center space-x-2">
                <div>
                  <p className="text-sm font-medium text-white">
                    {formatCurrency(creator.performance)}
                  </p>
                  <p className="text-xs text-gray-400">
                    ${creator.buyPrice} per bet
                  </p>
                </div>
                <div className={`flex items-center ${creator.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  <TrendingUp className={`w-3 h-3 ${creator.change < 0 ? 'rotate-180' : ''}`} />
                  <span className="text-xs ml-1">
                    {formatPercentage(Math.abs(creator.change))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="text-center">
          <p className="text-2xl font-bold text-white">{formatCurrency(73500)}</p>
          <p className="text-sm text-gray-400">Total Portfolio</p>
        </div>
      </div>
    </div>
  );
}
