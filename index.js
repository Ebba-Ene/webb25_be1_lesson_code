import express from "express"
import dotenv from 'dotenv';
import cors from "cors"
import artistRouter from "./routes/artists.js"
import songRouter from "./routes/songs.js"

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    return res.json({
        message: "Healthy?"
    })
})

app.use("/api/artists", artistRouter)
app.use("/api/songs", songRouter)
const PORT = process.env.PORT || 3000

app.listen(PORT,(error) => {
    if(error) {
        console.log("Error in running express", error.message)
        return
    }
    console.log(`Server is running on port ${PORT}`)
})