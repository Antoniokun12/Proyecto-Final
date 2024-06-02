import mongoose from "mongoose";

const gastosSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    fecha: {type: Date, required: true},
    numero_factura: {type: String, required: true, unique: true},
    descripcion: {type: String},
    total: {type: Number, required: true},
    insumos_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Insumos'},
    semillas_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Semillas'},
    mantenimiento_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Mantenimiento'}

});

export default mongoose.model("Gasto", gastosSchema);



