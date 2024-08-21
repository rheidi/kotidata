import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BusStop, { Stoptime } from './BusStop'



export type Stop = {
  name: string
  stoptimesWithoutPatterns: Stoptime[]
}

const Timetables: React.FC = () => {
  const stopId1 = "HSL:1465105"
  const stopId2 = "HSL:1462106"
  const stopId3 = "HSL:1462401"
  const stopId4 = "HSL:1462402"

  const [stop1, setStop1] = useState<Stop | null>(null)
  const [stop2, setStop2] = useState<Stop | null>(null)
  const [stop3, setStop3] = useState<Stop | null>(null)
  const [stop4, setStop4] = useState<Stop | null>(null)

  useEffect(() => {
    const getAllTimetables = async () => {
      try {
        const result1 = await axios.get<Stop>(
          "http://localhost:5004/api/bus-stop-now/" + stopId1
        )
        setStop1(result1.data)
        const result2 = await axios.get<Stop>(
          "http://localhost:5004/api/bus-stop-now/" + stopId2
        )
        setStop2(result2.data)
        const result3 = await axios.get<Stop>(
          "http://localhost:5004/api/bus-stop-now/" + stopId3
        )
        setStop3(result3.data)
        const result4 = await axios.get<Stop>(
          "http://localhost:5004/api/bus-stop-now/" + stopId4
        )
        setStop4(result4.data)
      } catch (error) {
        console.error("Error fetching data: ", error)
      }
    }
    getAllTimetables()
  }, [])

  return (
    <div className='bus-stop-container'>
      <h2>Lähipysäkkien aikataulut</h2>
      <div className='stop-container-item'>
        <BusStop stopName="Pitäjänmäkeen" stoptimesWithoutPatterns={stop1?.stoptimesWithoutPatterns || []} />
        <BusStop stopName="Keskustaan" stoptimesWithoutPatterns={stop2?.stoptimesWithoutPatterns || []} />
        <BusStop stopName="Leppävaaraan" stoptimesWithoutPatterns={stop3?.stoptimesWithoutPatterns || []} />
        <BusStop stopName="Itäkeskukseen" stoptimesWithoutPatterns={stop4?.stoptimesWithoutPatterns || []} />
      </div>
    </div>
  )
}

export default Timetables
