import ControlPlaga from "../models/control_plagas.js"
import Cultivo from "../models/cultivos.js"
import Empleado from "../models/empleados.js"

const helpersControlPlagas={
    validarExistaId:async (id)=>{
        const existe = await ControlPlaga.findById(id)
        if (existe==undefined){
            throw new Error ("Id Control de Plaga no existe")
        }
    },
    validaridCultivo:async (idCultivo)=>{
        const existe = await Cultivo.findById(idCultivo)
        if (existe==undefined){
            throw new Error ("id Cultivo no existe")
        }
    },
    validaridEmpleado:async (idEmpleado)=>{
        const existe = await Empleado.findById(idEmpleado)
        if (existe==undefined){
            throw new Error ("id Empleado no existe")
        }
    },
}

export default helpersControlPlagas