import mongoose from "mongoose";

const proveedorSchema = new mongoose.Schema({
    nombre:{type: String,required:true},
    direccion:{type: String,required:true},
    telefono:{type: String,required:true},
    email:{type: String,required:true, unique:true},
})

export default mongoose.model("Proveedor", proveedorSchema)
