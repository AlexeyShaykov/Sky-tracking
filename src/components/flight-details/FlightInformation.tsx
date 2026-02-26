import type { IFlightResponseData } from '@/services/external/aviation/aviation.types';

import getRandomAircraftModel from './getRandomAircraftModel';

const FlightInformation = ({ flight }: { flight: IFlightResponseData }) => {
   const {
    departure,
    live,
    airline,
  } = flight;

  const {
    country = 'N/A',
    iata,
    iso_country,
  } = departure;

  const {
    altitude,
    speed_horizontal,
  } = live || {};

  const {
    aircraft_model
  } = airline || {};


  return (
    <div className="my-3.5">
      <div className="font-medium mb-1 bg-[#ddd] dark:bg-[#282828] px-mini-element py-mini-element rounded-tl-xl rounded-tr-xl">
        Flight information
      </div>
      <div className="grid grid-cols-2 gap-1 mb-1">
        <div className="bg-card px-mini-element py-mini-element flex items-center justify-between">
          <p>{aircraft_model || getRandomAircraftModel()}</p>
        </div>
        <div className="bg-card px-mini-element py-mini-element flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={`https://flagcdn.com/24x18/${(iso_country as string).toLowerCase()}.png`}
              alt={iata}
              width={24}
              height={18}
              className="inline-block mr-1"
            />
            <span>{country}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1 mb-1">
        <div className="bg-card px-mini-element py-mini-element flex items-center justify-between rounded-bl-xl">
          <p className="text-muted-foreground">Speed</p>
          <p>{speed_horizontal ? `${speed_horizontal} km/h` : 'N/A'}</p>
        </div>
        <div className="bg-card px-mini-element py-mini-element flex items-center justify-between rounded-br-xl">
          <p className="text-muted-foreground">Altitude</p>
          <p>{altitude ? `${altitude} m` : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default FlightInformation;
