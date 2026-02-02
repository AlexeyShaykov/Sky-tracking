import { useMemo, type Dispatch, type SetStateAction } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { FLIGHTS } from '../flight-list/flights.data';

const Filters = ({
  fromCountry,
  setFromCountry,
}: {
  fromCountry: string | null;
  setFromCountry: Dispatch<SetStateAction<string | null>>;
}) => {
  const fromCountries = useMemo(() => {
    return [...new Set(FLIGHTS.map((flight) => flight.from.country))];
  }, []);

  return (
    <div className="mb-4  ml-1">
      <Select
        onValueChange={(value) =>
          setFromCountry(value === 'all' ? null : value)
        }
        defaultValue={fromCountry || undefined}
        value={fromCountry || ''}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose from" />
        </SelectTrigger>
        <SelectContent
          side="bottom"
          position="popper"
        >
          <SelectItem value="all">All Countries</SelectItem>
          {fromCountries.map((country) => (
            <SelectItem
              key={country}
              value={country}
            >
              {country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filters;
