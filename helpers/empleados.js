import Empleado from "../models/empleados.js";
const helpersEmpleados={
    validarExistaId:async (id)=>{
        const existe = await Empleado.findById(id)
        if (existe==undefined){
            throw new Error ("Id Empleado no existe")
        }
    },
    documentoExiste: async (documento) => {
        const existe = await Empleado.findOne({ documento });
        if (existe) {
            throw new Error("La cédula ya está registrada");
        }
    },

    correoExiste: async (correo) => {
        const existe = await Empleado.findOne({ correo });
        if (existe) {
            throw new Error("El correo electrónico ya está registrado");
        }
    },

    documentoExisteExceptoPropio: async (documento, id) => {
        const existe = await Empleado.findOne({ documento, _id: { $ne: id } });
        if (existe) {
            throw new Error("La cédula ya está registrada por otro usuario");
        }
    },

    correoExisteExceptoPropio: async (correo, id) => {
        const existe = await Empleado.findOne({ correo, _id: { $ne: id } });
        if (existe) {
            throw new Error("El correo electrónico ya está registrado por otro usuario");
        }
    },
    validarPassword: async (password) => {
        const letras = password.replace(/[^a-zA-Z]/g, '').length;
        const numeros = password.replace(/\D/g, '').length;
    
        if (letras < 3 || numeros < 3) {
            throw new Error("La contraseña debe contener al menos tres letras y tres números");
        }
    },
}

export default helpersEmpleados