import Analisis from "../models/analisis_suelo.js";
// import { json } from "express";
// import cron from "node-cron"
const httpAnalisisSuelo = {
    getAnalisis: async (req, res) => {
        const {busqueda} = req.query
        const analisis = await Analisis.find(
            {
                $or: [
                    {nombre: new RegExp(busqueda, "i") }
                ]
            }
        )
        res.json({ analisis })
    },
    getAnalisisID: async (req, res) => {
        const {id} = req.params
        const analisis = await Analisis.findById(id)
        res.json({ analisis })
    },
    getAnalisisactivado: async (req, res) => {
        try {
            const activados = await Analisis.find({ estado: 1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener Analisis activado' });
        }
    },

    getAnalisisdesactivado: async (req, res) => {
        try {
        const desactivados = await Analisis.find({ estado: 0 })
        res.json({ desactivados })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener Analisis desactivado' });
    }
    },
    postAnalisis: async (req, res) => {
        try {
            const {idParcela,idEmpleado,muestra,cultivo,laboratorio,resultados,recomendaciones}=req.body;
            const analisis = new Analisis ({idParcela,idEmpleado,muestra,cultivo,laboratorio,resultados,recomendaciones});
            await analisis.save()
            console.log(analisis);
            res.json({ message: "analisis de suelo creado exitosamente ", analisis });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "No se pudo crear el analisis de suelo" })
        }

    },
    putAnalisis:async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, estado, ...resto } = req.body;
        
            const analisisActualizado = await Analisis.findByIdAndUpdate(id, resto, { new: true });
        
            res.json({ analisis: analisisActualizado });
          } catch (error) {
            console.error("Error updating Analisis:", error);
            res.status(400).json({ error: error.message || "No se pudo actualizar el Analisis" });
          }
        },
    putAnalisisActivar:async (req,res) => {
        const { id } = req.params;
        try {
            const analisis = await Analisis.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!analisis) {
                return res.status(404).json({ error: "analisis no encontrado" });
            }
            res.json({ analisis });
        } catch (error) {
            console.error("Error al activar analisis", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    putAnalisisDesactivar:async (req,res) => {
        const { id } = req.params;
        try {
            const analisis = await Analisis.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!analisis) {
                return res.status(404).json({ error: "analisis no encontrado" });
            }
            res.json({ analisis });
        } catch (error) {
            console.error("Error al desactivar analisis", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
}

export default httpAnalisisSuelo