import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
    autor: {
        email: { type: String, required: true },
        avatar: { type: String, required: false },
        type: { type: String, required: false },
        alias: { type: String, required: false },
    },
    text: { type: String, required: true },
    fecha: { type: Date, required: true },

});

export const Message = mongoose.model('messages', messageSchema);