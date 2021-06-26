import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        id: { type: String, required: true },
        username: { type: String, required: true },
        email: { type: String, required: true },
    }
)

export const User = mongoose.model('User', userSchema);