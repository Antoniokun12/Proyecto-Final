import mongoose from "mongoose";

const Maquina_herramientaSchema=new mongoose.Schema({
    idProveedor:{type:mongoose.Schema.Types.ObjectId,ref:'Proveedor',required:true},
    nombre:{type:String,required:true},
    tipo:{type:String,required:true},
    FechaCompra:{type:Date,default:Date.now},
    observaciones:{type:String,required:true},
    cantidad:{type:Number,required:true},
    total:{type:Number,required:true},
    estado:{type:Number, default:1}

})

export default mongoose.model("Maquina_herramienta",Maquina_herramientaSchema)