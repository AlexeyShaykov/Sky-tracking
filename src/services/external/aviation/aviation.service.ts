import { API_KEY, API_URL } from './aviation.constants';
import type { IGetAllFlightsRequestParams, TFlightsResponse } from './aviation.types';

const getAllFlights = async ({
  airline,
  fromCountry,
  limit = 10,
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

  const response = await fetch(url.toString());
  const data = await response.json();

  return data;
};

export {
  getAllFlights,
};