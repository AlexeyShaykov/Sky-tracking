import type { IFlight } from '@/types/flights.types';
import { FLIGHTS } from './flights.data';
import { FlightCard } from './FlightCard';

export const FlightList = () => {
  return (
    <div
      className="w-sm space-y-4"
    >
      {
        FLIGHTS.map((flight: IFlight) => {
          return (
            <FlightCard flight={flight} key={flight.id} />
          )
        })
      }
    </div>
  )
};