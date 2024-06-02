import mongoose from "mongoose";

const ProveedorSchema = new mongoose.Schema({
    nombre:{type: String,required:true},
    direccion:{type: String,required:true},
    telefono:{type: String,required:true},
    email:{type: String,required:true},
})

export default mongoose.model("Proveedor", ProveedorSchema)
