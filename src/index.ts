import express from 'express'
import morgan from 'morgan'
import { pbRouter } from './routes/pastebin'

const app = express()
const PORT = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({ message: 'API working correctly' })
})

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  })
})

app.use('/v1', pbRouter)

app.listen(PORT, () => {
  console.info(`🚀 Server runing on http://localhost:${PORT}`)
})
