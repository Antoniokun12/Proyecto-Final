import mongoose from "mongoose";

const nominaSchema = new mongoose.Schema({
    fecha: {type: Date, required: true},
    id_empleados: {type: mongoose.Schema.Types.ObjectId, ref: 'Empleados', required: true},
    tipo: {type: String, required: true},
    valor: {type: Number, required: true}
});

export default mongoose.model("Nomina", nominaSchema);
