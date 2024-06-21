import clima from "../models/Administrador.js"
const helpersClima={
    validaradministrador:async (_id)=>{
        const existe = await clima.find({_id})
        if (existe){
            throw new Error ("Id Existe")
        }
    },
    validarExistaId:async (_id)=>{
        const existe = await clima.findById(_id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    } 
}

export default helpersClima