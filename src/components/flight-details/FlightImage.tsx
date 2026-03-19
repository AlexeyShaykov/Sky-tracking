import { getLogoPlaneByAirline } from '@/data/getLogoPlaneByAirline';
import type { IFlightResponseData } from '@/services/external/aviation/aviation.types';


const FlightImage = ({ flight }: { flight: IFlightResponseData }) => {
  const { aircraft, airline } = flight || {};

  const { photo = '' } = aircraft || {};
  const { name: airlineName = '' } = airline || {};
  const __photo = getLogoPlaneByAirline(airlineName);

  return (
    <div
      className="xs:h-56 xs:pt-21 w-full h-87.5 pt-28"
      // style={{
      //   background: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/public/planes/lufthansa.png') no-repeat center center / cover)`,
      // }}
    >
      <img
          src={photo || __photo}
          alt="Aircraft"
          className="max-w-[95%] h-auto mx-auto"
          onError={(e) => {
            (e.target as HTMLImageElement).src = __photo;
          }}
      />
    </div>
  );
};

export default FlightImage;
