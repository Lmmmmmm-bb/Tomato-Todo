export const formatSecondTohhmmss = (num: number): number[] => {
  const hour = Math.floor(num / 3600);
  const minute = Math.floor((num - hour * 3600) / 60);
  const second = Math.floor(num - (hour * 3600 + minute * 60));
  return [hour, minute, second];
};

export const formatSecondToHourWithMiute = (num: number): [number, number] => {
  const hour = Math.floor(num / 3600);
  const minute = Math.floor((num - hour * 3600) / 60);
  return [hour, minute];
};

export const formatSecondToMinute = (num: number): number => {
  return Math.floor(num / 60);
};
