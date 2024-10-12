import mongoose from "mongoose";

const semillaSchema = new mongoose.Schema({
    id_finca: { type: mongoose.Schema.Types.ObjectId, ref: 'Finca', required: true },
    nombre: { type: String, required: true },
    registro_ica: { type: String, required: true },
    registro_invima: { type: String, required: true },
    fechaVencimiento: { type: Date, required: true },
    especie_variedad: { type: String, required: true }, // Especie y variedad de la semilla
    numLote: { type: String, required: true }, // Número de lote
    origen: { type: String, required: true },
    poderGerminativo: { type: String, required: true },
    observaciones: { type: String },
    unidad: { 
        type: String, 
        required: true, 
        default: 'kg' // Puedes definir un valor por defecto si es necesario
    },
    cantidad: { type: Number, required: true },
    estado:{type:Number, default:1}
});

export default mongoose.model("Semilla", semillaSchema);


