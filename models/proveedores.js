import mongoose from "mongoose";

const proveedorSchema = new mongoose.Schema({
    idFinca: { type: mongoose.Schema.Types.ObjectId, ref: 'Finca', required: true },
    nombre:{type: String,required:true},
    direccion:{type: String,required:true},
    telefono:{type: String,required:true},
    email:{type: String,required:true, unique:true},
    estado:{type:Number, default:1}

})

export default mongoose.model("Proveedor", proveedorSchema)
