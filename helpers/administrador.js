import Administrador from "../models/Administrador.js"
const helpersAdministrador={
    // validarClienteUnica:async (_id)=>{
    //     const existe = await Administrador.find({_id})
    //     if (existe){
    //         throw new Error ("Id Existe")
    //     }
    // },
    validarExistaId:async (id)=>{
        const existe = await Administrador.findById(id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    } 
}

export default helpersAdministrador