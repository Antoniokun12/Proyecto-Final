import mongoose from "mongoose";

const RiegoSchema = new mongoose.Schema({
    idcultivos: { type: mongoose.Schema.Types.ObjectId, ref: 'Cultivo', required: true },
    idempleados: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleados', required: true },
    fechaRiego:{type: Date,required:true},
    diasTransplante:{type: String,required:true},
    estadoFenológico:{type: String,required:true},
    horaInicio:{type: String,required:true},
    horaFin:{type: String,required:true},
    dosis:{type: String,required:true},
    cantidadAgua:{type: Number,required:true}
})

export default mongoose.model("Riego", RiegoSchema)


