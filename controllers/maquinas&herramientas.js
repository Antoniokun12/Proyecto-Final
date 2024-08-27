import Maquina_herramienta from "../models/maquinas&herramientas.js";
// import { json } from "express";
// import cron from "node-cron"
const httpMaquinarias = {
    // getMaquinarias: async (req, res) => {
    //     const {busqueda} = req.query
    //     const maquinaria = await Maquina_herramienta.find(
    //         {
    //             $or: [
    //                 {nombre: new RegExp(busqueda, "i") }
    //             ]
    //         }
    //     )
    //     res.json({ maquinaria})
    // },
    getMaquinarias: async (req, res) => {
        try {
            const maquina = await Maquina_herramienta.find({});
            res.json({ maquina });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener las maquinas' });
        }
    },
    getMaquinariasID: async (req, res) => {
        const { id } = req.params
        const maquinaria = await Maquina_herramienta.findById(id)
        res.json({ maquinaria })
    },

    getMaquina_herramientaactivado: async (req, res) => {
        try {
            const activados = await Maquina_herramienta.find({ estado: 1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener Maquina y herramienta activado' });
        }
    },

    getMaquina_herramientadesactivado: async (req, res) => {
        try {
            const desactivados = await Maquina_herramienta.find({ estado: 0 })
            res.json({ desactivados })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener Maquina y herramienta desactivado' });
        }
    },
    postMaquinarias: async (req, res) => {
        try {
            const { idProveedor, nombre, tipo, observaciones, cantidad, total } = req.body
            const maquinaria = new Maquina_herramienta({ idProveedor, nombre, tipo, observaciones, cantidad, total });
            await maquinaria.save()
            console.log(maquinaria);
            res.json({ message: "la maquinaria fue creada exitosamente ", maquinaria });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "No se pudo crear la maquinaria" })
        }

    },
    putMaquinarias: async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, estado, ...resto } = req.body;

            const maquinaActualizada = await Maquina_herramienta.findByIdAndUpdate(id, resto, { new: true });

            res.json({ Maquina_herramienta: maquinaActualizada });
        } catch (error) {

            console.error("Error updating Maquina_herramienta:", error);
            res.status(400).json({ error: error.message || "No se pudo actualizar la maquina" });
        }
    },
    putMaquinariasActivar: async (req, res) => {
        const { id } = req.params;
        try {
            const maquinaria = await Maquina_herramienta.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!maquinaria) {
                return res.status(404).json({ error: "maquinaria no encontrada" });
            }
            res.json({ maquinaria });
        } catch (error) {
            console.error("Error al activar maquinaria", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }

    },
    putMaquinariasDesactivar: async (req, res) => {
        const { id } = req.params;
        try {
            const maquinaria = await Maquina_herramienta.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!maquinaria) {
                return res.status(404).json({ error: "maquinaria no encontrada" });
            }
            res.json({ maquinaria });
        } catch (error) {
            console.error("Error al desactivar maquinaria", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default httpMaquinarias