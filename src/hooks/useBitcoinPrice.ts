import { useEffect, useState, useCallback } from 'react';
import { fetchBTCPriceUSD } from '../utils/api';

export function useBitcoinPrice() {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);

  const fetchPrice = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const p = await fetchBTCPriceUSD();
      setPrice(p);
      setLastSynced(new Date());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch BTC price');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrice();
  }, [fetchPrice]);

  return { price, loading, error, lastSynced, refetch: fetchPrice };
}
