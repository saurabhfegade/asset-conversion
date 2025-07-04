export type Currency = 'USD' | 'WBTC';

export interface CurrencyMeta {
  label: string;
  symbol?: string;
  decimals?: number;
  iconUrl?: string;
}

export const CURRENCY_META: Record<Currency, CurrencyMeta> = {
  USD: {
    label: 'US Dollar',
    symbol: '$',
    decimals: 2,
  },
  WBTC: {
    label: 'Wrapped Bitcoin',
    symbol: 'WBTC',
    iconUrl:
      'https://assets.coingecko.com/coins/images/7598/standard/wrapped_bitcoin_wbtc.png?1696507857',
  },
};
