import express from 'express'
const port = 8000
const app = express()

app.use(express.json())
app.listen(port, async=>{

})

app.get('/', (req,res)=>{
    res.send('Hello World!')
})