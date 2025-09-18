'use client';

import { useState, useEffect } from 'react';
import { Market, Bet, User, CreatorProfile } from './types';

// Custom hooks for API interactions
export function useMarkets(status?: string, creatorId?: string) {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMarkets();
  }, [status, creatorId]);

  const fetchMarkets = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (status) params.append('status', status);
      if (creatorId) params.append('creatorId', creatorId);

      const response = await fetch(`/api/markets?${params}`);
      const data = await response.json();

      if (data.success) {
        setMarkets(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch markets');
    } finally {
      setLoading(false);
    }
  };

  const createMarket = async (marketData: {
    creatorId: string;
    streamId: string;
    eventDescription: string;
    outcomeYes: string;
    outcomeNo: string;
    duration: number;
    initialValue: number;
  }) => {
    try {
      const response = await fetch('/api/markets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(marketData),
      });

      const data = await response.json();

      if (data.success) {
        setMarkets(prev => [...prev, data.data]);
        return { success: true, data: data.data };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      return { success: false, error: 'Failed to create market' };
    }
  };

  return { markets, loading, error, createMarket, refetch: fetchMarkets };
}

export function useBets(marketId?: string, userId?: string) {
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBets();
  }, [marketId, userId]);

  const fetchBets = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (marketId) params.append('marketId', marketId);
      if (userId) params.append('userId', userId);

      const response = await fetch(`/api/bets?${params}`);
      const data = await response.json();

      if (data.success) {
        setBets(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch bets');
    } finally {
      setLoading(false);
    }
  };

  const placeBet = async (betData: {
    userId: string;
    marketId: string;
    outcome: 'yes' | 'no';
    amount: number;
  }) => {
    try {
      const response = await fetch('/api/bets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(betData),
      });

      const data = await response.json();

      if (data.success) {
        setBets(prev => [...prev, data.data]);
        return { success: true, data: data.data };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      return { success: false, error: 'Failed to place bet' };
    }
  };

  return { bets, loading, error, placeBet, refetch: fetchBets };
}

export function useUser(farcasterId?: string, walletAddress?: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (farcasterId || walletAddress) {
      fetchUser();
    }
  }, [farcasterId, walletAddress]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (farcasterId) params.append('farcasterId', farcasterId);
      if (walletAddress) params.append('walletAddress', walletAddress);

      const response = await fetch(`/api/users?${params}`);
      const data = await response.json();

      if (data.success && data.data.length > 0) {
        setUser(data.data[0]);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch user');
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: {
    farcasterId: string;
    walletAddress: string;
  }) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.data);
        return { success: true, data: data.data };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      return { success: false, error: 'Failed to create user' };
    }
  };

  return { user, loading, error, createUser, refetch: fetchUser };
}

export function useCreators(limit: number = 10, sortBy: string = 'totalVolume') {
  const [creators, setCreators] = useState<CreatorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCreators();
  }, [limit, sortBy]);

  const fetchCreators = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('limit', limit.toString());
      params.append('sortBy', sortBy);

      const response = await fetch(`/api/creators?${params}`);
      const data = await response.json();

      if (data.success) {
        setCreators(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch creators');
    } finally {
      setLoading(false);
    }
  };

  const createCreator = async (creatorData: {
    streamName: string;
    channelUrl: string;
    farcasterId?: string;
  }) => {
    try {
      const response = await fetch('/api/creators', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(creatorData),
      });

      const data = await response.json();

      if (data.success) {
        setCreators(prev => [...prev, data.data]);
        return { success: true, data: data.data };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      return { success: false, error: 'Failed to create creator' };
    }
  };

  return { creators, loading, error, createCreator, refetch: fetchCreators };
}

// Hook for real-time updates
export function useRealTimeUpdates() {
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return { lastUpdate };
}

