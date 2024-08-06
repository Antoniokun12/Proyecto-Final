import Produccion from "../models/produccion.js";
import Cultivo from "../models/cultivos.js";

const helpersProduccion={
    validarExistaId:async (id)=>{
        const existe = await Produccion.findById(id)
        if (existe==undefined){
            throw new Error ("Id Produccion no existe")
        }
    },
    validaridCultivo:async (idCultivo)=>{
        const existe = await Cultivo.findById(idCultivo)
        if (existe==undefined){
            throw new Error ("id Cultivo no existe")
        }
    },
}

export default helpersProduccion