import mongoose from "mongoose";

const mantenimientoSchema = new mongoose.Schema({
    // idGasto: {type: mongoose.Schema.Types.ObjectId, ref: 'Gasto', required: true},
    idMaquina: {type: mongoose.Schema.Types.ObjectId, ref: 'Maquina_herramienta', required: true},
    fecha: {type: Date, default:Date.now},
    verificacionRealizada: {type: Boolean, required: true, default:true},
    calibracion: {type: Boolean},
    responsable: {type: String, required: true},
    observaciones: {type: String, required: true}
});

export default mongoose.model("Mantenimiento", mantenimientoSchema);
