import { useMemo, useState } from 'react';

import { FlightCard } from './FlightCard';
import Filters from '../filters/Filters';
import SkeletonLoader from '../custom-ui/SkeletonLoader';
import type { IFlightResponseData } from '@/services/external/aviation/aviation.types';
import { AnimateIcon } from '../animate-ui/icons/icon';
import { RefreshCcw } from '../animate-ui/icons/refresh-ccw';
import { formatDate } from './format-date';
import { Button } from '../ui/button';
import { useGetAllFlights } from '@/hooks/useGetAllFlights';
import useCurrentFlight from '@/hooks/useCurrentFlight';
import useAppSelector from '@/hooks/useAppSelector';

export const FlightList = () => {
  const [fromCountry, setFromCountry] = useState<string | null>(null);
  const [currentlySelectedAirline, setCurrentlySelectedAirline] = useState<
    string | null
  >(null);

  const [lastTimeUpdate, setLastTimeUpdate] = useState<Date | null>(null);
  const {
    removeSearchParam,
    setFlight
  } = useCurrentFlight();

  const allAirports = useAppSelector((state) => state.airports.data);

  const {
      data: allFlightsData,
      isLoading,
      refetch,
      isRefetching,
    } = useGetAllFlights((__data: IFlightResponseData[]) => {
      setLastTimeUpdate(new Date());
      setFlight(__data[0]?.flight.number || '');
    }, allAirports);

  const filteredFlights = useMemo(() => {
    if (!allFlightsData?.data) return [];
    if (!fromCountry && !currentlySelectedAirline) return allFlightsData?.data;

    return allFlightsData?.data.filter((flight) => {
      const matchesFromCountry = fromCountry ? flight.departure.country === fromCountry : true;
      const matchesAirline = currentlySelectedAirline ? flight.airline.name === currentlySelectedAirline : true;
      return matchesFromCountry && matchesAirline;
    });
  }, [allFlightsData?.data, fromCountry, currentlySelectedAirline]);

  const onRefreshFlightData = async () => {
    await refetch();
    removeSearchParam();
    setFlight(allFlightsData?.data[0]?.flight.number || '');
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

    return filteredFlights.map((flight: IFlightResponseData) => {
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
