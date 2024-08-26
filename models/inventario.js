import mongoose from "mongoose";

const inventarioSchema = new mongoose.Schema({
    idSemilla: {type: mongoose.Schema.Types.ObjectId, ref: 'Semilla'},
    idInsumo: {type: mongoose.Schema.Types.ObjectId, ref: 'Insumo'},
    idMaquina_herramienta: {type: mongoose.Schema.Types.ObjectId, ref: 'Maquina_herramienta'},
    tipo: {type: String, required: true},
    observacion: {type: String, required: true},
    unidad: {type: String, required: true},
    cantidad: {type: Number, required: true},
    estado:{type:Number, default:1}

});

export default mongoose.model("Inventario", inventarioSchema);
