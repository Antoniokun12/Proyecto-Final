// de aqui hacia abajo layton

import mongoose from "mongoose";

const elaboracion_sustratoSchema = new mongoose.Schema({
    idProceso:{type:mongoose.Schema.Types.ObjectId,ref:'Proceso',required:true},
  fecha: { type: Date, default: Date.now()},
  productoComercial:{ type: String, required: true },
  ingredienteActivo:{ type: String, required: true },
  dosisUtilizada:{ type: String, required: true },
  metodoAplicacion:{ type: String, required: true},
 empleado_idOperario:{type:mongoose.Schema.Types.ObjectId,ref:'Empleado',required:true},
 empleado_idResponsable:{type:mongoose.Schema.Types.ObjectId,ref:'Empleado',required:true},
 observaciones:{ type: String, required: true}
});

export default mongoose.model("Sustrato",elaboracion_sustratoSchema);