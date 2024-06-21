import analisisSuelo from "../models/Administrador.js"
const helpersAnalisisSuelo={
    validaradministrador:async (_id)=>{
        const existe = await analisisSuelo.find({_id})
        if (existe){
            throw new Error ("Id Existe")
        }
    },
    validarExistaId:async (_id)=>{
        const existe = await analisisSuelo.findById(_id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    } 
}

export default helpersAnalisisSuelo