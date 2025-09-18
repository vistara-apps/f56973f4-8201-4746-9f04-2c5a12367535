'use client';

import { useState } from 'react';
import { Market } from '@/lib/types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface BettingButtonProps {
  variant: 'buyYes' | 'buyNo';
  market: Market;
  disabled?: boolean;
  onClick: () => void;
}

export function BettingButton({ variant, market, disabled = false, onClick }: BettingButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (disabled || isLoading) return;
    
    setIsLoading(true);
    try {
      await onClick();
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonStyle = () => {
    if (disabled) return 'bg-gray-600 text-gray-400 cursor-not-allowed';
    
    switch (variant) {
      case 'buyYes':
        return 'bg-green-600 hover:bg-green-700 text-white';
      case 'buyNo':
        return 'bg-red-600 hover:bg-red-700 text-white';
      default:
        return 'bg-gray-600 hover:bg-gray-700 text-white';
    }
  };

  const getIcon = () => {
    switch (variant) {
      case 'buyYes':
        return <TrendingUp className="w-4 h-4" />;
      case 'buyNo':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getLabel = () => {
    switch (variant) {
      case 'buyYes':
        return 'Buy YES';
      case 'buyNo':
        return 'Buy NO';
      default:
        return 'Buy';
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`
        flex items-center justify-center space-x-2 px-4 py-2 rounded-md font-medium text-sm
        transition-all duration-200 ${getButtonStyle()}
        ${isLoading ? 'opacity-50' : ''}
      `}
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
      ) : (
        <>
          {getIcon()}
          <span>{getLabel()}</span>
        </>
      )}
    </button>
  );
}
