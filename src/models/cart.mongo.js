import mongoose from 'mongoose';


const itemsSchema = new mongoose.Schema({
    productId: Number,
    quantity: Number,
    productName: String,
    price: Number,
    image: String,
})

const cartSchema = new mongoose.Schema({
    email: String,
    address: String,
    status: String,
    items: [itemsSchema],
    created_at: Date,
    updated_at: Date,
})

export const Cart = mongoose.model('Cart', cartSchema);