import React from 'react';

type Route = {
  shortName: string
}

type Trip = {
  route: Route
}

export type Stoptime = {
  scheduledArrival: number
  realtimeArrival: number
  arrivalDelay: number
  scheduledDeparture: number
  realtimeDeparture: number
  departureDelay: number
  realtime: boolean
  serviceDay: number
  headsign: string
  trip: Trip
}

type Props = {
  stopName: string
  stoptimesWithoutPatterns: Stoptime[]
}

const BusStop: React.FC<Props> = ({ stopName, stoptimesWithoutPatterns }) => {
  return (
    <div className='stop'>
      <h3>{stopName}</h3>
      <table>
        <thead>
          <tr>
            <th>Linja</th>
            <th></th>
            <th>Lähtöaika</th>
          </tr>
        </thead>
        <tbody>
          {stoptimesWithoutPatterns.map((stoptime, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{stoptime.trip.route.shortName}</td>
                <td>{!stoptime.realtime ?? "~"}</td>
                <td>{new Date(stoptime.serviceDay * 1000 + stoptime.realtimeArrival * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
              </tr>
              <tr>
                <td colSpan={3}>{stoptime.headsign}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BusStop
