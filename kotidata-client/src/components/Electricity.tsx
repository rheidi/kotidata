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
  startDate: string
  endDate: string
};

type FormattedPrice = {
  price: number
  startDate: string
  startTime: string
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

  const formatPrice = (p: Price): FormattedPrice => {
    const startDate = new Date(p.startDate)
    return {
      price: p.price,
      startDate: startDate.getDate() + "." + (startDate.getMonth() + 1),
      startTime: startDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }
  }

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
        <BarChart data={prices.map(p => formatPrice(p))}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="startTime" reversed={true} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="price" fill="#AEC670" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Electricity
