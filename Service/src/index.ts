import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connection } from './utils/connection'
import { authRouter } from './routes/auth'

dotenv.config()
const port = 8000
const app = express()
app.use(cors())

app.use(express.json())

app.get('/', (req,res)=>{
    res.send('Hello World!')
})
// app.use('/api/v1/foods', foodRouter);
// app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/auth', authRouter)
app.listen(port, async() => {
    const connectDb = async () => {
      try{
        await connection()
      }catch(err){
        console.error(err)
      }
    }
    connectDb()
    console.log(`Server is running on port ${port}`)
  })