import axios from "axios"

type Route = {
  shortName: string
}

type Trip = {
  route: Route
}

type Stoptime = {
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

export type Stop = {
  name: string
  stoptimesWithoutPatterns: Stoptime[]
}

const TIMETABLES_ENDPOINT = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'

const stopId = "HSL:1465105"

const headers = {
  'Content-Type': 'application/json',
  'digitransit-subscription-key': process.env.HSL_API_KEY
}
const getQueryStop = (id: string) => `{
  stop(id: "${id}") {
    name
      stoptimesWithoutPatterns(numberOfDepartures: 10) {
      scheduledArrival
      realtimeArrival
      arrivalDelay
      scheduledDeparture
      realtimeDeparture
      departureDelay
      realtime
      serviceDay
      headsign
      trip {
        route {
          shortName
        }
      }
    }
  }  
}`

export async function fetchTimetableData(id: string = stopId): Promise<Stop> {
  const response = await axios.post(TIMETABLES_ENDPOINT, { query: getQueryStop(id) }, { headers })
  return response.data.data.stop
}
