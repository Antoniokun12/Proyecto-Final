import Maquina_herramienta from "../models/maquinas&herramientas.js"
import Proveedor from "../models/proveedores.js"

const helpersMaquinaria={
    validarExistaId:async (id)=>{
        const existe = await Maquina_herramienta.findById(id)
        if (existe==undefined){
            throw new Error ("Id Maquina & herramienta no existe")
        }
    },
    validaridProveedor:async (idProveedor)=>{
        const existe = await Proveedor.findById(idProveedor)
        if (existe==undefined){
            throw new Error ("id Proveedor no existe")
        }
    },
}

export default helpersMaquinaria