import type { IFlight } from '@/types/flights.types';
import { FLIGHTS } from './flights.data';
import { FlightCard } from './FlightCard';
import Filters from '../filters/Filters';
import { useMemo, useState } from 'react';

export const FlightList = () => {
    const [fromCountry, setFromCountry] = useState<string | null>(null);

    const filteredFlights = useMemo(() => {
      if (!fromCountry)  return FLIGHTS;
      return FLIGHTS.filter(flight => flight.from.country === fromCountry);
    }, [fromCountry]);
    
  return (
    <div className="w-sm">
      <Filters fromCountry={fromCountry} setFromCountry={setFromCountry} />
      <div className="space-y-4">
        {filteredFlights.map((flight: IFlight) => {
          return (
            <FlightCard
              flight={flight}
              key={flight.id}
            />
          );
        })}
      </div>
    </div>
  );
};
