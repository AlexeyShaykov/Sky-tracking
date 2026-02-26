import { useSearchParams } from 'react-router';


import type { IFlightResponseData } from '@/services/external/opensky/opensky.types';

import { X } from '../animate-ui/icons/x';
import { QUERY_PARAM_FLIGHT } from '../flight-list/flight.constants';


const FlightHeader = ({ flight }: { flight: IFlightResponseData }) => {
  const { flight: flightInfo, airline } = flight;
  const {
    number: id
  } = flightInfo;

  const {
    name
  } = airline;


  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div
      className="bg-card rounded-xl px-6 py-4 flex items-center justify-between absolute top-3.5 left-1/2 -translate-x-1/2 w-11/12 h-max"
    >
      <div>
        <h2 className="text-amber-400 text-xl font-medium">{id}</h2>
        <p className="text-foreground/60 text-sm">{name}</p>
      </div>
      <button 
        className="text-foreground/60 hover:text-foreground transition-colors rounded-full p-1 bg-popover"
        onClick={() => {
          searchParams.delete(QUERY_PARAM_FLIGHT);
          setSearchParams(searchParams); 
        }}
      >
        <X animateOnHover size={20} />
      </button>
    </div>
  )
};

export default FlightHeader;
