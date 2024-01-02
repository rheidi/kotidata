import React, { useEffect, useState } from 'react'
import axios from 'axios'

type Price = {
    price: number
    startDate: string
    endDate: string
}
  
type Data = {
    prices: Price[]
}
  
const Electricity: React.FC = () => {
    const [data, setData] = useState<Data | null>(null)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get<Data>('https://api.porssisahko.net/v1/latest-prices.json')
                console.log('Data: ', result.data)
                setData(result.data)
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }

        fetchData()
    }, [])

    if (!data) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>Latest Prices</h1>
            {data.prices.map((item, index) => (
                <div key={index}>
                <p>Price: {item.price}</p>
                <p>Start Date: {new Date(item.startDate).toLocaleString()}</p>
                <p>End Date: {new Date(item.endDate).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
}

export default Electricity
