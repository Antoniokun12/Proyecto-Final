import Empleado from "../models/empleados.js";
// import { json } from "express";
// import cron from "node-cron"
const httpEmpleados = {
    getEmpleados: async (req, res) => {
        const {busqueda} = req.query
        const empleado = await Empleado.find(
            {
                $or: [
                    {nombre: new RegExp(busqueda, "i") }
                ]
            }
        )
        res.json({ empleado })
    },
    getEmpleadosID: async (req, res) => {
        const {_id} = req.params
        const empleado = await Empleado.findById(_id)
        res.json({ empleado })
    },
    getEmpleadoactivado: async (req, res) => {
        try {
            const activados = await Empleado.find({ estado: 1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el empleado activado' });
        }
    },

    getEmpleadodesactivado: async (req, res) => {
        try {
        const desactivados = await Empleado.find({ estado: 0 })
        res.json({ desactivados })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el empleado desactivado' });
    }
    },
    postEmpleados: async (req, res) => {
        try {
            const {nombre,documento,correo,password,direccion,fechaNacimiento,telefono,estudios,descripcion}=req.body;
            const empleado = new Empleado ({nombre,documento,correo,password,direccion,fechaNacimiento,telefono,estudios,descripcion,});
            await empleado.save()
            console.log(empleado);
            res.json({ message: "empleado creado exitosamente", empleado });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "No se pudo crear el empleado" })
        }
    },
    putEmpleados:async (req, res) => {
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
    putEmpleadosActivar:async (req,res) => {
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
    putEmpleadosDesactivar:async (req,res) => {
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

