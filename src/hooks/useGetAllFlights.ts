import { getAllFlights } from '@/services/external/aviation/aviation.service';
import type { IFlightResponseData } from '@/services/external/aviation/aviation.types';
import { useQuery } from '@tanstack/react-query';
import { ISO_COUNTRIES } from '@/components/flight-list/flights.data';
import type { Airport } from '@/store/airports/airports.slice';

export const useGetAllFlights = (
  afterFetchCallback?: (
    newData: IFlightResponseData[],
  ) => void,
  allAirports?: Record<string, Airport>,
) => {
  return useQuery({
    queryKey: ['flights', null, null],
    queryFn: async () => {
      const result = await getAllFlights({
        flight_status: 'active',
      });

      const addedAircraftRegOrIcao24 = new Set<string>();

      const newData = result.data.reduce(
        (acc: IFlightResponseData[], flight: IFlightResponseData) => {
          const { aircraft, departure } = flight;
          const { registration: aircraftReg, icao24: aircraftIcao24 } =
            aircraft || {};

          let newDepartureAirportIata = departure;

          if (allAirports) {
            newDepartureAirportIata = {
              ...departure,
              country:
                ISO_COUNTRIES[
                  allAirports[flight.departure.iata]?.iso_country
                ] || flight.departure.iata,
            };
          }

          if (aircraftReg || aircraftIcao24) {
            if (
              addedAircraftRegOrIcao24.has(aircraftReg || aircraftIcao24 || '')
            ) {
              return acc;
            }
            addedAircraftRegOrIcao24.add(aircraftReg || aircraftIcao24 || '');
          }

          if (flight.flight.number) {
            acc.push({
              ...flight,
              departure: newDepartureAirportIata,
              progress: flight.progress || Math.floor(Math.random() * 99), // Assign a random progress percentage for demonstration
            });
          }
          return acc;
        },
        [] as IFlightResponseData[],
      );

      afterFetchCallback?.(newData);

      return {
        ...result,
        data: newData,
      };
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  });
};
