import Sustrato from "../models/elaboracion_sustrato.js";
import Empleado from "../models/empleados.js"
import Proceso from "../models/procesos.js"


const helpersElaboracionSustrato={
    validarExistaId:async (id)=>{
        const existe = await Sustrato.findById(id)
        if (existe==undefined){
            throw new Error ("Id Sustrato no existe")
        }
    },
    validaridEmpleado:async (idEmpleado)=>{
        const existe = await Empleado.findById(idEmpleado)
        if (existe==undefined){
            throw new Error ("id Empleado no existe")
        }
    },
    validaridProceso:async (idProceso)=>{
        const existe = await Proceso.findById(idProceso)
        if (existe==undefined){
            throw new Error ("id Proceso no existe")
        }
    },
}

export default helpersElaboracionSustrato