import Cultivo from "../models/cultivos.js";
// import { json } from "express";
// import cron from "node-cron"
const httpCultivo = {
    // getCultivo: async (req, res) => {
    //     const {busqueda} = req.query
    //     const cultivos = await Cultivo.find(
    //         {
    //             $or: [
    //                 {nombre: new RegExp(busqueda, "i") }
    //             ]
    //         }
    //     )
    //     res.json({ cultivos })
    // },
    getCultivo: async (req, res) => {
        try {
            // Obtener todos los cultivos sin ningún filtro
            const cultivos = await Cultivo.find().sort({ _id: -1 });
            res.json({ cultivos });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Error al obtener cultivos" });
        }
    },
    
    getCultivoID: async (req, res) => {
        const {_id} = req.params
        const cultivos = await Cultivo.findById(_id)
        res.json({ cultivos })
    },
    getCultivoactivado: async (req, res) => {
        try {
            const activados = await Cultivo.find({ estado: 1 }).sort({ _id: -1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener Cultivo activado' });
        }
    },

    getCultivodesactivado: async (req, res) => {
        try {
        const desactivados = await Cultivo.find({ estado: 0 }).sort({ _id: -1 });
        res.json({ desactivados })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener Cultivo desactivado' });
    }
    },
    postCultivo: async (req, res) => {
        try {
            const {idParcela,nombre,tipo}=req.body;
            const cultivos = new Cultivo ({idParcela,nombre,tipo});
            await cultivos.save()
            console.log(cultivos);
            res.json({ message: "cultivo creado exitosamente", cultivos });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "No se pudo crear el cultivo" })
        }

    },
    putCultivo:async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, estado, ...resto } = req.body;
        
            const cultivoActualizado = await Cultivo.findByIdAndUpdate(id, resto, { new: true });
        
            res.json({ cultivos: cultivoActualizado });
          } catch (error) {
            console.error("Error updating cultivos:", error);
            res.status(400).json({ error: error.message || "No se pudo actualizar cultivos" });
          }
    },
    putCultivoActivar:async (req,res) => {
        const { id } = req.params;
        try {
            const cultivos = await Cultivo.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!cultivos) {
                return res.status(404).json({ error: "cultivos no encontrado" });
            }
            res.json({ cultivos });
        } catch (error) {
            console.error("Error al activar cultivos", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    putCultivoDesactivar:async (req,res) => {
        const { id } = req.params;
        try {
            const cultivos = await Cultivo.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!cultivos) {
                return res.status(404).json({ error: "Cultivo no encontrado" });
            }
            res.json({ cultivos });
        } catch (error) {
            console.error("Error al desactivar Cultivo", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }}
}

export default httpCultivo

