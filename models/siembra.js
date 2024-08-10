import mongoose from "mongoose";

const SiembraSchema = new mongoose.Schema({
    idCultivo: { type: mongoose.Schema.Types.ObjectId, ref: 'Cultivo', required: true },
    idEmpleado: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true },
    idInventario: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventario', required: true },
    fechasiembra:{type: Date,default:Date.now},
    fechacosecha:{type: Date,required:true},
    transplante:{type: Boolean,required:true}, //revisar que es esto
    CultivoAnterior:{type: String,required:true},
    estado:{type:Number, default:1}

})

export default mongoose.model("Siembra", SiembraSchema)