import mongoose from 'mongoose';

const usuarioCollection = 'usuarios';
const UsuarioSchema = new mongoose.Schema({
    nombre: {type: String, require: true, max:100},
    apellido: {type: String, require: true, max:100},
    usuario: {type: String, require: true, max:100},
    password: {type: String, require: true, max:100},
});

export const usuarios = mongoose.model(usuarioCollection, UsuarioSchema);