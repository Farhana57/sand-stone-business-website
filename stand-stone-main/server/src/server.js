import 'dotenv/config'
import mongoose from 'mongoose'
import createApp from './app.js'

const PORT = Number(process.env.PORT) || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sand_stone'

/**
 * The API listens even when MongoDB is unreachable, so the site can still show
 * an honest error and fall back to WhatsApp instead of hanging. Order writes
 * return 503 until the database connection is established.
 */
async function start() {
  const app = createApp()

  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 8000 })
    console.log('[server] MongoDB connected')
  } catch (error) {
    console.error('[server] MongoDB connection failed:', error.message)
    console.error('[server] Order writes will return 503 until the database is reachable.')
  }

  const server = app.listen(PORT, () => {
    console.log(`[server] Order API listening on http://localhost:${PORT}`)
  })

  const shutdown = async (signal) => {
    console.log(`\n[server] ${signal} received, shutting down…`)
    server.close(async () => {
      await mongoose.connection.close().catch(() => {})
      process.exit(0)
    })
  }

  process.on('SIGINT', () => shutdown('SIGINT'))
  process.on('SIGTERM', () => shutdown('SIGTERM'))
}

start()
