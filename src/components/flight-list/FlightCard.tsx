import { useSearchParams } from 'react-router';
import { Plane } from 'lucide-react';

import type { IFlightResponseData } from '@/services/external/aviation/aviation.types';
import { cn } from '@/utils/cn';

import { QUERY_PARAM_FLIGHT } from './flight.constants';
import FlightCardActions from './actions/FlightCardActions';
import ProgressBar from '../custom-ui/ProgressBar';
import useAppSelector from '@/hooks/useAppSelector';

export const FlightCard = ({ flight }: { flight: IFlightResponseData }) => {
  const {
    flight: flightInfo,
    departure,
    arrival,
    airline,
    aircraft,
    // live,
    progress = 75
  } = flight;

  const { number: id } = flightInfo || {};

  const { icao: fromCode, iata: fromIata = '' } = departure || {};

  const { icao: toCode, iata: toIata = '' } = arrival || {};

  const { registration: aircraftReg, icao24: aircraftIcao24 } = aircraft || {};

  const { iata: airlineIata } = airline || {};

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedFlight = searchParams.get(QUERY_PARAM_FLIGHT);

  const isSelected = selectedFlight && selectedFlight === id;

  const { municipality: fromCity } = useAppSelector(
    (state) => state.airports.data[fromIata],
  ) || {};

  const { municipality: toCity } = useAppSelector(
    (state) => state.airports.data[toIata],
  ) || {};

  const logo = airlineIata
    ? `https://content.airhex.com/content/logos/airlines_${airlineIata}_200_200_s.png`
    : '/logos/swiss.svg';

  return (
    <div
      className={cn(
        'w-full rounded-lg p-0.5 transition-colors ease-in relative group animate-fade-in shadow-xl',
        isSelected
          ? 'bg-linear-to-r from-rose-500 to-orange-400'
          : 'bg-transparent',
      )}
    >
      <FlightCardActions flightId={id} />
      <button
        className={cn('bg-flight-card rounded-lg p-4  block w-full')}
        onClick={() => {
          setSearchParams({ [QUERY_PARAM_FLIGHT]: id });
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            {airlineIata ? (
              <img
                src={logo}
                alt={id}
                width={40}
                height={40}
                className="rounded-full bg-white"
              />
            ) : (
              <Plane
                size={40}
                className="rounded-full bg-white p-1 fill-black"
              />
            )}

            <span>{id}</span>
          </div>
          <div>
            <span className="bg-card rounded-xl px-2 py-1">
              {aircraftReg || aircraftIcao24}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-[auto_1fr_auto] gap-5 items-center">
          <div className="space-y-0.5 text-left max-w-18">
            <div className="whitespace-nowrap overflow-hidden text-ellipsis max-w-25 text-left">{fromCity}</div>
            <div className="font-semibold text-3xl">{fromCode}</div>
          </div>

          <ProgressBar progress={progress} />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5 max-w-18 text-left">
              <div className="whitespace-nowrap overflow-hidden text-ellipsis max-w-25 text-left">{toCity}</div>
              <div className="font-semibold text-3xl">{toCode}</div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};
