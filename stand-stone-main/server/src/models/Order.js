import mongoose from 'mongoose'

/** Human-friendly reference shown to the customer, e.g. SS-20261015-4821. */
export function createOrderReference(date = new Date()) {
  const stamp = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('')
  const random = String(Math.floor(1000 + Math.random() * 9000))
  return `SS-${stamp}-${random}`
}

const orderSchema = new mongoose.Schema(
  {
    reference: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    productId: { type: String, required: true, trim: true, maxlength: 60 },
    productName: { type: String, default: '', trim: true, maxlength: 160 },
    quantity: { type: Number, required: true, min: 0 },
    unit: { type: String, required: true, enum: ['cft', 'truck', 'ton', 'bag', 'piece'] },
    address: { type: String, required: true, trim: true, maxlength: 600 },
    message: { type: String, default: '', trim: true, maxlength: 1000 },
    /** Language the customer was browsing in, handy for follow-up calls. */
    language: { type: String, enum: ['bn', 'en'], default: 'en' },
    status: { type: String, enum: ['new', 'contacted', 'delivered', 'cancelled'], default: 'new' },
  },
  { timestamps: true },
)

// Most recent first — the order staff will actually look at.
orderSchema.index({ createdAt: -1 })

export const Order = mongoose.models.Order ?? mongoose.model('Order', orderSchema)

export default Order
