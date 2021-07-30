import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    id: Number,
    productId: Number,
    quantity: Number,
    state: String,
})

export const Item = mongoose.model('Item', itemSchema);