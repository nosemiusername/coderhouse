import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    id: Number,
    productName: String,
    department: String,
    price: Number,
    stock: Number,
    productDescription: String,
    image: String,
})

export const Item = mongoose.model('Item', itemSchema);