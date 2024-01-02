import React, { useEffect, useState } from 'react'
import axios from 'axios'

type Price = {
    price: number
    startDate: string
    endDate: string
}
  
const Electricity: React.FC = () => {
    const [prices, setPrices] = useState<Price[]| null>(null)
    
    useEffect(() => {
        const getAllPrices = async () => {
            try {
                const result = await axios.get<Price[]>('http://localhost:5004/api/prices')
                setPrices(result.data)
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }

        getAllPrices()
    }, [])

    const priceNow = () => {
        const now = new Date()
        const matchingPriceEntry = prices?.find(
            (price) => new Date(price.startDate) <= now && new Date(price.endDate) > now
        )
    
        if (!matchingPriceEntry) {
            throw 'Price for the requested date is missing'
        }
    
        return matchingPriceEntry.price
    }

    if (!prices) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h2>Current Price</h2>
                <p>{priceNow()}</p>
            <h2>Latest Prices</h2>
            {prices.map((item, index) => (
                <div key={index}>
                    <p>From: {new Date(item.startDate).toLocaleString()}</p>
                    <p>To: {new Date(item.endDate).toLocaleString()}</p>
                    <p>Price: {item.price}</p>
                </div>
            ))}
        </div>
    );
}

export default Electricity
