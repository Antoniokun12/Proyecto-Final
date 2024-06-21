import elaboracionSustrato from "../models/Administrador.js"
const helpersElaboracionSustrato={
    validaradministrador:async (_id)=>{
        const existe = await elaboracionSustrato.find({_id})
        if (existe){
            throw new Error ("Id Existe")
        }
    },
    validarExistaId:async (_id)=>{
        const existe = await elaboracionSustrato.findById(_id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    } 
}

export default helpersElaboracionSustrato