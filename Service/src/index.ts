import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connection } from './utils/connection'
import { authRouter } from './routes/auth'
import { playerRouter } from './routes/player'

dotenv.config()
const port = 8000
const app = express()
app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/test', (req, res) => {
  res.send('Test Route')
})
// app.use('/api/v1/foods', foodRouter);
// app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/players', playerRouter)

const connectDb = async () => {
  try {
    await connection()
  } catch (err) {
    console.error(err)
  }
}

connectDb()

app.listen(port, async () => {

  console.log(`Server is running on port ${port}`)
})
