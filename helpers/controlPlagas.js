import controlPlagas from "../models/Administrador.js"
const helpersControlPlagas={
    validaradministrador:async (_id)=>{
        const existe = await controlPlagas.find({_id})
        if (existe){
            throw new Error ("Id Existe")
        }
    },
    validarExistaId:async (_id)=>{
        const existe = await controlPlagas.findById(_id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    } 
}

export default helpersControlPlagas