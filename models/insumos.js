import mongoose from "mongoose";

const insumoSchema = new mongoose.Schema({
    id_finca: { type: mongoose.Schema.Types.ObjectId, ref: 'Finca', required: true },
    nombre: { type: String, required: true },
    registro_ica: { type: String, required: true },
    registro_invima: { type: String, required: true },
    relacion_NPK: { type: String, required: true }, // Relación N-P-K (Nitrógeno, Fósforo, Potasio)
    unidad: { 
        type: String, 
        required: true, 
        enum: ['kg', 'lts'], // Solo permite estos valores
        default: 'kg' // Puedes definir un valor por defecto si es necesario
    },
    cantidad: { type: Number, required: true },
    observaciones: { type: String },
    estado:{type:Number, default:1}
});

export default mongoose.model("Insumo", insumoSchema);

