import express from "express"
import dotenv from 'dotenv';
import cors from "cors"
import artistRouter from "./routes/artists.js";

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json())


let artists = [
  { id: 1, name: 'Bad Bunny' },
  { id: 2, name: 'Zara Larsson' },
  { id: 3, name: 'Radiohead' },
];

app.get("/", (req, res) => {
  return res.json({
    message: "API is running?"
  })
})

app.use('/api/artists', artistRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT,(error) => {
    if(error) {
        console.log("Error in running express", error.message)
        return
    }
    console.log(`Server is running on port ${PORT}`)
})