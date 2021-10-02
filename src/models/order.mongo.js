import mongoose from 'mongoose';


const itemsSchema = new mongoose.Schema({
    productId: Number,
    quantity: Number,
    productName: String,
    price: Number,
})

const orderSchema = new mongoose.Schema({
    id: Number,
    email: String,
    status: String,
    created_at: Date,
    updated_at: Date,
    items: [itemsSchema],
})

export const Order = mongoose.model('Order', orderSchema);