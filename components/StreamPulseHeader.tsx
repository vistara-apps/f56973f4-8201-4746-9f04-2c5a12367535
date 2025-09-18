'use client';

import { useMiniKit } from '@coinbase/minikit';
import { useAuthenticate } from '@coinbase/onchainkit/minikit';
import { BalanceDisplay } from './BalanceDisplay';

export function StreamPulseHeader() {
  const { context } = useMiniKit();
  const { user } = useAuthenticate();

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
          {context?.user?.pfpUrl && (
            <img 
              src={context.user.pfpUrl} 
              alt="Profile" 
              className="w-8 h-8 rounded-full"
            />
          )}
          <div className="text-right">
            <p className="text-sm font-medium text-white">
              {context?.user?.displayName || 'Anonymous'}
            </p>
            {user && (
              <p className="text-xs text-gray-400">Connected</p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
