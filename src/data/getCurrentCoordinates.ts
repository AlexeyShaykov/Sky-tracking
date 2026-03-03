export const getCurrentCoordinates = (
  from: [number, number],
  to: [number, number],
  progressPercent: number,
): { latitude: number; longitude: number } => {
  const ratio = progressPercent / 100;
  const lat = from[0] + (to[0] - from[0]) * ratio;
  const lng = from[1] + (to[1] - from[1]) * ratio;
  return { latitude: lat, longitude: lng };
};
