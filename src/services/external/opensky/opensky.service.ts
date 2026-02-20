import { API_CLIENT_ID, API_URL, API_CLIENT_SECRET } from './opensky.constants';
// import type { IGetAllFlightsRequestParams, TFlightsResponse } from './opensky.types';

const getClientToken = async () => {
  const response = fetch('https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: API_CLIENT_ID,
      client_secret: API_CLIENT_SECRET,
    }),
  });

  return response.then(res => res.json()).then(data => {
    console.log('OpenSky Client Token:', data.access_token);
    return data.access_token;
  });
};

// https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token

// const getAllFlights = async ({
//   airline,
//   fromCountry,
//   limit = 10,
//   offset = 0,
//   flight_status,
// }: IGetAllFlightsRequestParams): Promise<TFlightsResponse> => {
//   const url = new URL(API_URL);
//   url.searchParams.append('access_key', API_KEY);
  
//   if (airline) url.searchParams.append('airline_iata', airline);
//   if (fromCountry) url.searchParams.append('country_iso2', fromCountry);
//   if (flight_status) url.searchParams.append('flight_status', flight_status);
//   url.searchParams.append('limit', limit.toString());
//   url.searchParams.append('offset', offset.toString());

//   const response = await fetch(url.toString());
//   const data = await response.json();

//   return data;
// };

export {
  getClientToken,
};