import mongoose from "mongoose";

const insumosSchema = new mongoose.Schema({
    proveedores_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Proveedores', required: true},
    nombre: {type: String, required: true},
    relacionNPK: {type: String, required: true}, 
    cantidad: {type: Number, required: true},
    unidad: {type: String, required: true},
    responsable: {type: String, required: true},
    observaciones: {type: String},
    total: {type: Number, required: true}
});

export default mongoose.model("Insumo", insumosSchema);
