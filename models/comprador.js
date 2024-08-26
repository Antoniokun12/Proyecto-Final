import mongoose from "mongoose";

const compradorSchema=new mongoose.Schema({
    idProduccion:{type:mongoose.Schema.Types.ObjectId,ref:'Produccion',required:true},
    fecha:{type:Date,default:Date.now},
    especie:{type:String,required:true},
    nombre:{type:String,required:true},
    telefono:{type:String,required:true},
    cantidad:{type:Number,required:true},
    nguiaTransporte:{type:String,required:true},
    valor:{type:String,required:true},
    estado:{type:Number, default:1}
})

export default mongoose.model("Comprador",compradorSchema)
