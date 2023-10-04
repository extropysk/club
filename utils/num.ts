export const round = (value: number, decimals = 0): number => {
  const x = Math.pow(10, decimals);
  return Math.round(value * x) / x;
};
