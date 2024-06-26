import empleados from "../models/Administrador.js"
const helpersEmpleados={
    validaradministrador:async (_id)=>{
        const existe = await empleados.find({_id})
        if (existe){
            throw new Error ("Id Existe")
        }
    },
    validarExistaId:async (_id)=>{
        const existe = await empleados.findById(_id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    } 
}

export default helpersEmpleados