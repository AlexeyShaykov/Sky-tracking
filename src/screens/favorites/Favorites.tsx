import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import type { TRootState } from '@/store';

import type { IFlightResponseData } from '@/services/external/aviation/aviation.types';

import { FlightCard } from '@/components/flight-list/FlightCard';
import Heading from '@/components/custom-ui/Heading';
import SubHeading from '@/components/custom-ui/SubHeading';
import { CenterLayout } from '@/components/CenterLayout';

import { useGetAllFlights } from '@/hooks/useGetAllFlights';

const Favorites = () => {
  const favorites = useSelector((state: TRootState) => state.favorites);

    const {
      data: allFlightsData,
    } = useGetAllFlights();

  const pagesFlightsData = useMemo(() => {
    return allFlightsData?.pages.flatMap((page) => page.data) || [];
  }, [allFlightsData]); 

  const favoritesFlights = useMemo(() => {
    if (!pagesFlightsData.length) return [];
    return pagesFlightsData
    .filter(flight => flight?.flight?.number)
    .filter(flight => favorites.includes(flight.flight.number || '')); 
  }, [pagesFlightsData, favorites]);

  return (
    <CenterLayout>
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
    </CenterLayout>
  )
};

export default Favorites;
