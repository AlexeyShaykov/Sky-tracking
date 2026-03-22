import { FlightList } from '@/components/flight-list'

import { FlightDetails } from '@/components/flight-details/FlightDetails'
import FlightTrackMap from '@/components/flightTrackMap/FlightTrackMap'

const Home = () => {
  return (
    <>
    <FlightList />
    <FlightDetails />
    <div
      className="absolute inset-0 z-0"
    >
      <FlightTrackMap /> 
    </div>
    </>
  )
};

export default Home
