import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import debounce from 'debounce';

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
import { ArrowDown } from '../animate-ui/icons/arrow-down';
import { ArrowUp } from '../animate-ui/icons/arrow-up';

export const FlightList = () => {
  const fromSelectedCountry = useAppSelector(
    (state) => state.filters.fromCountry,
  );
  const currentlySelectedAirline = useAppSelector(
    (state) => state.filters.currentlySelectedAirline,
  );

  const [lastTimeUpdate, setLastTimeUpdate] = useState<Date | null>(new Date());

  const [isShowList, setIsShowList] = useState(true);

  const { ref: loadMoreRef, inView } = useInView({ rootMargin: '100px' });

  const isFromFilterCall = useRef(false);

  const { removeSearchParam, setFlight } = useCurrentFlight(setLastTimeUpdate);

  const allAirports = useAppSelector((state) => state.airports.data);
  const dispatch = useAppDispatch();

  const {
    data: allFlightsData,
    isLoading,
    refetch,
    isRefetching,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetAllFlights(() => {
    setLastTimeUpdate(new Date());
    // setFlight(__data[0]?.flight.number || '');
  }, allAirports);

  const pagesFlightsData = useMemo(() => {
    return allFlightsData?.pages.flatMap((page) => page.data) || [];
  }, [allFlightsData]);

  useAircraftPhotos(pagesFlightsData);

  const filteredFlights = useMemo(() => {
    if (!pagesFlightsData.length) return [];
    if (!fromSelectedCountry && !currentlySelectedAirline)
      return pagesFlightsData;

    return pagesFlightsData.filter((flight) => {
      const matchesFromCountry = fromSelectedCountry
        ? flight.departure.country === fromSelectedCountry
        : true;
      const matchesAirline = currentlySelectedAirline
        ? flight.airline.name === currentlySelectedAirline
        : true;
      return matchesFromCountry && matchesAirline;
    });
  }, [pagesFlightsData, fromSelectedCountry, currentlySelectedAirline]);

  const onRefreshFlightData = async () => {
    await refetch();
    removeSearchParam();
  };

  const onFetchMore = useCallback(() => {
    debounce(() => {
      fetchNextPage();
    }, 300)();
  }, [fetchNextPage]);

  useEffect(() => {
    if (currentlySelectedAirline && fromSelectedCountry) return;
    if (inView && hasNextPage && !isFetchingNextPage) {
      onFetchMore();
    }
  }, [currentlySelectedAirline, fromSelectedCountry, hasNextPage, inView, isFetchingNextPage, onFetchMore]);

  const renderContent = () => {
    if (!isShowList) return null;

    if (isLoading || isRefetching) {
      return (
        <SkeletonLoader
          count={5}
          className="mb-4 h-42.5"
        />
      );
    }

    if (pagesFlightsData.length === 0) {
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
          <div className="xs:right-0 xs:space-y-2 absolute top-0 -right-12.5">
            <Button
              onClick={onRefreshFlightData}
              disabled={isRefetching}
              variant="secondary"
              className="xs:size-8 xs:mt-0.5"
            >
              <AnimateIcon animateOnHover>
                <RefreshCcw />
              </AnimateIcon>
            </Button>

            <Button
              onClick={() => setIsShowList(!isShowList)}
              variant="secondary"
              className="xs:size-8 xs:flex hidden items-center justify-center"
            >
              {isShowList ? <ArrowDown /> : <ArrowUp />}
            </Button>
          </div>
          {lastTimeUpdate && (
            <div className="text-xs italic text-muted-foreground mt-3 text-center opacity-50">
              Last updated: {formatDate(lastTimeUpdate)}
            </div>
          )}
        </>
      )}
      <div className="pt-3 space-y-4 overflow-y-scroll max-h-[calc(100vh-4rem)] min-h-[calc(100vh-4rem)] pb-8 xs:pt-6">
        {renderContent()}
        {isFetchingNextPage && (
          <SkeletonLoader
            count={5}
            className="mb-4 h-40"
          />
        )}

        {!isFetchingNextPage && !isLoading && !isRefetching && (
          <div ref={loadMoreRef} />
        )}
      </div>
    </div>
  );
};
