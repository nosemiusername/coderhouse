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
    date: Date,
    items: [itemsSchema],
})

export const Order = mongoose.model('Order', orderSchema);