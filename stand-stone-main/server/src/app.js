import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { Order, createOrderReference } from './models/Order.js'
import { validateOrderInput } from './validate.js'

/** Parse CORS_ORIGINS into a list; falls back to the local Vite dev server. */
function allowedOrigins() {
  const raw = process.env.CORS_ORIGINS ?? 'http://localhost:3000'
  return raw
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
}

/** True when Mongoose has an established connection. */
const dbReady = () => mongoose.connection.readyState === 1

export function createApp() {
  const app = express()

  app.disable('x-powered-by')
  app.use(express.json({ limit: '32kb' }))
  app.use(
    cors({
      origin(origin, callback) {
        // Requests without an Origin header (curl, server-to-server) are allowed.
        if (!origin || allowedOrigins().includes(origin)) return callback(null, true)
        return callback(new Error('Not allowed by CORS'))
      },
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'x-admin-token'],
    }),
  )

  // --- Health -------------------------------------------------------------
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      database: dbReady() ? 'connected' : 'disconnected',
      time: new Date().toISOString(),
    })
  })

  // --- Create an order ----------------------------------------------------
  app.post('/api/orders', async (req, res) => {
    const { valid, errors, value } = validateOrderInput(req.body)

    if (!valid) {
      return res.status(400).json({ message: 'Please check the submitted details.', errors })
    }

    // Fail loudly instead of pretending the order was stored.
    if (!dbReady()) {
      return res.status(503).json({
        message: 'The order database is not connected. Please call or message us on WhatsApp.',
      })
    }

    try {
      const order = await Order.create({
        ...value,
        reference: createOrderReference(),
      })

      return res.status(201).json({
        order: {
          id: order.id,
          reference: order.reference,
          createdAt: order.createdAt,
        },
      })
    } catch (error) {
      console.error('[orders] failed to create order:', error)
      return res.status(500).json({ message: 'Could not save the order. Please try again.' })
    }
  })

  // --- List orders (staff only, must be enabled explicitly) ---------------
  app.get('/api/orders', async (req, res) => {
    const adminToken = process.env.ADMIN_TOKEN
    if (!adminToken) {
      return res.status(404).json({ message: 'Not found.' })
    }
    if (req.get('x-admin-token') !== adminToken) {
      return res.status(401).json({ message: 'Unauthorized.' })
    }
    if (!dbReady()) {
      return res.status(503).json({ message: 'The order database is not connected.' })
    }

    const limit = Math.min(Number(req.query.limit) || 50, 200)
    const orders = await Order.find().sort({ createdAt: -1 }).limit(limit).lean()
    return res.json({ count: orders.length, orders })
  })

  // --- Errors -------------------------------------------------------------
  app.use((req, res) => {
    res.status(404).json({ message: `No route for ${req.method} ${req.path}` })
  })

  app.use((error, _req, res, _next) => {
    // A rejected Origin is a client problem, not a server fault.
    if (error?.message === 'Not allowed by CORS') {
      return res.status(403).json({ message: 'Origin not allowed.' })
    }
    console.error('[server] unhandled error:', error)
    return res.status(500).json({ message: 'Unexpected server error.' })
  })

  return app
}

export default createApp
