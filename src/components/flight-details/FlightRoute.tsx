import { Plane } from 'lucide-react'

import type { IFlightResponseData } from '@/services/external/aviation/aviation.types';
import getUTCOffsetTimeZone from './getUTCOffsetTimeZone';

const FlightRoute = ({
  flight
}: {
  flight: IFlightResponseData
}) => {
  const {
    departure: from,
    arrival: to,
  } = flight;

  const {
    iata: fromCode,
    municipality: fromCity,
    timezone: fromTimezone
  } = from;
  
  const {
    iata: toCode,
    municipality: toCity,
    timezone: toTimezone
  } = to;

  return (
		<div className="grid grid-cols-2 gap-1 mb-1 relative">
			<div className="bg-card px-element py-element rounded-tl-xl text-center">
				<h3 className="text-4xl font-semibold mb-1.5">
					{fromCode}
				</h3>
				<p className="text-foreground/80 font-medium mb-1 text-lg">
					{fromCity}
				</p>
				<p className="text-foreground/60 text-sm font-medium">
					{getUTCOffsetTimeZone(fromTimezone)}
				</p>
			</div>

			<div className="flex items-center justify-center mb-2 bg-popover rounded-full w-12 h-12 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
				<Plane
					className="text-amber-400"
					size={22}
				/>
			</div>

			<div className="bg-card px-element py-element rounded-tr-xl text-center">
				<h3 className="text-4xl font-semibold mb-1.5">
					{toCode}
				</h3>
				<p className="text-foreground/80 font-medium mb-1 text-lg">
					{toCity}
				</p>
				<p className="text-foreground/60 text-sm font-medium">
					{getUTCOffsetTimeZone(toTimezone)}
				</p>
			</div>
		</div>
	)
};

export default FlightRoute;
