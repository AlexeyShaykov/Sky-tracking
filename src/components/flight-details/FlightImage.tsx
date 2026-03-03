import type { IFlightResponseData } from '@/services/external/aviation/aviation.types';

const AircraftPhotoPlaceholder = () => (
  <div className="max-w-[95%] h-full mx-auto bg-muted flex flex-col items-center justify-center gap-2 rounded-lg">
    <svg
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      className="opacity-30"
    >
      <path
        d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2h0A1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
        fill="currentColor"
      />
    </svg>
    <span className="text-sm text-muted-foreground">No photo available</span>
  </div>
);

const FlightImage = ({ flight }: { flight: IFlightResponseData }) => {
  const { aircraft } = flight || {};

  const { photo = '' } = aircraft || {};
  return (
    <div
      className="xs:h-56 xs:pt-21 w-full h-87.5 pt-28"
      style={{
        background: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/public/planes/lufthansa.png') no-repeat center center / cover)`,
      }}
    >
      {photo ? (
        <img
          src={photo}
          alt="Aircraft"
          className="max-w-[95%] h-auto mx-auto"
        />
      ) : (
        <AircraftPhotoPlaceholder />
      )}
    </div>
  );
};

export default FlightImage;
