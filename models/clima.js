import mongoose from "mongoose";

const climaSchema=new mongoose.Schema({
    idfinca: {type: mongoose.Schema.Types.ObjectId, ref: 'Finca', required: true},
    idempleado: {type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true},
    createAt: {type: Date, default: Date.now},
    tipo:{type:String,required:true},
    horaInicio:{type:String,required:true},
    horaFinal:{type:String},
    tempMin:{type:Number,required:true},
    tempMax:{type:Number,required:true},

})

export default mongoose.model("Clima",climaSchema)