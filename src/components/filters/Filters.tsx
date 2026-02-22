import { useMemo, type Dispatch, type SetStateAction } from 'react';

import { useGetAllFlights } from '@/hooks/useGetAllFlights';

import useAppSelector from '@/hooks/useAppSelector';

import FilterWithSearch from '../custom-ui/FilterWithSearch';

const Filters = ({
  fromCountry,
  setFromCountry,
  currentlySelectedAirline,
  setCurrentlySelectedAirline,
}: {
  fromCountry: string | null;
  setFromCountry: Dispatch<SetStateAction<string | null>>;
  currentlySelectedAirline: string | null;
  setCurrentlySelectedAirline: Dispatch<SetStateAction<string | null>>;
}) => {
  const allAirports = useAppSelector((state) => state.airports.data);

  const {
    data: allFlightsData,
  } = useGetAllFlights(undefined, allAirports);

  
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
        onValueChange={setFromCountry}
        entityName="country"
      />
      <FilterWithSearch 
        data={airlines as string[]}
        selectedValue={currentlySelectedAirline}
        onValueChange={setCurrentlySelectedAirline}
        entityName="airline"
      />
    </div>
  );
};

export default Filters;
