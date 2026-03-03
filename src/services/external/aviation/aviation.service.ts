/* eslint-disable @typescript-eslint/no-unused-vars */
import shiftDatesToNow from '@/data/shiftDatesToNow';
import { API_KEY, API_URL, MOCK_DATA } from './aviation.constants';
import type { IFlightResponseData, IGetAllFlightsRequestParams, TFlightsResponse } from './aviation.types';

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

  const shifted = shiftDatesToNow(MOCK_DATA);

  return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ pagination: { limit, offset, total: shifted.data.length }, data: shifted.data });
      }, 3000);
  });

  try {
    const response = await fetch(url.toString());
    const data = await response.json();
  
    return data;
  } catch (error) {
    console.error('Error fetching flight data:', error);
    const pagination = {
      pagination: { limit: 10, offset: 0, total: MOCK_DATA.data.length }
    }
    // Fallback to static data in case of an error
    return { ...pagination, data: MOCK_DATA.data };
  }

};

export {
  getAllFlights,
};