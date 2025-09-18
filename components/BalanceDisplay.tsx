'use client';

import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';
import { useUser } from '@/lib/hooks';

export function BalanceDisplay() {
  const { user, loading, error } = useUser(undefined, '0x1234567890123456789012345678901234567890'); // Mock wallet address
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setBalance(user.tokenBalance);
    }
  }, [user]);

  // Mock balance updates for demo
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      setBalance(prev => prev + Math.floor(Math.random() * 100) - 50);
    }, 5000);

    return () => clearInterval(interval);
  }, [user]);

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
