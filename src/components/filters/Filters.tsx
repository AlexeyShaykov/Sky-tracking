import { useMemo } from 'react';

import { useGetAllFlights } from '@/hooks/useGetAllFlights';

import useAppSelector from '@/hooks/useAppSelector';

import FilterWithSearch from '../custom-ui/FilterWithSearch';

const Filters = ({
  fromCountry,
  setSelectedFromCountry,
  currentlySelectedAirline,
  setCurrentlySelectedAirline,
}: {
  fromCountry: string | null;
  setSelectedFromCountry: (value: string | null) => void;
  currentlySelectedAirline: string | null;
  setCurrentlySelectedAirline: (value: string | null) => void;
}) => {
  const allAirports = useAppSelector((state) => state.airports.data);

  const {
    data: allFlightsData,
  } = useGetAllFlights((undefined), allAirports);

  const pagesFlightsData = useMemo(() => {
    return allFlightsData?.pages.flatMap((page) => page.data) || [];
  }, [allFlightsData]); 

  
  const fromCountries = useMemo(() => {
    if (!pagesFlightsData.length) return [];
    
    if (!currentlySelectedAirline && pagesFlightsData.length) {
      return [...new Set(pagesFlightsData.map((flight) => flight.departure.country).filter(Boolean))];
    }
    const filteredFlights = pagesFlightsData.filter((flight) => flight.airline.name === currentlySelectedAirline);

    return [...new Set(filteredFlights.map((flight) => flight.departure.country).filter(Boolean))];
  }, [currentlySelectedAirline, pagesFlightsData]);

  const airlines = useMemo(() => {
    if (!pagesFlightsData.length) return [];

    if (!fromCountry) {
      return [...new Set(pagesFlightsData.map((flight) => flight.airline.name))];
    }
    const filteredFlights = pagesFlightsData.filter((flight) => flight.departure.airport === fromCountry);

    return [...new Set(filteredFlights.map((flight) => flight.airline.name).filter(Boolean))];
  }, [fromCountry, pagesFlightsData]);

  return (
    <div className="ml-1 flex items-center justify-between">
      <FilterWithSearch 
        data={fromCountries as string[]}
        selectedValue={fromCountry}
        onValueChange={(value: string | null) => {
          setSelectedFromCountry(value);
        }}
        entityName="country"
      />
      <FilterWithSearch 
        data={airlines as string[]}
        selectedValue={currentlySelectedAirline}
        onValueChange={(value: string | null) => {
          setCurrentlySelectedAirline(value);
        }}
        entityName="airline"
      />
    </div>
  );
};

export default Filters;
