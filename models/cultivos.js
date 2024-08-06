import mongoose from "mongoose";

const cultivosSchema = new mongoose.Schema({
    idParcela:{type:mongoose.Schema.Types.ObjectId,ref:'Parcela',required:true},
    nombre:{type:String,required:true},
    tipo:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
    estado:{type:Number, default:1}

})


export default mongoose.model("Cultivo",cultivosSchema)