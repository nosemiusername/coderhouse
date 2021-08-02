import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    address: String,
    age: String,
    email: String,
    password: String,
    cellphone: String,
})

export const User = mongoose.model('User', userSchema);