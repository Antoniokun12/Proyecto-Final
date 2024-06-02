import mongoose from "mongoose";

const fertilizacionSchema = new mongoose.Schema({
    idcultivo:{type:mongoose.Schema.Types.ObjectId,ref:'Cultivo',required:true},
    idempleado:{type:mongoose.Schema.Types.ObjectId,ref:'Empleado',required:true},
    idinventario:{type:mongoose.Schema.Types.ObjectId,ref:'Inventario',required:true},
    createdAt:{type:Date,default:Date.now},
    estadoFenologico:{type:String,required:true},
    tipo:{type:String,required:true},
    nombreFertilizante:{type:String,required:true},
    cantidad:{type:Number,required:true}    
})


export default mongoose.model("Fertilizacion",fertilizacionSchema)
