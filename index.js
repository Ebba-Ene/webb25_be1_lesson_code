import express from "express"
import dotenv from 'dotenv';
import cors from "cors"

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
    return res.json({
        message: "Healthy?"
    })
})

app.listen(PORT,(error) => {
    if(error) {
        console.log("Error in running express", error.message)
        return
    }
    console.log(`Server is running on port ${PORT}`)
})