import mongoose from "mongoose";

const RiegoSchema = new mongoose.Schema({
    idCultivo: { type: mongoose.Schema.Types.ObjectId, ref: 'Cultivo', required: true },
    idEmpleado: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true },
    fechaRiego:{type: Date,default:Date.now},
    diasTransplante:{type: String,required:true},
    estadoFenologico:{type: String,required:true},
    horaInicio:{type: String,required:true},
    horaFin:{type: String,required:true},
    dosis:{type: Number,required:true},
    cantidadAgua:{type: Number,required:true},
    estado:{type:Number, default:1}
})

export default mongoose.model("Riego", RiegoSchema)


