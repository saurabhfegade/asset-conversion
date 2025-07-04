import { useEffect, useState } from 'react';
import { fetchErc20Meta } from '../utils/erc20';

const WBTC_ADDRESS = '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599';
const MAINNET_RPC = 'https://eth.drpc.org';

export function useWbtcMeta() {
  const [meta, setMeta] = useState<{ symbol: string; decimals: number } | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchErc20Meta(WBTC_ADDRESS, MAINNET_RPC)
      .then(setMeta)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { meta, loading, error };
}
