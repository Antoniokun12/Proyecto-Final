import Siembra from "../models/siembra.js";
import Cultivo from "../models/cultivos.js";
import Empleado from "../models/empleados.js";
import Inventario from "../models/inventario.js";

const helpersSiembra={
    validarExistaId:async (id)=>{
        const existe = await Siembra.findById(id)
        if (existe==undefined){
            throw new Error ("Id Siembra no existe")
        }
    },
    validaridCultivo:async (idCultivo)=>{
        const existe = await Cultivo.findById(idCultivo)
        if (existe==undefined){
            throw new Error ("id Cultivo no existe")
        }
    },
    validaridInventario:async (idInventario)=>{
        const existe = await Inventario.findById(idInventario)
        if (existe==undefined){
            throw new Error ("id Inventario no existe")
        }
    },
    validaridEmpleado:async (idEmpleado)=>{
        const existe = await Empleado.findById(idEmpleado)
        if (existe==undefined){
            throw new Error ("id Empleado no existe")
        }
    },
}
export default helpersSiembra