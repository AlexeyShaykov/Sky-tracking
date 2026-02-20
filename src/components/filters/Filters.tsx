import { useMemo, type Dispatch, type SetStateAction } from 'react';

import { FLIGHTS } from '../flight-list/flights.data';
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
  const fromCountries = useMemo(() => {
    if (!currentlySelectedAirline) {
      return [...new Set(FLIGHTS.map((flight) => flight.from.country))];
    }
    const filteredFlights = FLIGHTS.filter((flight) => flight.airline.name === currentlySelectedAirline);

    return [...new Set(filteredFlights.map((flight) => flight.from.country))];
  }, [currentlySelectedAirline]);

  const airlines = useMemo(() => {
    if (!fromCountry) {
      return [...new Set(FLIGHTS.map((flight) => flight.airline.name))];
    }
    const filteredFlights = FLIGHTS.filter((flight) => flight.from.country === fromCountry);

    return [...new Set(filteredFlights.map((flight) => flight.airline.name))];
  }, [fromCountry]);

  return (
    <div className="ml-1 flex items-center justify-between">
      <FilterWithSearch 
        data={fromCountries}
        selectedValue={fromCountry}
        onValueChange={setFromCountry}
        entityName="country"
      />
      <FilterWithSearch 
        data={airlines}
        selectedValue={currentlySelectedAirline}
        onValueChange={setCurrentlySelectedAirline}
        entityName="airline"
      />
    </div>
  );
};

export default Filters;
