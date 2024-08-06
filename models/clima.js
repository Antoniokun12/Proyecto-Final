import mongoose from "mongoose";

const climaSchema=new mongoose.Schema({
    idFinca: {type: mongoose.Schema.Types.ObjectId, ref: 'Finca', required: true},
    idEmpleado: {type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true},
    createAt: {type: Date, default: Date.now},
    tipo:{type:String,required:true},
    horaInicio:{type: Date, default: Date.now},
    horaFinal:{type:Date,required:true},
    tempMin:{type:Number,required:true},
    tempMax:{type:Number,required:true},
    // estado:{type:Number, default:1}
})
export default mongoose.model("Clima",climaSchema)