import Administrador from "../models/administrador.js"
const helpersAdministrador = {

    validarExistaId: async (id) => {
        const existe = await Administrador.findById(id)
        if (existe == undefined) {
            throw new Error("Id no existe")
        }
    },
    validarPassword: async (password) => {
        const letras = password.replace(/[^a-zA-Z]/g, '').length;
        const numeros = password.replace(/\D/g, '').length;

        if (letras < 3 || numeros < 3) {
            throw new Error("La contraseña debe contener al menos tres letras y tres números");
        }
    },
    Noexisteelcorreo: async (email) => {
        const user = await Administrador.findOne({ email: email });
        if (!user) {
            console.log('El correo electrónico no es válido');
            throw new Error("usuario o contraseña incorrecto");

        }
    },
    // cedulaExiste: async (cedula) => {
    //     const existe = await Administrador.findOne({ cedula });
    //     if (existe) {
    //         throw new Error("La cédula ya está registrada");
    //     }
    // },

    // emailExiste: async (email) => {
    //     const existe = await Administrador.findOne({ email });
    //     if (existe) {
    //         throw new Error("El correo electrónico ya está registrado");
    //     }
    // },
        cedulaExiste: async (cedula) => {
            console.log('Verificando cédula:', cedula);
            const existe = await Administrador.findOne({ cedula });
            if (existe) {
                console.log('Cédula ya está registrada');
                throw new Error("La cédula ya está registrada");
            }
        },
    
        emailExiste: async (email) => {
            console.log('Verificando email:', email);
            const existe = await Administrador.findOne({ email });
            if (existe) {
                console.log('Email ya está registrado');
                throw new Error("El correo electrónico ya está registrado");
            }
        },
    
    cedulaExisteExceptoPropio: async (cedula, id) => {
        const existe = await Administrador.findOne({ cedula, _id: { $ne: id } });
        if (existe) {
            throw new Error("La cédula ya está registrada por otro usuario");
        }
    },

    emailExisteExceptoPropio: async (email, id) => {
        const existe = await Administrador.findOne({ email, _id: { $ne: id } });
        if (existe) {
            throw new Error("El correo electrónico ya está registrado por otro usuario");
        }
    }

}

export default helpersAdministrador