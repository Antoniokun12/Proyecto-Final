import Insumo from "../models/insumos.js"
import Proveedor from "../models/proveedores.js"

const helpersInsumos={
    validarExistaId:async (id)=>{
        const existe = await Insumo.findById(id)
        if (existe==undefined){
            throw new Error ("Id Insumo no existe")
        }
    },
    validaridProveedor:async (idProveedor)=>{
        const existe = await Proveedor.findById(idProveedor)
        if (existe==undefined){
            throw new Error ("id Proveedor no existe")
        }
    },
}

export default helpersInsumos