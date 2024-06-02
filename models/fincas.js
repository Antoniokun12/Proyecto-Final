import mongoose from "mongoose";

const fincaSchema = new mongoose.Schema({
    idadministrador:{type:mongoose.Schema.Types.ObjectId,ref:'Administrador',required:true},
    nombre:{type:String,required:true},
    rut:{type:Number,required:true},
    direccion:{type:String,required:true},
    ubicacionGeografica:{type:String,required:true},
    Area:{type:Number,required:true},
})


export default mongoose.model("Finca",fincaSchema)
