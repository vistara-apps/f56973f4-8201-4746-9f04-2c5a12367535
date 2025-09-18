'use client';

import { BalanceDisplay } from './BalanceDisplay';

export function StreamPulseHeader() {
  // Mock user data for demo - in production, this would come from wallet/auth context
  const mockUser = {
    displayName: 'Demo User',
    pfpUrl: null,
    isConnected: true,
  };

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SP</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">StreamPulse</h1>
            <p className="text-xs text-gray-400">Prediction Market Platform</p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <BalanceDisplay />
        
        <div className="flex items-center space-x-2">
          {mockUser.pfpUrl && (
            <img
              src={mockUser.pfpUrl}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          )}
          {!mockUser.pfpUrl && (
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {mockUser.displayName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="text-right">
            <p className="text-sm font-medium text-white">
              {mockUser.displayName}
            </p>
            {mockUser.isConnected && (
              <p className="text-xs text-gray-400">Connected</p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
