/**
 * Runs the order API against a temporary in-memory MongoDB, so the whole site
 * can be tested end to end without installing MongoDB.
 *
 *   npm run dev:memory --prefix server
 *
 * Data is discarded when the process stops — it is a development helper only.
 */
import 'dotenv/config'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import createApp from '../src/app.js'

const PORT = Number(process.env.PORT) || 5000

const mongod = await MongoMemoryServer.create()
await mongoose.connect(mongod.getUri('sand_stone_dev'))
console.log('[dev:memory] in-memory MongoDB ready')

const app = createApp()
const server = app.listen(PORT, () => {
  console.log(`[dev:memory] Order API on http://localhost:${PORT}`)
})

const shutdown = async () => {
  server.close()
  await mongoose.connection.close()
  await mongod.stop()
  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
