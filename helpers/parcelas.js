import Parcela from "../models/parcelas.js"
import Finca from "../models/fincas.js"

const helpersParcelas={
    validarExistaId:async (id)=>{
        const existe = await Parcela.findById(id)
        if (existe==undefined){
            throw new Error ("Id Parcela no existe")
        }
    },
    validaridFinca:async (idFinca)=>{
        const existe = await Finca.findById(idFinca)
        if (existe==undefined){
            throw new Error ("id Finca no existe")
        }
    },
}

export default helpersParcelas