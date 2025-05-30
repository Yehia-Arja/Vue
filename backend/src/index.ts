import express, { Request, Response } from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import path from 'path'

import connectDB from './database/config/db'
import authRoutes from './routes/auth'
import studentRoutes from './routes/student'

dotenv.config()

const app = express()

// CORS middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))

// Parse JSON bodies
app.use(express.json())

// Serve static files from 'public/images'
app.use('/images', express.static(path.join(__dirname, '../public/images')))

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('API is running...')
})

// Auth API routes
app.use('/api/auth', authRoutes)

// Students API routes
app.use('/api/students', studentRoutes)

// Connect to DB and start server
connectDB().then(() => {
  const port = process.env.PORT || 5000
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}).catch((err) => {
  console.error('Failed to connect to DB', err)
  process.exit(1)
})
