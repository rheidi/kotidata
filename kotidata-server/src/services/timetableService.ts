import axios from "axios"

const TIMETABLES_ENDPOINT = 'https://api.digitransit.fi/timetables/v1/hsl/'

export type Timetable = {
  
}

export async function fetchTimetableData() {
  const response = await axios.get(TIMETABLES_ENDPOINT)
  return response.data
}
