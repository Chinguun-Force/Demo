import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connection } from './utils/connection'
import { authRouter } from './routes/auth'
import { playerRouter } from './routes/player'
import { ownerRouter } from './routes/owner'
import { teamRouter } from './routes/team'
import statsRouter from './routes/stats'
import leagueSummaryRouter from './routes/leagueSummary'
dotenv.config()
const port = 8080
const app = express()
app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/test', (req, res) => {
  res.send('Test Route')
})
app.get('/api', (req, res) => {
  res.send('API Route')
})
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/players', playerRouter)
app.use('/api/v1/owner', ownerRouter)
app.use('/api/v1/teams', teamRouter)
app.use('/api/v1/stats', statsRouter)
app.use('/api/v1/league-summary', leagueSummaryRouter)
const connectDb = async () => {
      try{
        await connection()
      }catch(err){
        console.error(err)
      }
    }
    connectDb()
app.listen(port, async() => {
    console.log(`Server is running on port ${port}`)
  })