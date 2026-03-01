/* eslint-disable react-hooks/refs */
/* eslint-disable react-hooks/set-state-in-effect */
import type {
  IFlightResponseData,
  IFlightResponseLive,
} from '@/services/external/aviation/aviation.types';
import { useMemo, useRef } from 'react';

import ProgressBar from '../custom-ui/ProgressBar';
import { getFlightProgress } from '@/data/getFlightProgress';

const FlightStatus = ({
  progress,
  flight,
}: {
  progress: number;
  flight: IFlightResponseData;
}) => {
  const { departure, arrival, live } = flight;

  const { latitude, longitude } = live as IFlightResponseLive;

	const prevRemainingData = useRef({
		remainingKmRef: 0,
		remainingTimeRef: '',
	});

	const {
		latitude: depLatitude,
		longitude: depLongitude,
		scheduled: scheduledDeparture,
	} = departure || {};

	const {
		latitude: arrLatitude,
		longitude: arrLongitude,
		scheduled: scheduledArrival,
	} = arrival || {};

  const { flownKm, remainingKm, flownTime, remainingTime } = useMemo((): ReturnType<typeof getFlightProgress> => {
    const data = getFlightProgress(
      {
        latitude: depLatitude!,
        longitude: depLongitude!,
      },
      {
        latitude: arrLatitude!,
        longitude: arrLongitude!,
      },
      {
        latitude: latitude,
        longitude: longitude,
      },
      scheduledDeparture!,
      scheduledArrival!,
    );

		if (prevRemainingData.current.remainingKmRef === 0 && prevRemainingData.current.remainingTimeRef === '') {
			prevRemainingData.current = {
				remainingKmRef: data.remainingKm,
				remainingTimeRef: data.remainingTime,
			};
		}

		if (data.remainingKm > prevRemainingData.current.remainingKmRef || data.remainingTime > prevRemainingData.current.remainingTimeRef) {
			return {
				flownKm: data.flownKm,
				remainingKm: prevRemainingData.current.remainingKmRef,
				flownTime: data.flownTime,
				remainingTime: prevRemainingData.current.remainingTimeRef,
				totalKm: data.totalKm,
			};
		}

		prevRemainingData.current = {
			remainingKmRef: data.remainingKm,
			remainingTimeRef: data.remainingTime,
		};

		return data;

  }, [
    arrLatitude,
    arrLongitude,
    depLatitude,
    depLongitude,
    latitude,
    longitude,
    scheduledDeparture,
    scheduledArrival,
  ]);


  return (
    <div className="bg-card p-element mb-1 flex flex-col gap-4">
      <ProgressBar progress={progress} />

      <div className="flex justify-between text-sm opacity-50">
        <div>
          <span>{flownKm || '2 715'} km</span>
          <span className="mx-2">•</span>
          <span>{flownTime || '3h 1m'}</span>
        </div>
        <div>
          <span>{remainingKm || '882'} km</span>
          <span className="mx-2">•</span>
          <span>{remainingTime || '59 min'}</span>
        </div>
      </div>
    </div>
  );
};

export default FlightStatus;
