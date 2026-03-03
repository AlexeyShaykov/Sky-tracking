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
  airport: string | null;
  timezone: string | null;
  iata: string | null;
  icao: string | null;
  terminal: string | null;
  gate: string | null;
  delay: number | null;
  scheduled: string | null;
  estimated: string | null;
  actual: string | null;
  estimated_runway: string | null;
  actual_runway: string | null;
  baggage?: string | null;
  country?: string | null;
  longitude?: number | null;
  latitude?: number | null;
  municipality?: string | null;
  iso_country?: string | null;
}

export interface IFlightResponseAirline {
  iata: string | null;
  icao: string | null;
  name: string | null;
  logo?: string | null; // Optional field for airline logo URL
  aircraft_model?: string | null; // Optional field for list of aircraft models used by the airline
}

export interface IFlightResponseFlight {
  number: string | null;
  iata: string | null;
  icao: string | null;
  codeshared: Record<string, unknown> | null;
}

export interface IFlightResponseAircraft {
  registration: string | null;
  iata: string | null;
  icao: string | null;
  icao24: string | null;
  photo?: string | null; // Optional field for aircraft photo URL
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
