import mongoose from "mongoose";

const nominaSchema = new mongoose.Schema({
    idEmpleado: {type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true},
    fecha: {type: Date, default:Date.now},
    tipo: {type: String, required: true},
    valor: {type: Number, required: true}
});

export default mongoose.model("Nomina", nominaSchema);
