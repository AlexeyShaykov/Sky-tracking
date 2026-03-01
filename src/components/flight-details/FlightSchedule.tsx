import type { IFlightResponseData } from '@/services/external/aviation/aviation.types';
import formatTime from '../../data/format-time';

const FlightSchedule = ({
	flight
}: {
	flight: IFlightResponseData;
}) => {
	const {
		departure,
		arrival,
	} = flight;

	const {
		scheduled: departureScheduled,
		estimated: departureActual,
	} = departure;

	const {
		scheduled: arrivalScheduled,
		estimated: arrivalEstimated,
	} = arrival;

  return (
		<div>
			<div className="grid grid-cols-2 gap-1 mb-1">
				<div className="bg-card p-mini-element flex items-center justify-between">
					<p className="text-muted-foreground">Scheduled</p>
					<p>{formatTime(departureScheduled)}</p>
				</div>
				<div className="bg-card p-mini-element flex items-center justify-between">
					<p className="text-muted-foreground">Actual</p>
					<p>{formatTime(departureActual)}</p>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-1 mb-1">
				<div className="bg-card p-mini-element flex items-center justify-between rounded-bl-xl">
					<p className="text-muted-foreground">Scheduled</p>
					<p>{formatTime(arrivalScheduled)}</p>
				</div>
				<div className="bg-card p-mini-element flex items-center justify-between rounded-br-xl">
					<p className="text-muted-foreground">Estimated</p>
					<p>{formatTime(arrivalEstimated)}</p>
				</div>
			</div>
		</div>
	)
};

export default FlightSchedule;