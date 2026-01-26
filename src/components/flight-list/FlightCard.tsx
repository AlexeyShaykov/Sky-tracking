import { useSearchParams } from 'react-router';

import type { IFlight } from '@/types/flights.types';
import { cn } from '@/utils/cn';

import { QUERY_PARAM_FLIGHT } from './flight.constants';

export const FlightCard = ({ flight }: { flight: IFlight }) => {
  const { logo, id, from, to, aircraftReg } = flight;

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedFlight = searchParams.get(QUERY_PARAM_FLIGHT);
  
  const isSelected = selectedFlight === id;

  const { city: fromCity, code: fromCode } = from;
  const { city: toCity, code: toCode } = to;

  return (
    <div
      className={cn(
        'w-full rounded-lg p-0.5 transition-colors ease-in',
        isSelected
          ? 'bg-linear-to-r from-rose-500 to-orange-400 '
          : 'bg-transparent'
      )}
    >
      <button
        className={cn(
          'bg-neutral-900 rounded-lg p-5 block w-full',
        )}
        onClick={() => {
          setSearchParams({ [QUERY_PARAM_FLIGHT]: id });
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt={id}
              width={40}
              height={40}
              className="rounded-full bg-white"
            />
            <span>{id}</span>
          </div>
          <div>
            <span className="bg-neutral-500 rounded-xl px-2 py-1">
              {aircraftReg}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div>{fromCity}</div>
            <div className="font-semibold text-3xl">{fromCode}</div>
          </div>

          <div>{/* progressbar */}</div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div>{toCity}</div>
              <div className="font-semibold text-3xl">{toCode}</div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};
