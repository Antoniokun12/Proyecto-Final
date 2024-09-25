import Maquina_herramienta from "../models/maquinas&herramientas.js"
import Proveedor from "../models/proveedores.js"
import Insumo from "../models/insumos.js"
import Empleado from "../models/empleados.js"

const helpersMaquinaria={
    validarExistaId:async (id)=>{
        const existe = await Maquina_herramienta.findById(id)
        if (existe==undefined){
            throw new Error ("Id Maquina & herramienta no existe")
        }
    },
    validaridInsumo:async (idInsumo)=>{
        const existe = await Insumo.findById(idInsumo)
        if (existe==undefined){
            throw new Error ("id Insumo no existe")
        }
    },
    validaridEmpleado:async (idEmpleado)=>{
        const existe = await Empleado.findById(idEmpleado)
        if (existe==undefined){
            throw new Error ("id Empleado no existe")
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