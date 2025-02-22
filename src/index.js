import express from 'express'
import dotenv from 'dotenv'
import InitializeRoutes from './router/index.js'
import cors from 'cors'


dotenv.config()

const app = express();

const port = process.env.PORT || 3000

app.use(express.json())

app.use(cors())

app.use('/', InitializeRoutes())

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})
