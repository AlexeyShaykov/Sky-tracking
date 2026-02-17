import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { QUERY_PARAM_FLIGHT } from '@/components/flight-list/flight.constants';
import { FLIGHTS } from '@/components/flight-list/flights.data';

const useCurrentFlight = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedFlight = searchParams.get(QUERY_PARAM_FLIGHT);

  const setFlight = (flightId: string) => {
   setSearchParams({ [QUERY_PARAM_FLIGHT]: flightId });
  };

  const flight = useMemo(
    () => FLIGHTS.find((f) => f.id === selectedFlight),
    [selectedFlight],
  );

  return { flight, setFlight };
};

export default useCurrentFlight;