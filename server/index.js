import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import sendOrderEmailHandler from '../api/send-order-email.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// API Routes
app.post('/api/send-order-email', async (req, res) => {
  console.log('🌐 SERVER: Received request to /api/send-order-email')
  console.log('🌐 SERVER: Request body keys:', Object.keys(req.body))
  try {
    // Simulate serverless function environment
    await sendOrderEmailHandler(req, res)
  } catch (error) {
    console.error('🌐 SERVER ERROR:', error)
    console.error('🌐 SERVER ERROR Message:', error.message)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`)
  console.log(`📧 Email endpoint: http://localhost:${PORT}/api/send-order-email`)
  console.log(`\n📧 Email Configuration:`)
  console.log(`   SMTP_USER: ${process.env.SMTP_USER || 'NOT SET'}`)
  console.log(`   GMAIL_USER: ${process.env.GMAIL_USER || 'NOT SET'}`)
  console.log(`   SMTP_PASS: ${process.env.SMTP_PASS ? '***SET***' : 'NOT SET'}`)
  console.log(`   GMAIL_APP_PASSWORD: ${process.env.GMAIL_APP_PASSWORD ? '***SET***' : 'NOT SET'}`)
  console.log(`   ADMIN_EMAIL: ${process.env.ADMIN_EMAIL || 'NOT SET'}`)
})

