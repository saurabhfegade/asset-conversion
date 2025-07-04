import { ethers } from 'ethers';

const ERC20_ABI = [
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
];

export async function fetchErc20Meta(
  contractAddress: string,
  providerUrl: string
): Promise<{ symbol: string; decimals: number }> {
  //   throw new Error('Not implemented');
  const provider = new ethers.JsonRpcProvider(providerUrl);
  const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider);
  const [symbol, decimals] = await Promise.all([
    contract.symbol(),
    contract.decimals(),
  ]);
  return { symbol, decimals };
}
