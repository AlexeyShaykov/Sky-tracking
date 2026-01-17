import { FlightList } from '@/components/flight-list'

import { FlightDetails } from '@/components/flight-details/FlightDetails'

export const Home = () => {
  return (
    <div>
      <FlightList />
      <FlightDetails />
    </div>
  )
}
