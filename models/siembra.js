import mongoose from "mongoose";

const SiembraSchema = new mongoose.Schema({
    idcultivos: { type: mongoose.Schema.Types.ObjectId, ref: 'Cultivo', required: true },
    idempleados: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleados', required: true },
    idinventario: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventario', required: true },
    fechasiembra:{type: Date,required:true},
    fechacosecha:{type: Date,required:true},
    transplante:{type: String,required:true}, //revisar que es esto
    CultivoAnterior:{type: String,required:true},
})

export default mongoose.model("Siembra", SiembraSchema)