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

  
  const fromCountries = useMemo(() => {
    if (!allFlightsData) return [];
    
    if (!currentlySelectedAirline && allFlightsData) {
      return [...new Set(allFlightsData.data.map((flight) => flight.departure.country).filter(Boolean))];
    }
    const filteredFlights = allFlightsData.data.filter((flight) => flight.airline.name === currentlySelectedAirline);

    return [...new Set(filteredFlights.map((flight) => flight.departure.country).filter(Boolean))];
  }, [currentlySelectedAirline, allFlightsData]);

  const airlines = useMemo(() => {
    if (!allFlightsData) return [];

    if (!fromCountry) {
      return [...new Set(allFlightsData.data.map((flight) => flight.airline.name))];
    }
    const filteredFlights = allFlightsData.data.filter((flight) => flight.departure.airport === fromCountry);

    return [...new Set(filteredFlights.map((flight) => flight.airline.name).filter(Boolean))];
  }, [fromCountry, allFlightsData]);

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
