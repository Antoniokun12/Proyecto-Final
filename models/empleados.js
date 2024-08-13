import mongoose from "mongoose";

const empleadosSchema = new mongoose.Schema({
  nombre: { type: String, require: true },
  documento: { type: String, required: true, unique: true },
  correo: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
  direccion: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  telefono: { type: String, required: true },
  estudios: { type: String, required: true },
  descripcion: { type: String, required: true },
  fechaContratacion: { type: Date, default: Date.now },
  estado: { type: Number, default: 1 }
});

export default mongoose.model("Empleado", empleadosSchema);