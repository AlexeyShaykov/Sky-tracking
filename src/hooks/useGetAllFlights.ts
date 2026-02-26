import { getAllFlights } from '@/services/external/aviation/aviation.service';
import type { IFlightResponseData } from '@/services/external/aviation/aviation.types';
import { useQuery } from '@tanstack/react-query';
import {
  getCurrentCoordinates,
  ISO_COUNTRIES,
} from '@/components/flight-list/flights.data';
import type { Airport } from '@/store/airports/airports.slice';
import getRandomAircraftModel from '@/components/flight-details/getRandomAircraftModel';

export const useGetAllFlights = (
  afterFetchCallback?: (newData: IFlightResponseData[]) => void,
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
          const { aircraft, departure, arrival, airline } = flight;
          const { registration: aircraftReg, icao24: aircraftIcao24 } =
            aircraft || {};

          let newDepartureAirportIata = departure;
          let live = flight.live;
          let newArrival = arrival;
          const progress = flight.progress || Math.floor(Math.random() * 99);

          if (allAirports && departure.iata && !departure.country) {
            newDepartureAirportIata = {
              ...departure,
              country:
                ISO_COUNTRIES[
                  allAirports[flight.departure.iata]?.iso_country
                ] || flight.departure.iata,
              longitude: Number(
                allAirports[flight.departure.iata]?.longitude_deg,
              ),
              latitude: Number(
                allAirports[flight.departure.iata]?.latitude_deg,
              ),
            };
          }

          if (allAirports && arrival.iata && !arrival.country) {
            newArrival = {
              ...arrival,
              country:
                ISO_COUNTRIES[allAirports[arrival.iata]?.iso_country] ||
                arrival.iata,
              longitude: Number(allAirports[arrival.iata]?.longitude_deg),
              latitude: Number(allAirports[arrival.iata]?.latitude_deg),
              iso_country: allAirports[arrival.iata]?.iso_country || null,
            };
          }

          if (allAirports && !departure.municipality && departure.iata) {
            newDepartureAirportIata = {
              ...newDepartureAirportIata,
              municipality: allAirports[departure.iata]?.municipality,
            };
          }

          if (allAirports && !arrival.municipality && arrival.iata) {
            newArrival = {
              ...newArrival,
              municipality: allAirports[arrival.iata]?.municipality,
            };
          }

          if (
            !live &&
            newDepartureAirportIata.latitude &&
            newDepartureAirportIata.longitude &&
            newArrival.latitude &&
            newArrival.longitude
          ) {
            live = {
              updated: new Date().toISOString(),
              altitude: Math.floor(Math.random() * 40000) + 1000, // Random altitude between 1,000 and 40,000 feet
              direction: Math.floor(Math.random() * 360), // Random direction
              speed_horizontal: Math.floor(Math.random() * 900) + 100, // Random speed between 100 and 1000 km/h
              speed_vertical: 0, // Assuming level flight
              is_ground: false,
              ...getCurrentCoordinates(
                [
                  newDepartureAirportIata.latitude,
                  newDepartureAirportIata.longitude,
                ],
                [newArrival.latitude, newArrival.longitude],
                progress,
              ),
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
              arrival: newArrival,
              live,
              progress,
              airline: {
                ...airline,
                aircraft_model: getRandomAircraftModel(), // Assigning a random aircraft model for demonstration
              }
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
