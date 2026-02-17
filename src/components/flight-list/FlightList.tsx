import type { IFlight } from '@/types/flights.types';
import { FLIGHTS } from './flights.data';
import { FlightCard } from './FlightCard';
import Filters from '../filters/Filters';
import { useMemo, useState } from 'react';
// import SkeletonLoader from '../custom-ui/SkeletonLoader';

export const FlightList = () => {
  const [fromCountry, setFromCountry] = useState<string | null>(null);
  const [currentlySelectedAirline, setCurrentlySelectedAirline] = useState<string | null>(null);

  const filteredFlights = useMemo(() => {
    return FLIGHTS.filter((flight) => {
      const matchesFromCountry = fromCountry ? flight.from.country === fromCountry : true;
      const matchesAirline = currentlySelectedAirline ? flight.airline.name === currentlySelectedAirline : true;
      return matchesFromCountry && matchesAirline;
    });
  }, [fromCountry, currentlySelectedAirline]);

  const renderContent = () => {
    // if (isLoading) {
    //   return <SkeletonLoader count={5} className="mb-4 h-42.5" />;
    // }

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

  return (
    <div className="xs:w-full md:w-xs w-sm relative z-10">
      <Filters
        fromCountry={fromCountry}
        setFromCountry={setFromCountry}
        currentlySelectedAirline={currentlySelectedAirline}
        setCurrentlySelectedAirline={setCurrentlySelectedAirline}
      />
      <div className="space-y-4">{renderContent()}</div>
    </div>
  );
};
