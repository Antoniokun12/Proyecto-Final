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
            const { _id } = req.params;
            const admin = await Administrador.findById(_id);
            if (!admin) {
                return res.status(404).json({ err: "Administrador no encontrado" });
            }
            res.json({ admin });
        } catch (error) {
            console.log(error);
            res.status(500).json({ err: "Error al obtener administrador" });
        }
    },
    postAdmin: async (req, res) => {
        try {
            const { nombre, cedula, direccion, email, password, municipio, telefono } = req.body;
            const admin = new Administrador({ nombre, cedula, direccion, email, password, municipio, telefono });
            const salt = bcryptjs.genSaltSync();
            admin.password = bcryptjs.hashSync(password, salt)
            await admin.save();
            res.json({ message: "Administrador creado", administrador: admin });
        } catch (error) {
            console.log(error);
            res.status(400).json({ err: "No se pudo crear el administrador" });
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
    putAdmin: async (req, res) => {
        const { _id } = req.params;
        const { municipio, ...resto } = req.body;
        try {
            const admin = await Administrador.findByIdAndUpdate(_id, { ...resto, municipio }, { new: true });
            if (!admin) {
                return res.status(404).json({ err: "Administrador no encontrado" });
            }
            res.json(admin);
        } catch (error) {
            console.log(error);
            res.status(400).json({ err: "No se pudo actualizar el administrador" });
        }
    },
    putAdminActivar: async (req, res) => {
        const { _id } = req.params;
        try {
            const admin = await Administrador.findByIdAndUpdate(_id, { estado: 1 }, { new: true });
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
        const { _id } = req.params;
        try {
            const admin = await Administrador.findByIdAndUpdate(_id, { estado: 0 }, { new: true });
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
