import BigNumber from 'bignumber.js';

export function toBigNumber(value: string | number): BigNumber {
  return new BigNumber(value);
}

export function formatBigNumber(
  value: BigNumber,
  decimals: number
): string {
  return value.toFormat(decimals, BigNumber.ROUND_DOWN);
}

export function isValidDecimal(
  value: string,
  maxDecimals: number
): boolean {
  if (!/^\d*(\.\d*)?$/.test(value)) return false;
  const [, decimals] = value.split('.');
  return !decimals || decimals.length <= maxDecimals;
} 