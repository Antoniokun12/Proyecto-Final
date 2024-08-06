import Administrador from "../models/administrador.js"; 
import bcryptjs from "bcryptjs";
import { generarJWT } from '../middlewares/validar-jwt.js';

const httpAdministrador = {
    getAdmin: async (req, res) => {
        try {
            const { busqueda } = req.query;
            const admin = await Administrador.find({
                $or: [{ nombre: new RegExp(busqueda, "i") }]
            });
            res.json({ admin });
        } catch (error) {
            console.log(error);
            res.status(500).json({ err: "Error al obtener administradores" });
        }
    },
    getAdminID: async (req, res) => {
        try {
            const { id } = req.params;
            const admin = await Administrador.findById(id);
            if (!admin) {
                return res.status(404).json({ err: "Administrador no encontrado" });
            }
            res.json({ admin });
        } catch (error) {
            console.log(error);
            res.status(500).json({ err: "Error al obtener administrador" });
        }
    },
    getAdministradoractivado: async (req, res) => {
        try {
            const activados = await Administrador.find({ estado: 1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener Administrador activado' });
        }
    },

    getAdministradordesactivado: async (req, res) => {
        try {
        const desactivados = await Administrador.find({ estado: 0 })
        res.json({ desactivados })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener Administrador desactivado' });
    }
    },
    postAdmin: async (req, res) => {
        try {
            console.log('Body recibido completo:', req.body);
            const { nombre, cedula, direccion, email, password, municipio, telefono } = req.body;
            console.log('Datos recibidos:', { nombre, cedula, direccion, email, password, municipio, telefono });
            const admin = new Administrador({ nombre, cedula, direccion, email, password, municipio, telefono });
            const salt = bcryptjs.genSaltSync();
            admin.password = bcryptjs.hashSync(password, salt);
            await admin.save();
            res.json({ message: "Administrador creado", Administrador: admin });
        } catch (error) {
            console.error('Error al crear administrador:', error);
            res.status(400).json({ error: "No se pudo crear el administrador", details: error.message });
        }
    },       
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await Administrador.findOne({ email });
            if (!user || user.estado === 0) {
                return res.status(401).json({ msg: "Usuario / Password no son correctos" });
            }
            const validPassword = bcryptjs.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ msg: "Usuario / Password no son correctos" });
            }
            const token = await generarJWT(user.id);
            res.json({ usuario: user, token });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Hable con el WebMaster" });
        }
    },
    getemail: async (req, res) => {
        const { email } = req.query;
        try {
          const user = await Administrador.findOne({ email: email });
          if (!user || user.estado === 0) {
            return res.status(401).json({ msg: "Email incorrecto" });
          }
          const token = await generarJWT(user._id);
        res.json({ usuario: user, token });
          return res.status(200).json({ msg: "Email válido" });
        } catch (error) {
          return res.status(500).json({ msg: "Comuníquese con el admin." });
        }
      },
      recuperarPassword: async (req, res) => {
        const { email } = req.body;
        try {
          const user = await Administrador.findOne({ email });
          if (!user) {
            return res.status(404).json({ msg: 'Administrador no encontrado' });
          }
    
          const token = await generarJWT(user._id, user.rol);
          await enviarCorreoRecuperacion(email, token);
    
          res.json({ msg: 'Correo de recuperación enviado' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ msg: 'Error interno del servidor' });
        }
      },
      putAdmin: async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, estado, password, ...resto } = req.body;  // Excluir el campo password
    
            const adminActualizado = await Administrador.findByIdAndUpdate(id, resto, { new: true });
    
            res.json({ admin: adminActualizado });
        } catch (error) {
            console.error("Error updating Administrador:", error);
            res.status(400).json({ error: error.message || "No se pudo actualizar Administrador" });
        }
    },
    putAdminActivar: async (req, res) => {
        const {id } = req.params;
        try {
            const admin = await Administrador.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!admin) {
                return res.status(404).json({ err: "Administrador no encontrado" });
            }
            res.json({ admin });
        } catch (error) {
            console.log(error);
            res.status(400).json({ err: "No se pudo activar el administrador" });
        }
    },
    putAdminDesactivar: async (req, res) => {
        const { id } = req.params;
        try {
            const admin = await Administrador.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!admin) {
                return res.status(404).json({ err: "Administrador no encontrado" });
            }
            res.json({ admin });
        } catch (error) {
            console.log(error);
            res.status(400).json({ err: "No se pudo desactivar el administrador" });
        }
    }
};

export default httpAdministrador;
