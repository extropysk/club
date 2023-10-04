export const dateToEpoch = (value: Date): number => {
  return Math.floor(value.getTime() / 1000);
};

export const durationToStr = (value: number): string => {
  const h = Math.floor(value / 3600);
  const m = Math.floor((value % 3600) / 60);
  const s = value % 60;

  return [h, m > 9 ? m : "0" + m, s > 9 ? s : "0" + s].join(":");
};
