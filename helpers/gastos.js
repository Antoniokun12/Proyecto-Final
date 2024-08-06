import Gasto from "../models/gastos.js"
import Insumo from "../models/insumos.js"
import Semilla from "../models/semillas.js"
import Mantenimiento from "../models/mantenimiento.js"


const helpersGastos={
    validarExistaId:async (id)=>{
        const existe = await Gasto.findById(id)
        if (existe==undefined){
            throw new Error ("Id Gasto no existe")
        }
    },
    validaridInsumo:async (idInsumo)=>{
        const existe = await Insumo.findById(idInsumo)
        if (existe==undefined){
            throw new Error ("id Insumo no existe")
        }
    },
    validaridSemilla:async (idSemilla)=>{
        const existe = await Semilla.findById(idSemilla)
        if (existe==undefined){
            throw new Error ("id Semilla no existe")
        }
    },
    validaridMantenimiento:async (idMantenimiento)=>{
        const existe = await Mantenimiento.findById(idMantenimiento)
        if (existe==undefined){
            throw new Error ("id Mantenimiento no existe")
        }
    },
}

export default helpersGastos