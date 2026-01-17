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

export interface IFlight {
  logo: string;
  airline: string;
  aircraftReg: string;
  from: ILocation;
  to: ILocation;
  airplane: IAirplane;
  colorGradient: string[];
  route: IRoute;
}