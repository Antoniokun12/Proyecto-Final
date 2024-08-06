import Inventario from "../models/inventario.js"
import Semilla from "../models/semillas.js"
import Insumo from "../models/insumos.js"
import Maquina_herramienta from "../models/maquinas&herramientas.js"

const helpersInventarios={
    validarExistaId:async (id)=>{
        const existe = await Inventario.findById(id)
        if (existe==undefined){
            throw new Error ("Id Inventario no existe")
        }
    },
    validaridSemilla:async (idSemilla)=>{
        const existe = await Semilla.findById(idSemilla)
        if (existe==undefined){
            throw new Error ("id Semilla no existe")
        }
    },
    validaridInsumo:async (idInsumo)=>{
        const existe = await Insumo.findById(idInsumo)
        if (existe==undefined){
            throw new Error ("id Insumo no existe")
        }
    },
    validaridMaquina_herramienta:async (idMaquina_herramienta)=>{
        const existe = await Maquina_herramienta.findById(idMaquina_herramienta)
        if (existe==undefined){
            throw new Error ("id Maquina & herramienta no existe")
        }
    },
}

export default helpersInventarios