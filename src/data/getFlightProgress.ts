import * as turf from '@turf/turf';

const formatDuration = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

export const getFlightProgress = (
  from: { latitude: number; longitude: number },
  to: { latitude: number; longitude: number },
  current: { latitude: number; longitude: number },
  scheduledDeparture: string,
  scheduledArrival: string,
) => {
  const fromPoint = turf.point([from.longitude, from.latitude]);
  const toPoint = turf.point([to.longitude, to.latitude]);
  const currentPoint = turf.point([current.longitude, current.latitude]);

  const totalKm = turf.distance(fromPoint, toPoint, { units: 'kilometers' });
  const flownKm = turf.distance(fromPoint, currentPoint, { units: 'kilometers' });
  const remainingKm = turf.distance(currentPoint, toPoint, { units: 'kilometers' });

  // считаем среднюю скорость из расписания
  const totalMinutes =
    (new Date(scheduledArrival).getTime() - new Date(scheduledDeparture).getTime()) / 60000;

  const avgSpeed = totalMinutes > 0 ? totalKm / totalMinutes : 0; // км/мин

  const flownMinutes = avgSpeed > 0 ? flownKm / avgSpeed : 0;
  const remainingMinutes = avgSpeed > 0 ? remainingKm / avgSpeed : 0;

  return {
    totalKm: Math.round(totalKm),
    flownKm: Math.round(flownKm),
    remainingKm: Math.round(remainingKm),
    flownTime: formatDuration(flownMinutes),
    remainingTime: formatDuration(remainingMinutes),
  };
};