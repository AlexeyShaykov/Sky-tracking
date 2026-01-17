import { useSearchParams } from 'react-router';
import { useMemo } from 'react';

import { QUERY_PARAM_FLIGHT } from '../flight-list/flight.constants';
import { FLIGHTS } from '../flight-list/flights.data';

export const FlightDetails = () => {
  const [searchParams] = useSearchParams();
  const selectedFlight = searchParams.get(QUERY_PARAM_FLIGHT);

  const flight =  useMemo(() => FLIGHTS.find(f => f.airline === selectedFlight), [selectedFlight])

  if (!flight) {
    return <div>Please select a flight to see details.</div>;
  }

  const {
    airplane,
    airline,
    colorGradient
  } = flight;

  const {
    image,
    name,
  } = airplane;
  
  return (
    <div
      className="absolute right-7 w-sm top-7 bg-[#101010] rounded-xl"
      style={{ height: 'calc(100% - 56px)' }}
    >
     {airline}
     <div
      className="w-full h-60"
      style={{
        background: `linear-gradient(to top, ${colorGradient[0]}, ${colorGradient[1]})`,
      }}
     >
      <img 
        src={image}
        alt={name}
        className="max-w-full h-auto"
      />
     </div>
     <div>
      <img 

      />
     </div>
    </div>
  )
};