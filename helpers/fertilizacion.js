import Fertilizacion from "../models/fertilizacion.js";
import Cultivo from "../models/cultivos.js";
import Empleado from "../models/empleados.js";
import Inventario from "../models/inventario.js";

const helpersFertilizacion={
    validarExistaId:async (id)=>{
        const existe = await Fertilizacion.findById(id)
        if (existe==undefined){
            throw new Error ("Id Fertilizacion no existe")
        }
    },
    validaridCultivo:async (idCultivo)=>{
        const existe = await Cultivo.findById(idCultivo)
        if (existe==undefined){
            throw new Error ("Id Cultivo no existe")
        }
    },
    validaridEmpleado:async (idEmpleado)=>{
        const existe = await Empleado.findById(idEmpleado)
        if (existe==undefined){
            throw new Error ("id Empleado no existe")
        }
    },
    validaridInventario:async (idInventario)=>{
        const existe = await Inventario.findById(idInventario)
        if (existe==undefined){
            throw new Error ("id Inventario no existe")
        }
    },
    validarcantidad: async (cantidad) => {
        if (isNaN(cantidad)) {
          throw new Error("La cantidad debe ser un número");
        }
      },
}

export default helpersFertilizacion