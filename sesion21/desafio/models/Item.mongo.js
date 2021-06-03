import mongoose from 'mongoose';

const item = mongoose.Schema({
    nombre : {type:String, required:true},
    categoria: {type:String, required:true},
    stock: {type:Number, required:true }
})

export const mongoSchema = mongoose.model("Item",item);