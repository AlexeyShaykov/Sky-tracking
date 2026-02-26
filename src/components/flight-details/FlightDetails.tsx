import { AnimatePresence, m } from 'framer-motion';

import FlightHeader from './FlightHeader';
import FlightImage from './FlightImage';
import FlightInformation from './FlightInformation';
import FlightRoute from './FlightRoute';
import FlightStatus from './FlightStatus';
import FlightSchedule from './FlightSchedule';
import FlightActions from './FlightActions';
import useCurrentFlight from '@/hooks/useCurrentFlight';

export const FlightDetails = () => {
  const {
    flight
  } = useCurrentFlight();

  if (!flight) {
    return null;
  }

  const {
    flight: flightInfo,
    progress = 50,
  } = flight;

  const {
    number: id,
  } = flightInfo;


  return (
    <AnimatePresence mode="wait">
      <m.aside
        key={id}
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '100%'  }}
        transition={{
          type: 'tween',
          duration: 0.3
        }}
        className="xs:w-full xs:top-0 xs:left-0 xs:rounded-none xs:h-screen xs:translate-x-0
        sm:inset-2.5 sm:top-0 sm:w-11/12 sm:left-1/2 sm:-translate-x-1/2
        md:w-xs md:top-28
        absolute right-7 w-sm top-7  bg-flight-card rounded-xl overflow-hidden z-10 shadow-xl"
      >
        <FlightHeader flight={flight} />
        <FlightImage />

        <div className="p-3.5">
          <FlightRoute flight={flight} />
          <FlightStatus progress={progress} />
          <FlightSchedule flight={flight} />

          <FlightInformation flight={flight} />

          <FlightActions
            onRoute={() => {}}
            onFollow={() => {}}
            onShare={() => {}}
            onMore={() => {}}
          />
        </div>
      </m.aside>
    </AnimatePresence>
  );
};
