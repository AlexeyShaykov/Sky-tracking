import { useState } from 'react';

// import type { IFlight } from '@/types/flights.types';
// import { FLIGHTS } from './flights.data';
import { FlightCard } from './FlightCard';
import Filters from '../filters/Filters';
import SkeletonLoader from '../custom-ui/SkeletonLoader';
import type { IFlightResponseData } from '@/services/external/aviation/aviation.types';
import { AnimateIcon } from '../animate-ui/icons/icon';
import { RefreshCcw } from '../animate-ui/icons/refresh-ccw';
import { formatDate } from './format-date';
import { Button } from '../ui/button';
import { useGetAllFlights } from '@/hooks/useGetAllFlights';

export const FlightList = () => {
  const [fromCountry, setFromCountry] = useState<string | null>(null);
  const [currentlySelectedAirline, setCurrentlySelectedAirline] = useState<
    string | null
  >(null);

  const [lastTimeUpdate, setLastTimeUpdate] = useState<Date | null>(null);

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
      refetch,
      isRefetching,
    } = useGetAllFlights(() => {
      setLastTimeUpdate(new Date());
    });

  const onRefreshFlightData = () => {
    refetch();
  };

  const renderContent = () => {
    if (isLoading || isRefetching) {
      return (
        <SkeletonLoader
          count={5}
          className="mb-4 h-42.5"
        />
      );
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
      <div className="absolute top-0 -right-16">
        <Button
          onClick={onRefreshFlightData}
          disabled={isRefetching}
          variant="outline"
        >
          <AnimateIcon animateOnHover>
            <RefreshCcw />
          </AnimateIcon>
        </Button>
      </div>
      {lastTimeUpdate && (
        <div className="text-xs italic text-muted-foreground mt-3 text-center opacity-50">
          Last updated: {formatDate(lastTimeUpdate)}
        </div>
      )}
      <div className="pt-3 space-y-4 overflow-y-scroll max-h-[calc(100vh-4rem)] min-h-[calc(100vh-4rem)] pb-8">
        {renderContent()}
      </div>
    </div>
  );
};
