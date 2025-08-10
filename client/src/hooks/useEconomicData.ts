import { useQuery } from '@tanstack/react-query';

// Economic data interfaces
interface EconomicIndicators {
  globalDebt: number;
  globalGDP: number;
  debtToGDP: number;
  inflationRate: number;
  unemploymentRate: number;
  lastUpdated: string;
}

interface CryptoPrice {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

// Mock data service that simulates real API calls
const mockEconomicData = (): EconomicIndicators => ({
  globalDebt: 324000, // $324T from document
  globalGDP: 105000, // $105T current estimate
  debtToGDP: 308.57, // Calculated ratio
  inflationRate: 3.2,
  unemploymentRate: 6.1,
  lastUpdated: new Date().toISOString()
});

// CoinGecko API integration
const fetchCryptoPrices = async (): Promise<CryptoPrice[]> => {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,matic-network,usd-coin&vs_currencies=usd&include_24hr_change=true&include_market_cap=true'
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch crypto prices');
    }
    
    const data = await response.json();
    
    return [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'BTC',
        current_price: data.bitcoin?.usd || 0,
        price_change_24h: data.bitcoin?.usd_24h_change || 0,
        price_change_percentage_24h: data.bitcoin?.usd_24h_change || 0,
        market_cap: data.bitcoin?.usd_market_cap || 0
      },
      {
        id: 'ethereum',
        name: 'Ethereum', 
        symbol: 'ETH',
        current_price: data.ethereum?.usd || 0,
        price_change_24h: data.ethereum?.usd_24h_change || 0,
        price_change_percentage_24h: data.ethereum?.usd_24h_change || 0,
        market_cap: data.ethereum?.usd_market_cap || 0
      },
      {
        id: 'matic-network',
        name: 'Polygon',
        symbol: 'POL',
        current_price: data['matic-network']?.usd || 0,
        price_change_24h: data['matic-network']?.usd_24h_change || 0,
        price_change_percentage_24h: data['matic-network']?.usd_24h_change || 0,
        market_cap: data['matic-network']?.usd_market_cap || 0
      },
      {
        id: 'hybrid-coin',
        name: 'Hybrid Coin',
        symbol: 'HYBRID',
        current_price: 1.0, // Pegged to USD as stable payment gateway
        price_change_24h: 0,
        price_change_percentage_24h: 0,
        market_cap: 25000000000000 // $25T backing from TU system
      }
    ];
  } catch (error) {
    console.warn('Using fallback crypto data:', error);
    return [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'BTC', 
        current_price: 104250,
        price_change_24h: 1250,
        price_change_percentage_24h: 1.22,
        market_cap: 2050000000000
      },
      {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        current_price: 3890,
        price_change_24h: -85,
        price_change_percentage_24h: -2.14,
        market_cap: 467000000000
      },
      {
        id: 'matic-network', 
        name: 'Polygon',
        symbol: 'POL',
        current_price: 0.52,
        price_change_24h: 0.018,
        price_change_percentage_24h: 3.58,
        market_cap: 5200000000
      },
      {
        id: 'hybrid-coin',
        name: 'Hybrid Coin',
        symbol: 'HYBRID',
        current_price: 1.0,
        price_change_24h: 0,
        price_change_percentage_24h: 0,
        market_cap: 25000000000000
      }
    ];
  }
};

export const useEconomicData = () => {
  return useQuery({
    queryKey: ['economic-indicators'],
    queryFn: () => mockEconomicData(),
    refetchInterval: 300000, // Refresh every 5 minutes
    staleTime: 240000, // Consider stale after 4 minutes
  });
};

export const useCryptoPrices = () => {
  return useQuery({
    queryKey: ['crypto-prices'],
    queryFn: fetchCryptoPrices,
    refetchInterval: 30000, // Refresh every 30 seconds
    staleTime: 25000, // Consider stale after 25 seconds
  });
};

export const useUBICalculations = () => {
  const { data: economic } = useEconomicData();
  const { data: crypto } = useCryptoPrices();
  
  return useQuery({
    queryKey: ['ubi-calculations', economic, crypto],
    queryFn: () => {
      if (!economic || !crypto) return null;
      
      const hybridPrice = crypto.find(c => c.id === 'hybrid-coin')?.current_price || 1;
      const globalPopulation = 8000000000; // 8 billion
      const targetUsers = 1000000000; // 1 billion initial target
      
      return {
        // Monthly UBI calculations
        monthlyUBIPool: 25000000000000 / 12, // $25T annual / 12 months
        monthlyUBIPerUser: (25000000000000 / 12) / targetUsers, // Per user monthly
        hybridEquivalent: ((25000000000000 / 12) / targetUsers) / hybridPrice,
        
        // Debt nullification progress
        debtNullificationRate: 324000000000000 / (5 * 12), // $324T over 5 years
        monthlyDebtReduction: 324000000000000 / (5 * 12),
        
        // Coverage metrics
        globalCoveragePercent: (targetUsers / globalPopulation) * 100,
        truUnitsGenerated: Infinity, // TU (Trust Units) are infinite abundance-based currency
        
        // Real-time economic impact
        scarcityReductionIndex: Math.min(100, (targetUsers / 1000000000) * 100),
        abundanceGrowthRate: 12.5, // Based on φ-harmonic resonance
        
        lastCalculated: new Date().toISOString()
      };
    },
    enabled: !!economic && !!crypto,
    refetchInterval: 60000, // Recalculate every minute
  });
};