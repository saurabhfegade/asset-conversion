export function formatUSD(amount: string | number): string {
  return `$${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatWBTC(amount: string | number): string {
  return `${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })} tokens`;
} 