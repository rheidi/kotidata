import axios from "axios"

const LATEST_PRICES_ENDPOINT = 'https://api.porssisahko.net/v1/latest-prices.json'

export type Price = {
  price: number
  startDate: string
  endDate: string
}

export async function fetchLatestPriceData() {
    const response = await axios.get(LATEST_PRICES_ENDPOINT)
    return response.data
}

export function getPriceForDate(date: Date, prices: Price[]) {
    const matchingPriceEntry = prices.find(
        (price) => new Date(price.startDate) <= date && new Date(price.endDate) > date
    )

    if (!matchingPriceEntry) {
        throw 'Price for the requested date is missing'
    }

    return matchingPriceEntry.price
}
