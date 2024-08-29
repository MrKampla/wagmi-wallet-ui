export const truncateDecimalPlaces = (value: string, decimalPlaces: number = 6) =>
  value
    .split('.')
    .map((part, i) => (i > 0 ? part.slice(0, decimalPlaces) : part))
    .join('.');
