import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
    nombre : {type:String, required:true},
    categoria: {type:String, required:true},
    stock: {type:Number, required:true }
})

export const Item = mongoose.model("Item",itemSchema);