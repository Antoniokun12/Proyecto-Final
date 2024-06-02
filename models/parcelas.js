import mongoose from "mongoose";

const ParcelasSchema = new mongoose.Schema({
    idfincas:{type:mongoose.Schema.Types.ObjectId,ref:'Fincas',required:true},
    ubicacion:{type:String,required:true},
    numero:{type:Number,required:true},
    cultivoAnterior:{type:String,required:true},
    cultivoActual:{type:Number,required:true},
    detalle:{type:String,required:true},
    estado:{type:Number,required:true},
    area:{type:Number,required:true},
    asistenteTecnico:{type:String,required:true}
})


export default mongoose.model("Parcela",ParcelasSchema)