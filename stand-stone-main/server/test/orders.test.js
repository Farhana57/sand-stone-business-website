/**
 * End-to-end test for the order API against a real (in-memory) MongoDB.
 * Run with: npm test --prefix server
 * mongodb-memory-server downloads a mongod binary on first run.
 */
import test from 'node:test'
import assert from 'node:assert/strict'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import createApp from '../src/app.js'
import { Order } from '../src/models/Order.js'

let mongod
let server
let baseUrl

const validOrder = {
  name: 'Rakib Hasan',
  phone: '01712345678',
  productId: 'coarse-sand',
  productName: 'Coarse River Sand',
  quantity: 200,
  unit: 'cft',
  address: 'House 12, Road 4, West Rampura, Dhaka',
  message: 'Please deliver in the morning.',
  language: 'bn',
}

const post = (body, headers = {}) =>
  fetch(`${baseUrl}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  })

test.before(async () => {
  mongod = await MongoMemoryServer.create()
  await mongoose.connect(mongod.getUri('sand_stone_test'))
  const app = createApp()
  await new Promise((resolve) => {
    server = app.listen(0, '127.0.0.1', resolve)
  })
  baseUrl = `http://127.0.0.1:${server.address().port}`
})

test.after(async () => {
  await mongoose.connection.close()
  await mongod.stop()
  await new Promise((resolve) => server.close(resolve))
})

test('health endpoint reports a connected database', async () => {
  const response = await fetch(`${baseUrl}/api/health`)
  const body = await response.json()
  assert.equal(response.status, 200)
  assert.equal(body.status, 'ok')
  assert.equal(body.database, 'connected')
})

test('stores a valid order and returns a reference', async () => {
  const response = await post(validOrder)
  const body = await response.json()

  assert.equal(response.status, 201)
  assert.match(body.order.reference, /^SS-\d{8}-\d{4}$/)

  const stored = await Order.findById(body.order.id).lean()
  assert.equal(stored.phone, '01712345678')
  assert.equal(stored.productId, 'coarse-sand')
  assert.equal(stored.quantity, 200)
  assert.equal(stored.unit, 'cft')
  assert.equal(stored.status, 'new')
  assert.equal(stored.language, 'bn')
})

test('rejects an invalid order with field errors', async () => {
  const response = await post({ ...validOrder, phone: '12345', quantity: 0, unit: 'kg' })
  const body = await response.json()

  assert.equal(response.status, 400)
  assert.ok(body.errors.phone)
  assert.ok(body.errors.quantity)
  assert.ok(body.errors.unit)
  assert.equal(await Order.countDocuments({ phone: '12345' }), 0)
})

test('rejects requests from a foreign origin', async () => {
  const response = await post(validOrder, { Origin: 'https://evil.example.com' })
  assert.equal(response.status, 403)
})

test('allows requests from the configured origin', async () => {
  const response = await post(validOrder, { Origin: 'http://localhost:3000' })
  assert.equal(response.status, 201)
})

test('keeps the order listing disabled without ADMIN_TOKEN', async () => {
  delete process.env.ADMIN_TOKEN
  const response = await fetch(`${baseUrl}/api/orders`)
  assert.equal(response.status, 404)
})
