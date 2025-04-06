'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Position {
  token0: string;
  token1: string;
  poolAddress: string;
  liquidity: string;
  tickLower: number;
  tickUpper: number;
  currentTick: number;
}

interface NotificationSettings {
  outOfRangeAlerts: boolean;
  impermanentLossAlerts: boolean;
  outOfRangeThreshold: number;
  impermanentLossThreshold: number;
  notificationFrequency: 'realtime' | 'hourly' | 'daily';
}

// Mock notification settings
const mockNotificationSettings: NotificationSettings = {
  outOfRangeAlerts: true,
  impermanentLossAlerts: false,
  outOfRangeThreshold: 5,
  impermanentLossThreshold: 10,
  notificationFrequency: 'realtime'
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<'positions' | 'notifications' | 'settings'>('positions');
  const [notificationSettings, setNotificationSettings] = useState(mockNotificationSettings);
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const query = `
          query GetPositions {
            positions(first: 100) {
              id
              token0 {
                symbol
              }
              token1 {
                symbol
              }
              liquidity
              tickLower
              tickUpper
              pool {
                id
              }
              currentTick
            }
          }
        `;

        const response = await fetch('https://api.thegraph.com/subgraphs/name/aerodrome-finance/aerodrome', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
          }),
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const { data } = await response.json();
        
        // Transform the data to match our Position interface
        const transformedPositions = data.positions.map((pos: any) => ({
          token0: pos.token0.symbol,
          token1: pos.token1.symbol,
          poolAddress: pos.pool.id,
          liquidity: pos.liquidity,
          tickLower: parseInt(pos.tickLower),
          tickUpper: parseInt(pos.tickUpper),
          currentTick: parseInt(pos.currentTick)
        }));

        setPositions(transformedPositions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching positions:', error);
        setError('Failed to load positions. Please try again later.');
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  const isInRange = (position: Position) => {
    return position.currentTick >= position.tickLower && position.currentTick <= position.tickUpper;
  };

  const handleFrequencyChange = (frequency: NotificationSettings['notificationFrequency']) => {
    setNotificationSettings(prev => ({
      ...prev,
      notificationFrequency: frequency
    }));
  };

  if (loading) {
    return (
      <main className="min-h-screen p-3 md:p-6">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-3 md:p-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen p-3 md:p-6">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-3 md:p-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-3 md:p-6">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-3 md:p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-black">Aerodrome Alerts</h1>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setActiveTab('positions')}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg ${
              activeTab === 'positions'
                ? 'bg-blue-100 text-blue-800'
                : 'text-black hover:bg-gray-100'
            }`}
          >
            Positions
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg ${
              activeTab === 'notifications'
                ? 'bg-blue-100 text-blue-800'
                : 'text-black hover:bg-gray-100'
            }`}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg ${
              activeTab === 'settings'
                ? 'bg-blue-100 text-blue-800'
                : 'text-black hover:bg-gray-100'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Tab Content - Fixed height container to prevent layout shifts */}
        <div className="min-h-[300px] space-y-4">
          {/* Positions Tab */}
          {activeTab === 'positions' && (
            <div className="space-y-3">
              {positions.length === 0 ? (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">No positions found!</strong>
                  <span className="block sm:inline"> You don't have any positions yet.</span>
                </div>
              ) : (
                positions.map((position) => (
                  <Link 
                    href={`/position/${position.poolAddress}`}
                    key={position.poolAddress}
                    className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-black">
                          {position.token0}/{position.token1}
                        </h3>
                        <p className="text-sm text-black">
                          ${parseInt(position.liquidity).toLocaleString()}
                        </p>
                      </div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        isInRange(position)
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {isInRange(position) ? '● In Range' : '● Out of Range'}
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-black mb-2">Recent Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <span className="text-red-500">●</span>
                    <div>
                      <p className="text-sm text-black">Position out of range: USDC/ETH</p>
                      <p className="text-xs text-black">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-green-500">●</span>
                    <div>
                      <p className="text-sm text-black">Position back in range: USDC/WBTC</p>
                      <p className="text-xs text-black">5 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-black mb-3">Notification Settings</h3>
                
                {/* Alert Toggles */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-black">Out of Range Alerts</span>
                    <button
                      onClick={() => setNotificationSettings(prev => ({
                        ...prev,
                        outOfRangeAlerts: !prev.outOfRangeAlerts
                      }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        notificationSettings.outOfRangeAlerts ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        notificationSettings.outOfRangeAlerts ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>

                {/* Threshold Settings */}
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="block text-sm text-black mb-1">
                      Out of Range Threshold (%)
                    </label>
                    <input
                      type="number"
                      value={notificationSettings.outOfRangeThreshold}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNotificationSettings(prev => ({
                        ...prev,
                        outOfRangeThreshold: Number(e.target.value)
                      }))}
                      className="w-full p-2 border rounded-lg text-black"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                {/* Notification Frequency */}
                <div>
                  <h4 className="text-sm font-medium text-black mb-2">Notification Frequency</h4>
                  <div className="space-y-2">
                    {(['realtime', 'hourly', 'daily'] as const).map((frequency) => (
                      <button
                        key={frequency}
                        onClick={() => handleFrequencyChange(frequency)}
                        className={`w-full p-2 text-left rounded-lg flex items-center justify-between ${
                          notificationSettings.notificationFrequency === frequency
                            ? 'bg-blue-50 border border-blue-200'
                            : 'bg-white border border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-sm text-black capitalize">{frequency}</span>
                        {notificationSettings.notificationFrequency === frequency && (
                          <span className="text-blue-600">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 