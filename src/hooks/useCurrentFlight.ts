import { useSearchParams } from 'react-router';

import { QUERY_PARAM_FLIGHT } from '@/components/flight-list/flight.constants';
import type { IFlightResponseData } from '@/services/external/aviation/aviation.types';
import { useGetAllFlights } from './useGetAllFlights';
import { useMemo } from 'react';
import useAppSelector from './useAppSelector';

const useCurrentFlight = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedFlight = searchParams.get(QUERY_PARAM_FLIGHT);
  const allAirports = useAppSelector((state) => state.airports.data);

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

  const flight = useMemo(
    () => {
      if (!allFlightsData || !allFlightsData.data || !selectedFlight) return null;

      return allFlightsData?.data.find((f: IFlightResponseData) => f.flight.number === selectedFlight);
    },
    [allFlightsData, selectedFlight],
  );

  return { flight, setFlight, removeSearchParam };
};

export default useCurrentFlight;