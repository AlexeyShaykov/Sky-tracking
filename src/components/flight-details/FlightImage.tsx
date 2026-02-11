import type { IFlight } from '@/types/flights.types';

const FlightImage = ({
  flight
}: {
  flight: IFlight;
}) => {
  const {
    colorGradient,
    airplane,
  } = flight;

  const {
    image,
    name,
  } = airplane;

  return (
    <div
    className="xs:h-56 xs:pt-21 w-full h-72 pt-28"
    style={{
      background: `linear-gradient(to top, ${colorGradient[0]}, ${colorGradient[1]})`
    }}
  >
    <img
      src={image}
      alt={name}
      className="max-w-[95%] h-auto mx-auto"
    />
  </div>
  )
};

export default FlightImage;
