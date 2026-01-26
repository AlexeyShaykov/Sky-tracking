import type { IFlight } from '@/types/flights.types';

const FlightInformation = ({
  flight
}: {
  flight: IFlight;
}) => {

  const {
    airline,
  } = flight;

  const { country: airlineCountry } = airline;

  return (
    <div>
      <img 
        src={`/flags/${airlineCountry.toLowerCase()}.svg`}
        width={24}
        height={18}
        className="inline-block mr-2"
      />
      <span>{airlineCountry}</span>
     </div>
  )
};

export default FlightInformation;
