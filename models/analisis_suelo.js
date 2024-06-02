import mongoose from "mongoose";

const analisis_sueloSchema=new mongoose.Schema({
  idParcela: {type: mongoose.Schema.Types.ObjectId, ref: 'Parcela', required: true},
  idEmpleado: {type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true},
  fecha: {type: Date.now(), required: true},
  muestra: {type: String, required: true},
  calibracion: {type: String},
  responsable: {type: String, required: true},
  observaciones: {type: String}
})

export default mongoose.model("Analisis",analisis_sueloSchema)