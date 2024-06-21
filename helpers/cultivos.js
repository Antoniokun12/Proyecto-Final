import cultivo from "../models/Administrador.js"
const helpersCultivo={
    validaradministrador:async (_id)=>{
        const existe = await cultivo.find({_id})
        if (existe){
            throw new Error ("Id Existe")
        }
    },
    validarExistaId:async (_id)=>{
        const existe = await cultivo.findById(_id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    } 
}

export default helpersCultivo