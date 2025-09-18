'use client';

import { useState, useEffect } from 'react';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export function MarketOverview() {
  const [stats, setStats] = useState({
    totalVolume: 789000,
    activeMarkets: 24,
    topCreators: 1241056,
    cryptoMarkets: 3051.5,
  });

  const [chartData, setChartData] = useState([
    { time: 'Jan', value: 2400 },
    { time: 'Feb', value: 2100 },
    { time: 'Mar', value: 2800 },
    { time: 'Apr', value: 2600 },
    { time: 'May', value: 3200 },
    { time: 'Jun', value: 2900 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Prediction Market</h2>
        <div className="flex items-center space-x-2">
          <button className="btn-primary text-sm">Live</button>
          <button className="btn-secondary text-sm">24h</button>
        </div>
      </div>

      {/* Market Chart */}
      <div className="card market-chart p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold text-white">{formatCurrency(stats.totalVolume)}</p>
            <p className="text-sm text-gray-400">Total Volume</p>
          </div>
          <div className="flex items-center space-x-2 text-green-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">+12.5%</span>
          </div>
        </div>

        {/* Simple Chart Visualization */}
        <div className="relative h-32 flex items-end space-x-2">
          {chartData.map((point, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-gradient-to-t from-primary to-accent rounded-t-sm"
                style={{ height: `${(point.value / 3200) * 100}%` }}
              />
              <span className="text-xs text-gray-400 mt-1">{point.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Top Creators</p>
              <p className="text-xl font-bold text-white">{formatCurrency(stats.topCreators)}</p>
            </div>
            <div className="text-blue-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center mt-2 text-green-400">
            <span className="text-xs">+8.2%</span>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">For Cryptocurrencies</p>
              <p className="text-xl font-bold text-white">{formatCurrency(stats.cryptoMarkets)}</p>
            </div>
            <div className="text-orange-400">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center mt-2 text-red-400">
            <span className="text-xs">-2.1%</span>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Top Creators</p>
              <p className="text-xl font-bold text-white">{formatCurrency(stats.topCreators)}</p>
            </div>
            <div className="text-green-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center mt-2 text-green-400">
            <span className="text-xs">+15.3%</span>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Creator</p>
              <p className="text-xl font-bold text-white">{formatCurrency(785005)}</p>
            </div>
            <div className="text-purple-400">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center mt-2 text-green-400">
            <span className="text-xs">+5.7%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
