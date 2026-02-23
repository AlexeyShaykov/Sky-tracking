export type FlightStatus =
  | 'scheduled'
  | 'active'
  | 'landed'
  | 'cancelled'
  | 'incident'
  | 'diverted';

export interface IGetAllFlightsRequestParams {
  airline?: string;
  fromCountry?: string;
  limit?: number;
  offset?: number;
  flight_status?: FlightStatus;
}

export interface IFlightResponseDepartureArrival {
  airport: string;
  timezone: string;
  iata: string;
  icao: string;
  terminal: string;
  gate: string;
  delay: number;
  scheduled: string;
  estimated: string;
  actual: string;
  estimated_runway: string;
  actual_runway: string;
  baggage?: string; // Only for departure
  country?: string | null; // Optional field for country name
  longitude?: number | null; // Optional field for airport longitude
  latitude?: number | null; // Optional field for airport latitude
}

export interface IFlightResponseAirline {
  iata: string | null;
  icao: string | null;
  name: string | null;
  logo?: string | null; // Optional field for airline logo URL
}

export interface IFlightResponseFlight {
  number: string;
  iata: string;
  icao: string;
  codeshared: Record<string, unknown>;
}

export interface IFlightResponseAircraft {
  registration: string;
  iata: string;
  icao: string;
  icao24: string;
}

export interface IFlightResponseLive {
  updated: string;
  latitude: number;
  longitude: number;
  altitude: number;
  direction: number;
  speed_horizontal: number;
  speed_vertical: number;
  is_ground: boolean;
}

export interface IFlightResponseData {
  flight_date: string;
  flight_status: FlightStatus;
  departure: IFlightResponseDepartureArrival;
  arrival: IFlightResponseDepartureArrival;
  airline: IFlightResponseAirline;
  flight: IFlightResponseFlight;
  aircraft: IFlightResponseAircraft | null;
  live: IFlightResponseLive | null;
  progress?: number; // Custom field to represent flight progress percentage (0-100)
}

export interface TFlightsResponse {
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
  data: IFlightResponseData[];
}
