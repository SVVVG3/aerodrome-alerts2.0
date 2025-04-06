'use client';

import { useParams } from 'next/navigation';
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

// Mock data - in a real app, this would come from an API
const mockPositions: Position[] = [
  {
    token0: 'USDC',
    token1: 'ETH',
    poolAddress: '0x...',
    liquidity: '1000000',
    tickLower: -100,
    tickUpper: 100,
    currentTick: 0
  },
  {
    token0: 'USDC',
    token1: 'WBTC',
    poolAddress: '0x...',
    liquidity: '2000000',
    tickLower: -200,
    tickUpper: 200,
    currentTick: 250
  },
  {
    token0: 'ETH',
    token1: 'ARB',
    poolAddress: '0x...',
    liquidity: '500000',
    tickLower: -150,
    tickUpper: 150,
    currentTick: -180
  }
];

export default function PositionPage() {
  const params = useParams();
  const poolAddress = params.poolAddress as string;
  
  // In a real app, this would be an API call
  const position = mockPositions.find(p => p.poolAddress === poolAddress);

  if (!position) {
    return (
      <main className="min-h-screen p-3 md:p-6">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-3 md:p-4">
          <div className="text-center min-h-[300px] flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-black mb-3">Position Not Found</h2>
            <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm">
              Return to Positions
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const isInRange = position.currentTick >= position.tickLower && position.currentTick <= position.tickUpper;

  return (
    <main className="min-h-screen p-3 md:p-6">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-3 md:p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <Link href="/" className="text-blue-600 hover:text-blue-800 mb-2 inline-block text-sm">
              ← Back to Positions
            </Link>
            <h2 className="text-xl font-bold text-black">
              {position.token0}/{position.token1}
            </h2>
            <p className="text-black text-xs">Pool: {position.poolAddress}</p>
          </div>
        </div>

        {/* Status Banner */}
        <div className={`p-3 rounded-lg mb-4 ${
          isInRange ? 'bg-green-50' : 'bg-red-50'
        }`}>
          <div className="flex items-center">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mr-2 ${
              isInRange 
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {isInRange ? '● In Range' : '● Out of Range'}
            </span>
            <p className="text-black text-sm">
              {isInRange 
                ? 'Your position is currently in range and earning fees'
                : 'Your position is out of range and not earning fees'}
            </p>
          </div>
        </div>

        {/* Position Details - Fixed height container to prevent layout shifts */}
        <div className="min-h-[200px] space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <h3 className="text-xs font-medium text-black mb-1">Liquidity</h3>
              <p className="text-lg font-bold text-black">
                ${parseInt(position.liquidity).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h3 className="text-xs font-medium text-black mb-1">Current Tick</h3>
              <p className="text-lg font-bold text-black">{position.currentTick}</p>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <h3 className="text-xs font-medium text-black mb-2">Range</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-black">Lower Tick</p>
                <p className="text-base font-medium text-black">{position.tickLower}</p>
              </div>
              <div>
                <p className="text-xs text-black">Upper Tick</p>
                <p className="text-base font-medium text-black">{position.tickUpper}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 