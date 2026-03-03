import type { TFlightsResponse } from '@/services/external/aviation/aviation.types';

const shiftDatesToNow = (data: TFlightsResponse): TFlightsResponse => {
  const now = new Date();

  return {
    ...data,
    data: data.data.map((flight) => {
      const baseScheduled = new Date(flight.departure.scheduled || flight.flight_date);

      // сдвигаем так чтобы scheduled вылета = сейчас + небольшой случайный offset
      const offsetMinutes = Math.floor(Math.random() * 120); // 0-2 часа вперёд
      const newScheduled = new Date(now.getTime() + offsetMinutes * 60 * 1000);
      const diffMs = newScheduled.getTime() - baseScheduled.getTime();

      const shiftDate = (dateStr: string | null | undefined): string | null => {
        if (!dateStr) return null;
        return new Date(new Date(dateStr).getTime() + diffMs).toISOString();
      };

      const shiftEndpoint = (ep: typeof flight.departure) => ({
        ...ep,
        scheduled: shiftDate(ep.scheduled) ?? ep.scheduled,
        estimated: shiftDate(ep.estimated) ?? ep.estimated,
        actual: shiftDate(ep.actual),
        estimated_runway: shiftDate(ep.estimated_runway),
        actual_runway: shiftDate(ep.actual_runway),
      });

      return {
        ...flight,
        flight_date: now.toISOString().slice(0, 10),
        departure: shiftEndpoint(flight.departure),
        arrival: shiftEndpoint(flight.arrival),
      };
    }),
  };
};

export default shiftDatesToNow;
