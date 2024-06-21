import comprador from "../models/Administrador.js"
const helpersComprador={
    validaradministrador:async (_id)=>{
        const existe = await comprador.find({_id})
        if (existe){
            throw new Error ("Id Existe")
        }
    },
    validarExistaId:async (_id)=>{
        const existe = await comprador.findById(_id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    } 
}

export default helpersComprador