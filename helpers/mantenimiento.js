import Mantenimiento from "../models/mantenimiento.js"
// import Gasto from "../models/gastos.js"
import Maquina_herramienta from "../models/maquinas&herramientas.js"

const helpersManteminentos={
    validarExistaId:async (id)=>{
        const existe = await Mantenimiento.findById(id)
        if (existe==undefined){
            throw new Error ("Id Mantenimiento no existe")
        }
    },
    // validaridGasto:async (idGasto)=>{
    //     const existe = await Gasto.findById(idGasto)
    //     if (existe==undefined){
    //         throw new Error ("id Gasto no existe")
    //     }
    // },
    validaridMaquina_herramienta:async (idMaquina)=>{
        const existe = await Maquina_herramienta.findById(idMaquina)
        if (existe==undefined){
            throw new Error ("id Maquina & herramienta no existe")
        }
    },
}

export default helpersManteminentos