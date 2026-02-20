import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import {
  getAllFlights
} from '@/services/external/aviation/aviation.service';

// import type { IFlight } from '@/types/flights.types';
// import { FLIGHTS } from './flights.data';
import { FlightCard } from './FlightCard';
import Filters from '../filters/Filters';
import SkeletonLoader from '../custom-ui/SkeletonLoader';
import type { IFlightResponseData } from '@/services/external/aviation/aviation.types';

export const FlightList = () => {
  const [fromCountry, setFromCountry] = useState<string | null>(null);
  const [currentlySelectedAirline, setCurrentlySelectedAirline] = useState<string | null>(null);

  // const filteredFlights = useMemo(() => {
  //   return FLIGHTS.filter((flight) => {
  //     const matchesFromCountry = fromCountry ? flight.from.country === fromCountry : true;
  //     const matchesAirline = currentlySelectedAirline ? flight.airline.name === currentlySelectedAirline : true;
  //     return matchesFromCountry && matchesAirline;
  //   });
  // }, [fromCountry, currentlySelectedAirline]);

  const {
    data: allFlightsData,
    isLoading,
  } = useQuery({
    queryKey: ['flights', fromCountry, currentlySelectedAirline],
    queryFn: () => getAllFlights({
      fromCountry: fromCountry || undefined,
      airline: currentlySelectedAirline || undefined,
      flight_status: 'active',
    }),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  });

  console.log('Flights Data:', allFlightsData);

  const renderContent = () => {
    if (isLoading) {
      return <SkeletonLoader count={5} className="mb-4 h-42.5" />;
    }

    if (allFlightsData?.data.length === 0) {
      return <div>No flights found.</div>;
    }

    return allFlightsData?.data.map((flight: IFlightResponseData) => {
      return (
        <FlightCard
          flight={flight}
          key={flight.flight.number}
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
      <div className="pt-8 space-y-4 overflow-y-scroll max-h-[calc(100vh-4rem)] min-h-[calc(100vh-4rem)] pb-8">{renderContent()}</div>
    </div>
  );
};
