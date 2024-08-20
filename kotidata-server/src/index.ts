import 'dotenv/config'
import express from "express"
import cors from "cors"
import { Price, fetchLatestPriceData, getPriceForDate } from "./services/electricityPriceService"
import { fetchTimetableData } from "./services/timetableService"


const app = express()

app.use(express.json())
app.use(cors())

app.get("/api/health", async (req, res) => {
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
        res.status(500).json({ error: `Hintojen hakeminen epäonnistui, syy: ${e}` })
    }
})

app.get("/api/bus-stop-now/:id?", async (req, res) => {
    try {
        const { id } = req.params
        const timetable = await fetchTimetableData(id)
        res.send(timetable)
    } catch (e) {
        res.status(500).json({ error: `Bussipysäkin haku epäonnistui, syy: ${e}` })
    }
})

app.listen(5004, () => {
    console.log("server running on localhost:5004")
})
