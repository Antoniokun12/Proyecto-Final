import mongoose from "mongoose";

const SemillaSchema = new mongoose.Schema({
    idproveedores: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedores', required: true },
    numFactura:{type: number,required:true},
    fechaCompra:{type: Date,required:true},
    fechaVencimiento:{type: Date,required:true},
    especie:{type: String,required:true},
    NumLote:{type: Number,required:true},
    origen:{type: String,required:true},
    poderGerminativo:{type: String,required:true},
    unidadtotal:{type: Number,required:true},
    total:{type: Number,required:true},
})

export default mongoose.model("Semillas", SemillaSchema)

