/* eslint-disable react-hooks/set-state-in-effect */
import { useSearchParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { QUERY_PARAM_FLIGHT } from '@/components/flight-list/flight.constants';
import type { IFlightResponseData } from '@/services/external/aviation/aviation.types';
import { useGetAllFlights } from './useGetAllFlights';
import useAppSelector from './useAppSelector';
import { getCurrentCoordinates } from '@/data/flights.data';

const INTERVAL_MS = 1000;
const PROGRESS_STEP = 0.02;

const lerp = (current: number, min: number, max: number, maxDelta: number) => {
  const delta = (Math.random() - 0.5) * 2 * maxDelta;
  return Math.min(max, Math.max(min, current + delta));
};

const useCurrentFlight = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedFlight = searchParams.get(QUERY_PARAM_FLIGHT);
  const allAirports = useAppSelector((state) => state.airports.data);
  const queryClient = useQueryClient();

  const progressRef = useRef<number | null>(null);
  const liveRef = useRef({
    altitude: 10000,
    direction: 0,
    speed_horizontal: 850,
  });

  const [flight, setCurrentFlight] = useState<IFlightResponseData | null>(null);

  const {
    data: allFlightsData,
  } = useGetAllFlights(
    undefined,
    allAirports,
  );

  const setFlight = (flightId: string) => {
   setSearchParams({ [QUERY_PARAM_FLIGHT]: flightId });
  };

  const removeSearchParam = () => {
    searchParams.delete(QUERY_PARAM_FLIGHT);
    setSearchParams(searchParams);
  };

  // const flight = useMemo(
  //   () => {
  //     if (!allFlightsData || !allFlightsData.data || !selectedFlight) return null;

  //     return allFlightsData?.data.find((f: IFlightResponseData) => f.flight.number === selectedFlight);
  //   },
  //   [allFlightsData, selectedFlight],
  // );

  useEffect(() => {
    if (!allFlightsData?.data || !selectedFlight) {
      setCurrentFlight(null);
      return;
    }
    const found = allFlightsData.data.find(
      (f: IFlightResponseData) => f.flight.number === selectedFlight,
    );

    if (found?.live) {
      liveRef.current = {
        altitude: found.live.altitude || 10000,
        direction: found.live.direction || 0,
        speed_horizontal: found.live.speed_horizontal || 850,
      };
    }

    setCurrentFlight(found ?? null);
  }, [allFlightsData, selectedFlight]);

  useEffect(() => {
    if (!selectedFlight) return;

    progressRef.current = null;

    const interval = setInterval(() => {
      setCurrentFlight((prev) => {
        if (!prev) return prev;

        if (progressRef.current === null) {
          progressRef.current = prev.progress ?? Math.random() * 99;
        }
        progressRef.current = Math.min(100, progressRef.current + PROGRESS_STEP);

        const { departure, arrival } = prev;
        if (!departure.latitude || !departure.longitude || !arrival.latitude || !arrival.longitude) {
          return prev;
        }

        // плавно меняем показатели
        liveRef.current = {
          altitude: Math.floor(lerp(liveRef.current.altitude, 8000, 13000, 50)),
          direction: Math.floor(lerp(liveRef.current.direction, 0, 360, 2)),
          speed_horizontal: Math.floor(lerp(liveRef.current.speed_horizontal, 700, 950, 5)),
        };

        const updatedFlight: IFlightResponseData = {
          ...prev,
          progress: progressRef.current,
          live: {
            updated: new Date().toISOString(),
            ...liveRef.current,
            speed_vertical: 0,
            is_ground: false,
            ...getCurrentCoordinates(
              [departure.latitude, departure.longitude],
              [arrival.latitude, arrival.longitude],
              progressRef.current,
            ),
          },
        };

        // обновляем и в общем кэше
        queryClient.setQueryData(
          ['flights', null, null],
          (old: { data: IFlightResponseData[] } | undefined) => {
            if (!old?.data) return old;
            return {
              ...old,
              data: old.data.map((f) =>
                f.flight.number === selectedFlight ? updatedFlight : f,
              ),
            };
          },
        );

        return updatedFlight;
      });
    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, [selectedFlight, queryClient]);


  return { flight, setFlight, removeSearchParam };
};

export default useCurrentFlight;