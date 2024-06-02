
import mongoose from "mongoose";

const preparacion_sueloSchema = new mongoose.Schema({
  fecha: { type: Date, default: Date.now()},
  idParcela:{type:mongoose.Schema.Types.ObjectId,ref:'Parcela',required:true},
  idEmpleado:{type:mongoose.Schema.Types.ObjectId,ref:'Empleado',required:true},
  productos:[{
    ingredienteActivo:{type: String, required: true},
    dosis:{type: String, required: true},
    metodoAplicacion:{type: String, required: true},
  }],
  operario:{type: String, required: true},
  responsable:{type: String, required: true},
  observaciones:{type: String, required: true},
});

export default mongoose.model("Suelo",preparacion_sueloSchem);