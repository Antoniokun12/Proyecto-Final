import mongoose from "mongoose";

const cultivosSchema = new mongoose.Schema({
    idparcela:{type:mongoose.Schema.Types.ObjectId,ref:'Parcela',required:true},
    createdAt:{type:Date,default:Date.now()},
    nombre:{type:String,required:true},
    tipo:{type:String,required:true},
})


export default mongoose.model("Cultivo",cultivosSchema)