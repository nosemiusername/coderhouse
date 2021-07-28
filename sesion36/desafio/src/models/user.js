import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    address: String,
    age: String,
    email: String,
    password: String,
})

export const User = mongoose.model('User', userSchema);