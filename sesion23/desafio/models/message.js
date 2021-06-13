import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
    autor: {
        id: { type: String, required: true },
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        edad: { type: Number, required: false },
        alias: { type: String, required: false },
        avatar: { type: String, required: false },
    },
    text: { type: String, required: true },
    fecha: {type:Date, required:true },

});

export const Message = mongoose.model('messages', messageSchema);