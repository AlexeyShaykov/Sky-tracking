import { useEffect, useMemo, useRef, useState } from 'react';

import { FlightCard } from './FlightCard';
import Filters from '../filters/Filters';
import SkeletonLoader from '../custom-ui/SkeletonLoader';
import type { IFlightResponseData } from '@/services/external/aviation/aviation.types';
import { AnimateIcon } from '../animate-ui/icons/icon';
import { RefreshCcw } from '../animate-ui/icons/refresh-ccw';
import { formatDate } from '../../data/format-date';
import { Button } from '../ui/button';
import { useGetAllFlights } from '@/hooks/useGetAllFlights';
import useCurrentFlight from '@/hooks/useCurrentFlight';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import {
  addCurrentlySelectedAirlineFilter,
  addFromCountryFilter,
} from '@/store/filters/filters.slice';
import { useAircraftPhotos } from '@/hooks/useAircraftPhotos';

export const FlightList = () => {
  const fromSelectedCountry = useAppSelector(
    (state) => state.filters.fromCountry,
  );
  const currentlySelectedAirline = useAppSelector(
    (state) => state.filters.currentlySelectedAirline,
  );

  const [lastTimeUpdate, setLastTimeUpdate] = useState<Date | null>(new Date());

  const isFromFilterCall = useRef(false);

  const { removeSearchParam, setFlight } = useCurrentFlight();

  const allAirports = useAppSelector((state) => state.airports.data);
  const dispatch = useAppDispatch();

  const {
    data: allFlightsData,
    isLoading,
    refetch,
    isRefetching,
  } = useGetAllFlights(() => {
    setLastTimeUpdate(new Date());
    // setFlight(__data[0]?.flight.number || '');
  }, allAirports);

  useAircraftPhotos(allFlightsData?.data);

  const filteredFlights = useMemo(() => {
    if (!allFlightsData?.data) return [];
    if (!fromSelectedCountry && !currentlySelectedAirline)
      return allFlightsData?.data;

    return allFlightsData?.data.filter((flight) => {
      const matchesFromCountry = fromSelectedCountry
        ? flight.departure.country === fromSelectedCountry
        : true;
      const matchesAirline = currentlySelectedAirline
        ? flight.airline.name === currentlySelectedAirline
        : true;
      return matchesFromCountry && matchesAirline;
    });
  }, [allFlightsData?.data, fromSelectedCountry, currentlySelectedAirline]);

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

  useEffect(() => {
    if (isFromFilterCall.current) {
      isFromFilterCall.current = false;
      setFlight(filteredFlights[0]?.flight.number || '');
    }
  }, [
    fromSelectedCountry,
    filteredFlights,
    setFlight,
    currentlySelectedAirline,
  ]);

  return (
    <div className="xs:w-full md:w-xs w-sm relative z-10">
      {!isLoading && (
        <>
          <Filters
            fromCountry={fromSelectedCountry}
            setSelectedFromCountry={(selectedCountry) => {
              dispatch(addFromCountryFilter(selectedCountry));
              removeSearchParam();
              isFromFilterCall.current = true;
            }}
            currentlySelectedAirline={currentlySelectedAirline}
            setCurrentlySelectedAirline={(selectedAirline) => {
              dispatch(addCurrentlySelectedAirlineFilter(selectedAirline));
              removeSearchParam();
              isFromFilterCall.current = true;
            }}
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
        </>
      )}
      <div className="pt-3 space-y-4 overflow-y-scroll max-h-[calc(100vh-4rem)] min-h-[calc(100vh-4rem)] pb-8">
        {renderContent()}
      </div>
    </div>
  );
};
