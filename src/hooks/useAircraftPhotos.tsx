// hooks/useAircraftPhotos.ts
import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { IFlightResponseData } from '@/services/external/aviation/aviation.types';
import { fetchAircraftPhoto } from '@/services/external/planespotters/planespotters.service';


export const useAircraftPhotos = (flights: IFlightResponseData[] | undefined) => {
  const queryClient = useQueryClient();
  const isCalling = useRef(false);

  useEffect(() => {
    if (!flights?.length) return;

    if (isCalling.current) return;

    const fetchAll = async () => {
      for (const flight of flights) {
        const icao24 = flight.aircraft?.icao24;
        const reg = flight.aircraft?.registration;

        if (!icao24 && !reg) continue;

        // не грузим повторно если фото уже есть
        if (flight.aircraft?.photo) continue;

        const photo = icao24
          ? await fetchAircraftPhoto(icao24)
          : null;

        if (!photo) continue;

        // обновляем конкретный рейс в кэше
        queryClient.setQueryData(
          ['flights', null, null],
          (old: { data: IFlightResponseData[] } | undefined) => {
            if (!old?.data) return old;
            return {
              ...old,
              data: old.data.map((f) =>
                f.flight.number === flight.flight.number
                  ? { ...f, aircraft: { ...f.aircraft, photo } }
                  : f,
              ),
            };
          },
        );

        // задержка чтобы не спамить Planespotters
        await new Promise(r => setTimeout(r, 500));
      }
    };

    fetchAll();
    isCalling.current = true;
  }, [flights, queryClient]);
};