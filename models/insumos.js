import mongoose from "mongoose";

const insumosSchema = new mongoose.Schema({
    idProveedor: {type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor', required: true},
    nombre: {type: String, required: true},
    relacionNPK: {type: String, required: true}, 
    cantidad: {type: Number, required: true},
    unidad: {type: Number, required: true},
    responsable: {type: String, required: true},
    observaciones: {type: String, required: true},
    total: {type: Number, required: true},
    estado:{type:Number, default:1}

});

export default mongoose.model("Insumo", insumosSchema);
