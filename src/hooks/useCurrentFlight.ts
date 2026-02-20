import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';

import { QUERY_PARAM_FLIGHT } from '@/components/flight-list/flight.constants';
// import { FLIGHTS } from '@/components/flight-list/flights.data';
import type { IFlightResponseData } from '@/services/external/aviation/aviation.types';
import { useGetAllFlights } from './useGetAllFlights';

const useCurrentFlight = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedFlight = searchParams.get(QUERY_PARAM_FLIGHT);
  const updateFlightTimer = useRef<NodeJS.Timeout | null>(null);

  const [
    flight, setUpdatedFlight
  ] = useState<IFlightResponseData | null>(null);

  const {
    data: allFlightsData,
  } = useGetAllFlights();

  const setFlight = (flightId: string) => {
   setSearchParams({ [QUERY_PARAM_FLIGHT]: flightId });
  };

  // const flight = useMemo(
  //   () => {
  //     if (!allFlightsData || !allFlightsData.data || !selectedFlight) return null;

  //     return allFlightsData?.data.find((f: IFlightResponseData) => f.flight.number === selectedFlight);
  //   },
  //   [allFlightsData, selectedFlight],
  // );

  useEffect(() => {
    if (!selectedFlight && !flight) return;
    
    if (!selectedFlight && flight) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUpdatedFlight(null);
      if (updateFlightTimer.current) {
        clearTimeout(updateFlightTimer.current);
      }
      return;
    }

    const __flight = allFlightsData?.data.find((f: IFlightResponseData) => f.flight.number === selectedFlight);

    if (__flight) {
      setUpdatedFlight(__flight);
    }

    if (updateFlightTimer.current) {
      clearTimeout(updateFlightTimer.current);
    }

    // updateFlightTimer.current = setInterval(() => {
    //   if (__flight) {
    //     setUpdatedFlight((prev) => {
    //       const newProgress = prev?.progress ? Math.min(prev.progress + 0.3, 100) : Math.floor(Math.random() * 99);

    //       return {
    //         ...prev,
    //         progress: newProgress,
    //       } as IFlightResponseData;
    //     });
    //   }
    // }, 3000);

  }, [allFlightsData?.data, flight, selectedFlight, setUpdatedFlight]);

  return { flight, setFlight };
};

export default useCurrentFlight;