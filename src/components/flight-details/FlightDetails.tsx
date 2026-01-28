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
      className="absolute right-7 w-sm top-1/2 -translate-y-1/2 bg-[#101010] rounded-xl overflow-hidden"
      // style={{ height: 'calc(100% - 56px)' }}
    >
     <FlightHeader flight={flight} />
     <FlightImage flight={flight} />

     <div
      className="p-3.5"
     >
      <FlightRoute flight={flight} />
      <FlightStatus />
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