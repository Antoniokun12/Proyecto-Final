import mongoose from "mongoose";

const parcelasSchema = new mongoose.Schema({
    idFinca: { type: mongoose.Schema.Types.ObjectId, ref: 'Finca', required: true },
    ubicacionGeografica: [{
        latitud: { type: String, required: true },
        longitud: { type: String, required: true },
    }],
    numero: { type: Number, required: true, unique: true },
    cultivoAnterior: { type: String, required: true },
    cultivoActual: { type: String, required: true },
    detalle: { type: String, required: true },
    estado: { type: Number, default: 1 },
    area: { type: Number, required: true },
    asistenteTecnico: { type: String, required: true }
})

export default mongoose.model("Parcela", parcelasSchema)