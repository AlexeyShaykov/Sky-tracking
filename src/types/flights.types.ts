export interface ILocation {
  city: string;
  country: string;
  countryCode: string;
  timezone: string;
  code: string;
}

export interface IAirplane {
  image: string;
  name: string;
}

export interface IRoute {
  speed: number; // in km/h
  altitude: number; // in meters
}

export interface IFlightAirline {
  name: string;
  country: string;
} 

export interface IFlight {
  id: string;
  logo: string;
  airline: IFlightAirline;
  aircraftReg: string;
  from: ILocation;
  to: ILocation;
  airplane: IAirplane;
  colorGradient: string[];
  route: IRoute;
}