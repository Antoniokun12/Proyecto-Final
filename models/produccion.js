import mongoose from "mongoose";

const ProduccionSchema = new mongoose.Schema({
    idCultivo:{ type: mongoose.Schema.Types.ObjectId, ref: 'Cultivo', required: true },
    fecha:{type: Date,default:Date.now},
    Nlote:{type: String,required:true},
    especie:{type: String,required:true},
    cantidad:{type: Number,required:true},
    cantidadTrabajadores:{type: Number,required:true},
    observaciones:{type: String,required:true},
    estado:{type:Number, default:1}

})

export default mongoose.model("Produccion", ProduccionSchema)