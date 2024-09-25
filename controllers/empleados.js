import Empleado from "../models/empleados.js";
// import { json } from "express";
// import cron from "node-cron"
const httpEmpleados = {
   
    getEmpleados: async (req, res) => {
        try {
            const empleados = await Empleado.find().sort({ _id: -1 }); // Trae todos los empleados
            res.json({ empleados });
        } catch (error) {
            console.error("Error al obtener empleados:", error);
            res.status(500).json({ error: "Error al obtener empleados" });
        }
    },
    getEmpleadosID: async (req, res) => {
        const { id } = req.params
        const empleado = await Empleado.findById(id)
        res.json({ empleado })
    },
    getEmpleadosByFinca: async (req, res) => {
        try {
            const { idFinca } = req.params; 
    
            const empleados = await Empleado.find({ idFinca }).sort({ _id: -1 });
    
            res.status(200).json({ empleados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Error al obtener empleados" });
        }
    },
    getEmpleadoactivado: async (req, res) => {
        try {
            const activados = await Empleado.find({ estado: 1 }).sort({ _id: -1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el empleado activado' });
        }
    },

    getEmpleadodesactivado: async (req, res) => {
        try {
            const desactivados = await Empleado.find({ estado: 0 }).sort({ _id: -1 });
            res.json({ desactivados })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el empleado desactivado' });
        }
    },
    postEmpleados: async (req, res) => {
        try {
            const { idFinca,nombre, documento, correo, direccion, fechaNacimiento, telefono, estudios, descripcion } = req.body;
            const empleado = new Empleado({idFinca,nombre, documento, correo, direccion, fechaNacimiento, telefono, estudios, descripcion, });
            await empleado.save()
            console.log(empleado);
            res.json({ message: "empleado creado exitosamente", empleado });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "No se pudo crear el empleado" })
        }
    },
    putEmpleados: async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, estado, password, ...resto } = req.body;

            const empeladoActualizado = await Empleado.findByIdAndUpdate(id, resto, { new: true });

            res.json({ empleado: empeladoActualizado });
        } catch (error) {
            console.error("Error updating empleado:", error);
            res.status(400).json({ error: error.message || "No se pudo actualizar el empleado" });
        }
    },
    putEmpleadosActivar: async (req, res) => {
        const { id } = req.params;
        try {
            const empleado = await Empleado.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!empleado) {
                return res.status(404).json({ error: "empleado no encontrado" });
            }
            res.json({ empleado });
        } catch (error) {
            console.error("Error al activar empleado", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    putEmpleadosDesactivar: async (req, res) => {
        const { id } = req.params;
        try {
            const empleado = await Empleado.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!empleado) {
                return res.status(404).json({ error: "empleado no encontrado" });
            }
            res.json({ empleado });
        } catch (error) {
            console.error("Error al desactivar empleado", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default httpEmpleados

