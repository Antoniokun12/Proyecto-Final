import Nomina from "../models/nomina.js"
import Empleado from "../models/empleados.js"

const helpersNominas={
    validarExistaId:async (id)=>{
        const existe = await Nomina.findById(id)
        if (existe==undefined){
            throw new Error ("Id Nomina no existe")
        }
    },
    validaridEmpleado:async (idEmpleado)=>{
        const existe = await Empleado.findById(idEmpleado)
        if (existe==undefined){
            throw new Error ("id Empleado no existe")
        }
    },
    validarValor: async (valor) => {
        if (isNaN(valor)) {
          throw new Error("El valor debe ser un número");
        }
      },
}

export default helpersNominas