import mongoose from 'mongoose';


const itemsSchema = new mongoose.Schema({
    productId: Number,
    quantity: Number,
    productName: String,
    price: Number,
    image: String,
})

const cartSchema = new mongoose.Schema({
    username: String,
    status: String,
    items: [itemsSchema],
})

export const Cart = mongoose.model('Cart', cartSchema);