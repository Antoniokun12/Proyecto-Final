import Suelo from "../models/preparacion_suelo.js";
import Parcela from "../models/parcelas.js";
import Empleado from "../models/empleados.js";

const helpersPreparacion={
    validarExistaId:async (id)=>{
        const existe = await Suelo.findById(id)
        if (existe==undefined){
            throw new Error ("Id Suelo no existe")
        }
    },
    validaridParcela:async (idParcela)=>{
        const existe = await Parcela.findById(idParcela)
        if (existe==undefined){
            throw new Error ("id Parcela no existe")
        }
    },
    validaridEmpleado:async (idEmpleado)=>{
        const existe = await Empleado.findById(idEmpleado)
        if (existe==undefined){
            throw new Error ("id Empleado no existe")
        }
    },
}

export default helpersPreparacion