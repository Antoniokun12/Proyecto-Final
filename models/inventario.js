import mongoose from "mongoose";

const inventarioSchema = new mongoose.Schema({
    tipo: {type: String, required: true},
    observacion: {type: String},
    unidad: {type: String, required: true},
    cantidad: {type: Number, required: true},
    semillas_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Semillas'},
    insumos_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Insumos'},
    maquinaria_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Maquina_herramienta'}
});

export default mongoose.model("Inventario", inventarioSchema);
