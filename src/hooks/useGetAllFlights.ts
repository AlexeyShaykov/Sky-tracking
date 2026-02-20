import { getAllFlights } from '@/services/external/aviation/aviation.service';
import type { IFlightResponseData } from '@/services/external/aviation/aviation.types';
import { useQuery } from '@tanstack/react-query';

export const useGetAllFlights = (afterFetchCallback?: () => void) => {
 return useQuery({
    queryKey: ['flights', null, null],
    queryFn: async () => {
      const result = await getAllFlights({
        flight_status: 'active',
      });


      const newData = result.data.reduce((acc: IFlightResponseData[], flight: IFlightResponseData) => {
        if (flight.flight.number) {
          acc.push({
            ...flight,
            progress: Math.floor(Math.random() * 99), // Assign a random progress percentage for demonstration
          });
        }
        return acc;
      }, [] as IFlightResponseData[]);

      afterFetchCallback?.();

      return {
        ...result,
        data: newData,
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  });
};