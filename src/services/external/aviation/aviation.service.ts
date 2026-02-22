import { API_KEY, API_URL } from './aviation.constants';
import type { IGetAllFlightsRequestParams, TFlightsResponse } from './aviation.types';

import { FLIGHTS } from '@/components/flight-list/flights.data';

const getAllFlights = async ({
  airline,
  fromCountry,
  limit = 20,
  offset = 0,
  flight_status,
}: IGetAllFlightsRequestParams): Promise<TFlightsResponse> => {
  const url = new URL(API_URL);
  url.searchParams.append('access_key', API_KEY);
  
  if (airline) url.searchParams.append('airline_iata', airline);
  if (fromCountry) url.searchParams.append('country_iso2', fromCountry);
  if (flight_status) url.searchParams.append('flight_status', flight_status);
  url.searchParams.append('limit', limit.toString());
  url.searchParams.append('offset', offset.toString());

  return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ pagination: { limit, offset, total: FLIGHTS.length }, data: FLIGHTS });
      }, 3000);
  });

  try {
    const response = await fetch(url.toString());
    const data = await response.json();
  
    return data;
  } catch (error) {
    console.error('Error fetching flight data:', error);
    const pagination = {
      pagination: { limit: 10, offset: 0, total: FLIGHTS.length }
    }
    // Fallback to static data in case of an error
    return { ...pagination, data: FLIGHTS };
  }

};

export {
  getAllFlights,
};