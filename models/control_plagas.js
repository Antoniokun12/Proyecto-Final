import mongoose from "mongoose";

const controldeplagasSchema=new mongoose.Schema({
    idCultivo:{type:mongoose.Schema.Types.ObjectId,ref:'Cultivo',required:true},
    idEmpleado:{type:mongoose.Schema.Types.ObjectId,ref:'Empleado',required:true},
    fecha:{type:Date,default:Date.now},
    tipoCultivo:{type:String,required:true},
    nombre:{type:String,required:true},
    tipo:{type:String,required:true},
    ingredientesActivo:{type:String,required:true},
    dosis:{type:String,required:true},
    observaciones:{type:String, required:true},
    estado:{type:Number, default:1}
    // nloteComercial:{type:String,required:true},
    // hay un id operario, falta solucionar eso
})

export default mongoose.model("ControlPlaga",controldeplagasSchema)
