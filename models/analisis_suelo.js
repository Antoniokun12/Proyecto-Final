import mongoose from "mongoose";

const analisis_sueloSchema=new mongoose.Schema({
  idParcela: {type: mongoose.Schema.Types.ObjectId, ref: 'Parcela', required: true},
  idEmpleado: {type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true},
  muestra: {type: String, required: true},
  cultivo: {type: String, required: true},
  laboratorio: {type: String, required: true},
  resultados: {type: String, required: true},
  recomendaciones:{type: String, required: true},
  estado:{type:Number, default:1}
})

export default mongoose.model("Analisis",analisis_sueloSchema)