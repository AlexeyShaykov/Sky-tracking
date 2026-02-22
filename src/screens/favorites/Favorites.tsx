import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import type { TRootState } from '@/store';

import { FlightCard } from '@/components/flight-list/FlightCard';
import Heading from '@/components/custom-ui/Heading';
import SubHeading from '@/components/custom-ui/SubHeading';
import { useGetAllFlights } from '@/hooks/useGetAllFlights';
import type { IFlightResponseData } from '@/services/external/opensky/opensky.types';

const Favorites = () => {
  const favorites = useSelector((state: TRootState) => state.favorites);

    const {
      data: allFlightsData,
    } = useGetAllFlights();

  const favoritesFlights = useMemo(() => {
    if (!allFlightsData?.data) return [];
    return allFlightsData?.data.filter(flight => favorites.includes(flight.flight.number)); 
  }, [allFlightsData?.data, favorites]);
  return (
    <div
      className="w-4/12 mx-auto"
    >
      <Heading>Favorites</Heading>
      <SubHeading>Here you can find all your favorite flights</SubHeading>
      <div className="grid grid-cols-2 gap-4">
        {favoritesFlights.map((flight: IFlightResponseData) => {
          return (
            <FlightCard
              flight={flight}
              key={flight.flight.number}
            />
          );
        })}
      </div>
    </div>
  )
};

export default Favorites;
