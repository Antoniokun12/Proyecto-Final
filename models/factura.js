import mongoose from "mongoose";

const facturaSchema = new mongoose.Schema({
    idComprador:{type:mongoose.Schema.Types.ObjectId,ref:'Comprador',required:true},
    createdAt:{type:Date,default:Date.now},
    nloteComercial:{type:String,required:true},
    valor:{type:Number},
    detalle:[
        {
            idProduccion:{type:mongoose.Schema.Types.ObjectId,ref:'Produccion',required:true},
            nombreProducto:{type:String,required:true},
            cantidad:{type:Number,required:true},
            subtotal:{type:Number, required:true},
            total:{type:Number},
            iva:{type:Number}}
        ]
    })
    
export default mongoose.model("Factura",facturaSchema)
