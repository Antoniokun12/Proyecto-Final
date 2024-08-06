import Semilla from "../models/semillas.js";
import Proveedor from "../models/proveedores.js";

const helpersSemillas={
    validarExistaId:async (id)=>{
        const existe = await Semilla.findById(id)
        if (existe==undefined){
            throw new Error ("Id Semilla no existe")
        }
    },
    validaridProveedor:async (idProveedor)=>{
        const existe = await Proveedor.findById(idProveedor)
        if (existe==undefined){
            throw new Error ("id Proveedor no existe")
        }
    },
}

export default helpersSemillas