type FlightStatus =
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
}

export interface IFlightResponseAirline {
  iata: string | null;
  icao: string | null;
  name: string | null;
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
}

export interface TFlightsResponse {
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
  data: IFlightResponseData[];
}
