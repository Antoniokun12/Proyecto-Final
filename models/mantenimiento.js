import mongoose from "mongoose";

const mantenimientoSchema = new mongoose.Schema({
    gastos_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Gastos', required: true},
    id_herramienta: {type: mongoose.Schema.Types.ObjectId, ref: 'Maquina_herramienta', required: true},
    fecha: {type: Date, required: true},
    verificacionRealizada: {type: Boolean, required: true},
    calibracion: {type: Boolean},
    responsable: {type: String, required: true},
    observaciones: {type: String}
});

export default mongoose.model("Mantenimiento", mantenimientoSchema);
