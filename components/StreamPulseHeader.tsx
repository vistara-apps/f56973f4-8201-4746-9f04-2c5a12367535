'use client';

import { BalanceDisplay } from './BalanceDisplay';

export function StreamPulseHeader() {
  // For now, using demo/mock data since MiniKit hooks are not available
  const isConnected = false; // This would come from wallet connection status
  const displayName = 'Demo User'; // This would come from user context

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
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {displayName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-white">
              {displayName}
            </p>
            <p className="text-xs text-gray-400">
              {isConnected ? 'Connected' : 'Not Connected'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
