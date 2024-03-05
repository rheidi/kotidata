import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

type Price = {
  price: number
  startDate: Date
  endDate: Date
};

const Electricity: React.FC = () => {
  const [prices, setPrices] = useState<Price[] | null>(null)

  useEffect(() => {
    const getAllPrices = async () => {
      try {
        const result = await axios.get<Price[]>(
          "http://localhost:5004/api/prices"
        );
        setPrices(result.data)
      } catch (error) {
        console.error("Error fetching data: ", error)
      }
    };

    getAllPrices();
  }, [])

  const priceNow = () => {
    const now = new Date();
    const matchingPriceEntry = prices?.find(
      (price) =>
        new Date(price.startDate) <= now && new Date(price.endDate) > now
    )

    if (!matchingPriceEntry) {
      throw "Price for the requested date is missing"
    }

    return matchingPriceEntry.price
  };

  if (!prices) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Sähkön hinta</h2>
      <p>Hinta tällä hetkellä: {priceNow()}</p>
      <ResponsiveContainer width="101%" height={300}>
        <BarChart data={prices}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="startDate" reversed={true} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="price" fill="#AEC670" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Electricity;
