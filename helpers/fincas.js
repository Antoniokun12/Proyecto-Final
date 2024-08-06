import Finca from "../models/fincas.js";
import Administrador from "../models/administrador.js";

const helpersFincas={
    validarExistaId:async (id)=>{
        const existe = await Finca.findById(id)
        if (existe==undefined){
            throw new Error ("Id Finca no existe")
        }
    },
    validaridAdministrador:async (idAdministrador)=>{
        const existe = await Administrador.findById(idAdministrador)
        if (existe==undefined){
            throw new Error ("id Administrador no existe")
        }
    },

    rutExiste: async (rut) => {
        const existe = await Finca.findOne({ rut });
        if (existe) {
            throw new Error("El rut electrónico ya está registrado");
        }
    },

    rutExisteExceptoPropio: async (rut, id) => {
        const existe = await Finca.findOne({ rut, _id: { $ne: id } });
        if (existe) {
            throw new Error("El rut electrónico ya está registrado por otra finca");
        }
    },
}

export default helpersFincas