import mongoose from "mongoose";

const gastosSchema = new mongoose.Schema({
    idInsumo: {type: mongoose.Schema.Types.ObjectId, ref: 'Insumo'},
    idSemilla: {type: mongoose.Schema.Types.ObjectId, ref: 'Semilla'},
    idMantenimiento: {type: mongoose.Schema.Types.ObjectId, ref: 'Mantenimiento'},
    nombre: {type: String, required: true},
    fecha: {type: Date, default:Date.now},
    numero_factura: {type: String, required: true, unique: true},
    descripcion: {type: String, required: true},
    total: {type: Number, required: true},
    estado:{type:Number, default:1}

});

export default mongoose.model("Gasto", gastosSchema);



