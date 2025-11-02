import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { initPastesTable } from './database/inits'
import { pasteRouter } from './routes/pastebin'

const PORT = process.env.PORT || 3000
initPastesTable().catch((error) => {
  console.error('Failed to initialize database tables:', error)
  process.exit(1)
})

export const app = express()

app.use(cors({ origin: '*' }))
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

app.use('/v1/pastebin', pasteRouter)

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.info(`Server running on http://localhost:${PORT}`)
  })
}
