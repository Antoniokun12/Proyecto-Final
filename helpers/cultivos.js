import Cultivo from "../models/cultivos.js"
import Parcela from "../models/parcelas.js"

const helpersCultivo={
    validarExistaId:async (id)=>{
        const existe = await Cultivo.findById(id)
        if (existe==undefined){
            throw new Error ("Id Cultivo no existe")
        }
    },
    validaridParcela:async (idParcela)=>{
        const existe = await Parcela.findById(idParcela)
        if (existe==undefined){
            throw new Error ("id Parcela no existe")
        }
    },
}

export default helpersCultivo