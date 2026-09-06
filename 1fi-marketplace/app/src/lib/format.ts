/** ₹1,23,456 — Indian digit grouping, no decimals. */
export function formatRupees(amount: number): string {
  const rounded = Math.round(amount);
  return `₹${rounded.toLocaleString('en-IN')}`;
}

export function formatRupeesPerMonth(amount: number): string {
  return `${formatRupees(amount)}/mo`;
}
