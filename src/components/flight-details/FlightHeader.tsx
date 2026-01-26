import { useSearchParams } from 'react-router';

import type { IFlight } from '@/types/flights.types';

import { X } from '../animate-ui/icons/x';
import { QUERY_PARAM_FLIGHT } from '../flight-list/flight.constants';


const FlightHeader = ({ flight }: { flight: IFlight }) => {
  const { airline, id } = flight;
  const {
    name
  } = airline;

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div
      className="bg-[#1a1a1a] rounded-xl px-6 py-4 flex items-center justify-between absolute top-3.5 left-1/2 -translate-x-1/2 w-11/12 h-max"
    >
      <div>
        <h2 className="text-amber-400 text-xl font-medium">{id}</h2>
        <p className="text-gray-300 text-sm">{name}</p>
      </div>
      <button 
        className="text-gray-400 hover:text-white transition-colors rounded-full p-1 bg-neutral-700"
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
