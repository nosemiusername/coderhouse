import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
    {
        user: { type: String, required: true },
        email: { type: String, required: true },
        pass: { type: String, required: true },
    }
)

export const userSchema = new UserSchema('User', UserSchema);