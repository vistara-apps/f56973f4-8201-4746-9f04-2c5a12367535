'use client';

import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';

export function BalanceDisplay() {
  const [balance, setBalance] = useState(73500);
  const [isLoading, setIsLoading] = useState(false);

  // Mock balance updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBalance(prev => prev + Math.floor(Math.random() * 100) - 50);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card px-4 py-2">
      <div className="text-right">
        <p className="text-xs text-gray-400">Portfolio</p>
        <p className="text-lg font-bold text-white">
          {formatCurrency(balance)}
        </p>
      </div>
    </div>
  );
}
