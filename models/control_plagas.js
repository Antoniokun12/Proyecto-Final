import mongoose from "mongoose";

const controldeplagasSchema=new mongoose.Schema({
    idCultivo:{type:mongoose.Schema.Types.ObjectId,ref:'Cultivo',required:true},
    fecha:{type:Date,default:Date.now()},
    tipoCultivo:{type:String,required:true},
    nombre:{type:String,required:true},
    tipo:{type:String,required:true},
    ingredientesActivo:{type:String,required:true},
    dosis:{type:String,required:true},
    nloteComercial:{type:String,required:true},
    idOperario:{type:mongoose.Schema.Types.ObjectId,ref:'Operario',required:true},
})

export default mongoose.model("ControlDePlaga",controldeplagasSchema)
