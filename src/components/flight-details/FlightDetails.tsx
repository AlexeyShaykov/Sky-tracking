import { useSearchParams } from 'react-router';
import { useMemo } from 'react';

import { QUERY_PARAM_FLIGHT } from '../flight-list/flight.constants';
import { FLIGHTS } from '../flight-list/flights.data';
import FlightHeader from './FlightHeader';
import FlightImage from './FlightImage';
import FlightInformation from './FlightInformation';
import FlightRoute from './FlightRoute';
import FlightStatus from './FlightStatus';
import FlightSchedule from './FlightSchedule';
import FlightActions from './FlightActions';

export const FlightDetails = () => {
  const [searchParams] = useSearchParams();
  const selectedFlight = searchParams.get(QUERY_PARAM_FLIGHT);

  const flight =  useMemo(() => FLIGHTS.find(f => f.id === selectedFlight), [selectedFlight])

  if (!flight) {
    return null;
  }
  
  return (
    <div
      className="xs:w-full xs:top-0 xs:left-0 xs:rounded-none xs:h-screen xs:translate-x-0
      sm:inset-2.5 sm:top-0 sm:w-11/12 sm:left-1/2 sm:-translate-x-1/2
      md:w-xs md:top-28
      absolute right-7 w-sm top-7  bg-[#101010] rounded-xl overflow-hidden"
    >
     <FlightHeader flight={flight} />
     <FlightImage flight={flight} />

     <div
      className="p-3.5"
     >
      <FlightRoute flight={flight} />
      <FlightStatus progress={flight.progress} />
      <FlightSchedule />
      
      <FlightInformation flight={flight} />

      <FlightActions 
        onRoute={() => {}}
        onFollow={() => {}}
        onShare={() => {}}
        onMore={() => {}}
      />
     </div>

    </div>
  )
};