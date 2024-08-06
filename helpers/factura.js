import Factura from "../models/factura.js";
import Comprador from "../models/comprador.js";
import Inventario from "../models/inventario.js";

const helpersFactura={
    validarExistaId:async (id)=>{
        const existe = await Factura.findById(id)
        if (existe==undefined){
            throw new Error ("Id Factura no existe")
        }
    },
    validaridComprador:async (idComprador)=>{
        const existe = await Comprador.findById(idComprador)
        if (existe==undefined){
            throw new Error ("id Comprador no existe")
        }
    },
    validaridInventario:async (idInventario)=>{
        const existe = await Inventario.findById(idInventario)
        if (existe==undefined){
            throw new Error ("id Inventario no existe")
        }
    },
    validarValor: async (valor) => {
        if (isNaN(valor)) {
          throw new Error("El valor debe ser un número");
        }
      },
      validarcantidad: async (cantidad) => {
        if (isNaN(cantidad)) {
          throw new Error("La cantidad debe ser un número");
        }
      },
}

export default helpersFactura