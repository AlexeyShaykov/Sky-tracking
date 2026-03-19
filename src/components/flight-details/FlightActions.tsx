import { Calendar, Route } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';

import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';

import { toggleShowRoute } from '@/store/flight-actions/flight-action.slice';
import type { IFlightResponseData } from '@/services/external/aviation/aviation.types';
import formatIscDate from '@/utils/format-isc-date';

import { MapPin } from '../animate-ui/icons/map-pin';
import { SquareArrowOutUpRight } from '../animate-ui/icons/square-arrow-out-up-right';
import { QUERY_PARAM_FLIGHT } from '../flight-list/flight.constants';

const FlightActions = ({
  onFollow,
  flight,
}: {
  onFollow: () => void;
  flight: NonNullable<IFlightResponseData>;
}) => {
   const { flight: flightInfo, departure, arrival } = flight;
  const {
    number: id,
  } = flightInfo;

  const dispatch = useAppDispatch();
  const isShowRoute = useAppSelector(
    (state) => state.flightActions.isShowRoute,
  );

  const onRoute = () => {
    dispatch(toggleShowRoute(!isShowRoute));
  };

  const onShare = async () => {
    const URL = `${window.location.origin}/${window.location.pathname}?${QUERY_PARAM_FLIGHT}=${id}`;

    try {
      await navigator.clipboard.writeText(URL);

      toast.success('Flight URL copied to clipboard!', {
        description: 'You can now share it with others.',
      });
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const onAddToCalendar = () => {
    if (!flight) return;
    if (!departure || !arrival) {
      toast.error('Flight schedule information is missing.', {
        description: 'Unable to add to calendar.',
      });
      return;
    }
    const start = new Date(departure.scheduled!);
    const end = new Date(arrival.scheduled!);

   const startISC = formatIscDate(start.toISOString());
   const endISC = formatIscDate(end.toISOString());

   const iscContent = `
BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:Flight ${flightInfo.number} from ${departure.icao} to ${arrival.icao}
DTSTART:${startISC}
DTEND:${endISC}
DESCRIPTION:Airline: ${flight.airline?.name || 'N/A'}\\
END:VEVENT
END:VCALENDAR
   `.trim();

    const blob = new Blob([iscContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `flight-${flightInfo.number}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success('Flight added to calendar!', {
      description: 'The flight schedule has been added to your calendar.',
    });
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-1">
        <button
          onClick={onRoute}
          className={cn(
            'flex flex-col items-center gap-2 bg-card px-mini-element py-mini-element rounded-tl-2xl rounded-bl-2xl transition-colors hover:bg-card/60',
            { 'bg-[#ddd] dark:bg-[#282828] hover:bg-[#ddd]/70 dark:hover:bg-[#282828]/70': isShowRoute },
          )}
        >
          <Route size={22} />
          <span>Route</span>
        </button>
        <button
          onClick={onFollow}
          className="flex flex-col items-center gap-2 bg-card px-mini-element py-mini-element transition-colors hover:bg-card/60"
        >
          <MapPin
            animateOnHover
            size={22}
          />
          <span>Follow</span>
        </button>
        <button
          onClick={onShare}
          className="flex flex-col items-center gap-2 bg-card px-mini-element py-mini-element transition-colors hover:bg-card/60"
        >
          <SquareArrowOutUpRight
            animateOnHover
            size={22}
          />
          <span>Share</span>
        </button>
        <button
          onClick={onAddToCalendar}
          className="flex flex-col items-center gap-2 bg-card px-mini-element py-mini-element rounded-tr-2xl rounded-br-2xl transition-colors hover:bg-card/60"
        >
          <Calendar size={22} />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};

export default FlightActions;
