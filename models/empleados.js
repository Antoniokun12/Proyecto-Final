import mongoose from "mongoose";

const empleadosSchema = new mongoose.Schema({
  nombre: { type: String, require: true },
  documento: { type: String, required: true, unique: true },
  correo: { type: String, required: true },
  contraseña: { type: String, required: true },
  direccion: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  telefono: { type: String, required: true},
  estudios: { type: String, required: true},
  descripcion: { type: String, required: true},
});

export default mongoose.model("Empleado",empleadosSchema);