/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllFlights } from '@/services/external/aviation/aviation.service';
import type { IFlightResponseData } from '@/services/external/aviation/aviation.types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getCurrentCoordinates } from '@/data/getCurrentCoordinates';
import type { Airport } from '@/store/airports/airports.slice';
import getRandomAircraftModel from '@/data/getRandomAircraftModel';
import {
  getCountryName,
  getISOCodeByName,
  type CountryCode,
  type CountryName,
} from '@/data/countries';
import { getTimezone } from '@/data/getTimezone';
import { MAX_PAGES } from '@/services/external/aviation/aviation.constants';

export const useGetAllFlights = (
  afterFetchCallback?: (newData: IFlightResponseData[]) => void,
  allAirports?: Record<string, Airport>,
) => {
  return useInfiniteQuery({
    queryKey: ['flights'],
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const { limit, offset, total } = lastPage.pagination;
      const nextOffset = offset + limit;

      // либо данные кончились, либо достигли лимита страниц
      if (nextOffset >= total || allPages.length >= MAX_PAGES) return undefined;

      return nextOffset;
    },
    getPreviousPageParam: (firstPage: any) => {
      const { limit, offset } = firstPage.pagination;
      return offset > 0 ? Math.max(0, offset - limit) : undefined;
    },
    queryFn: async ({ pageParam }) => {
      const result = await getAllFlights({
        flight_status: 'active',
        offset: pageParam,
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
            const departureCountryCode =
              allAirports[departure.iata]?.iso_country || departure.iata;

            const iso_country =
              allAirports[departure.iata]?.iso_country ||
              (departureCountryCode
                ? getISOCodeByName(departureCountryCode as CountryName)
                : undefined);
            newDepartureAirportIata = {
              ...departure,
              country: getCountryName(departureCountryCode as CountryCode),
              longitude: Number(
                allAirports[flight.departure.iata!]?.longitude_deg,
              ),
              latitude: Number(
                allAirports[flight.departure.iata!]?.latitude_deg,
              ),
              iso_country: iso_country,
              timezone:
                departure.timezone ||
                getTimezone(departure.timezone, iso_country),
            };
          }

          if (allAirports && arrival.iata && !arrival.country) {
            const arrivalCountryCode =
              allAirports[arrival.iata]?.iso_country || arrival.iata;

            const iso_country =
              allAirports[arrival.iata]?.iso_country ||
              (arrivalCountryCode
                ? getISOCodeByName(arrivalCountryCode as CountryName)
                : undefined);
            newArrival = {
              ...arrival,
              country: getCountryName(arrivalCountryCode as CountryCode),
              longitude: Number(allAirports[arrival.iata]?.longitude_deg),
              latitude: Number(allAirports[arrival.iata]?.latitude_deg),
              iso_country:
                allAirports[arrival.iata]?.iso_country ||
                (arrivalCountryCode
                  ? getISOCodeByName(arrivalCountryCode as CountryName)
                  : undefined),
              timezone:
                departure.timezone ||
                getTimezone(departure.timezone, iso_country),
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
              },
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
