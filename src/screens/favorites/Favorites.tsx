import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import type { TRootState } from '@/store';
import type { IFlight } from '@/types/flights.types';

import { FLIGHTS } from '@/components/flight-list/flights.data';
import { FlightCard } from '@/components/flight-list/FlightCard';
import Heading from '@/components/custom-ui/Heading';
import SubHeading from '@/components/custom-ui/SubHeading';

const Favorites = () => {
  const favorites = useSelector((state: TRootState) => state.favorites);

  const favoritesFlights = useMemo((): IFlight[] => {
    return FLIGHTS.filter(flight => favorites.includes(flight.id)); 
  }, [favorites]);

  return (
    <div
      className="w-4/12 mx-auto"
    >
      <Heading>Favorites</Heading>
      <SubHeading>Here you can find all your favorite flights</SubHeading>
      <div className="grid grid-cols-2 gap-4">
        {favoritesFlights.map((flight: IFlight) => {
          return (
            <FlightCard
              flight={flight}
              key={flight.id}
            />
          );
        })}
      </div>
    </div>
  )
};

export default Favorites;
