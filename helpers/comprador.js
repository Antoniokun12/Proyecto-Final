import Comprador from "../models/comprador.js"
import Produccion from "../models/produccion.js"

const helpersComprador={
    validarExistaId:async (id)=>{
        const existe = await Comprador.findById(id)
        if (existe==undefined){
            throw new Error ("Id Comprador no existe")
        }
    },

    validaridProduccion:async (idProduccion)=>{
        const existe = await Produccion.findById(idProduccion)
        if (existe==undefined){
            throw new Error ("id Produccion no existe")
        }
    },
}

export default helpersComprador