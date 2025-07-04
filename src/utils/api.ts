import axios from 'axios';

export async function fetchBTCPriceUSD(): Promise<number> {
  const url =
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
  const response = await axios.get(url);
  if (!response.data.bitcoin || typeof response.data.bitcoin.usd !== 'number') {
    throw new Error('Invalid price data');
  }
  return response.data.bitcoin.usd;
}
