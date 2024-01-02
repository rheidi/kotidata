import express from "express"
import cors from "cors"
import axios from 'axios'

const app = express()

app.use(express.json())
app.use(cors())

const LATEST_PRICES_ENDPOINT = 'https://api.porssisahko.net/v1/latest-prices.json'

type Price = {
  price: number
  startDate: string
  endDate: string
}

async function fetchLatestPriceData() {
    const response = await axios.get(LATEST_PRICES_ENDPOINT)
    return response.data
}

function getPriceForDate(date: Date, prices: Price[]) {
    const matchingPriceEntry = prices.find(
        (price) => new Date(price.startDate) <= date && new Date(price.endDate) > date
    )

    if (!matchingPriceEntry) {
        throw 'Price for the requested date is missing'
    }

    return matchingPriceEntry.price
}

app.get("/api/notes", async (req, res) => {
    res.json({ message: "success!" })
})

app.get("/api/price-now", async (req, res) => {
    try {
        const { prices } = await fetchLatestPriceData() as { prices: Price[] }
        const now = new Date()
        const price = getPriceForDate(now, prices)
        res.json({ message: `Hinta nyt (${now.toISOString()}): ${price} snt / kWh (sis. alv)` })
    } catch (e) {
        res.status(500).json({ error: `Hinnan haku epäonnistui, syy: ${e}` })
    }
})

app.get("/api/prices", async (req, res) => {
    try {
        const { prices } = await fetchLatestPriceData() as { prices: Price[] }
        res.send(prices)
    } catch (e) {
        res.status(500).json({ error: `Error message: ${e}` })
    }
})

app.listen(5004, () => {
    console.log("server running on localhost:5004")
})
