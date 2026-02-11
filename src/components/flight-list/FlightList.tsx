import type { IFlight } from '@/types/flights.types';
import { FLIGHTS } from './flights.data';
import { FlightCard } from './FlightCard';
import Filters from '../filters/Filters';
import { useEffect, useMemo, useState } from 'react';
import SkeletonLoader from '../custom-ui/SkeletonLoader';

export const FlightList = () => {
  const [fromCountry, setFromCountry] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const filteredFlights = useMemo(() => {
    if (!fromCountry) return FLIGHTS;
    return FLIGHTS.filter((flight) => flight.from.country === fromCountry);
  }, [fromCountry]);

  const renderContent = () => {
    if (isLoading) {
      return <SkeletonLoader count={5} className="mb-4 h-42.5" />;
    }

    if (filteredFlights.length === 0) {
      return <div>No flights found.</div>;
    }

    return filteredFlights.map((flight: IFlight) => {
      return (
        <FlightCard
          flight={flight}
          key={flight.id}
        />
      );
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="xs:w-full md:w-xs w-sm">
      <Filters
        fromCountry={fromCountry}
        setFromCountry={setFromCountry}
      />
      <div className="space-y-4">{renderContent()}</div>
    </div>
  );
};
