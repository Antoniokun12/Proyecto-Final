import mongoose from "mongoose";

const nominaSchema = new mongoose.Schema({
  idFinca: { type: mongoose.Schema.Types.ObjectId, ref: 'Finca', required: true },
    idEmpleado: {type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true},
    fecha: {type: Date, default:Date.now},
    tipo: {type: String, required: true},
    valor: {type: Number, required: true},
    estado: { type: Number, default: 1 }
});

export default mongoose.model("Nomina", nominaSchema);
