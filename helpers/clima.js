import Clima from "../models/clima.js"
import Finca from "../models/fincas.js"
import Empleado from "../models/empleados.js"

const helpersClima={
    validarExistaId:async (id)=>{
        const existe = await Clima.findById(id)
        if (existe==undefined){
            throw new Error ("Id Clima no existe")
        }
    },
    validaridFinca:async (idFinca)=>{
        const existe = await Finca.findById(idFinca)
        if (existe==undefined){
            throw new Error ("Id Finca no existe")
        }
    },
    validaridEmpleado:async (idEmpleado)=>{
        const existe = await Empleado.findById(idEmpleado)
        if (existe==undefined){
            throw new Error ("id Empleado no existe")
        }
    },
}

export default helpersClima