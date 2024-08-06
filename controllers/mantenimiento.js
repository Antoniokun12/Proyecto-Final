import Mantenimiento from "../models/mantenimiento.js";
// import { json } from "express";
// import cron from "node-cron"
const httpMantenimientos = {
    getMantenimientos: async (req, res) => {
        const {busqueda} = req.query
        const mantenimiento = await Mantenimiento.find(
            {
                $or: [
                    {nombre: new RegExp(busqueda, "i") }
                ]
            }
        )
        res.json({ mantenimiento })
    },
    getMantenimientosID: async (req, res) => {
        const {_id} = req.params
        const mantenimiento = await Mantenimiento.findById(_id)
        res.json({ mantenimiento })
    },
    getMantenimientoactivado: async (req, res) => {
        try {
            const activados = await Mantenimiento.find({ estado: 1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener Mantenimiento activado' });
        }
    },

    getMantenimientodesactivado: async (req, res) => {
        try {
        const desactivados = await Mantenimiento.find({ estado: 0 })
        res.json({ desactivados })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener Mantenimiento desactivado' });
    }
    },
    postMantenimientos: async (req, res) => {
        try {
            const {idMaquina,verificacionRealizada,calibracion,responsable,observaciones}=req.body
            const mantenimiento = new Mantenimiento({idMaquina,verificacionRealizada,calibracion,responsable,observaciones});
            await mantenimiento.save()
            console.log(mantenimiento);
            res.json({ message: "el mantenimiento fue creado exitosamente ", mantenimiento });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "No se pudo crear el mantenimiento" })
        }

    },
    putMantenimientos:async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, estado, ...resto } = req.body;
        
            const mantenimientoActualizado = await Mantenimiento.findByIdAndUpdate(id, resto, { new: true });
        
            res.json({ mantenimiento: mantenimientoActualizado });
          } catch (error) {

            console.error("Error updating Mantenimiento:", error);
            res.status(400).json({ error: error.message || "No se pudo actualizar el Mantenimiento" });
          }
    },
    putMantenimientosActivar:async (req,res) => {
        const { id } = req.params;
        try {
            const mantenimiento = await Mantenimiento.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!mantenimiento) {
                return res.status(404).json({ error: "mantenimiento no encontrado" });
            }
            res.json({ mantenimiento });
        } catch (error) {
            console.error("Error al activar mantenimiento", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    putMantenimientosDesactivar:async (req,res) => {
        const { id } = req.params;
        try {
            const mantenimiento = await Mantenimiento.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!mantenimiento) {
                return res.status(404).json({ error: "mantenimiento no encontrado" });
            }
            res.json({ mantenimiento });
        } catch (error) {
            console.error("Error al desactivar mantenimiento", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default httpMantenimientos