import Finca from "../models/fincas.js";
// import { json } from "express";
// import cron from "node-cron"
const httpFincas = {
    getFincas: async (req, res) => {
        const {busqueda} = req.query
        const finca = await Finca.find(
            {
                $or: [
                    {nombre: new RegExp(busqueda, "i") }
                ]
            }
        )
        res.json({ finca })
    },
    getFincasID: async (req, res) => {
        const {_id} = req.params
        const finca = await Finca.findById(_id)
        res.json({ finca })
    },
    getFincaactivado: async (req, res) => {
        try {
            const activados = await Finca.find({ estado: 1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener Finca activada' });
        }
    },

    getFincadesactivado: async (req, res) => {
        try {
        const desactivados = await Finca.find({ estado: 0 })
        res.json({ desactivados })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener Finca desactivada' });
    }
    },
    postFincas: async (req, res) => {
        try {
            const {idAdministrador,nombre,rut,direccion,ubicacionGeografica, area, ciudad, departamento, limites}=req.body;
            const finca = new Finca({idAdministrador,nombre,rut,direccion,ubicacionGeografica, area, ciudad, departamento, limites});
            await finca.save()
            console.log(finca);
            res.json({ message: "la finca fue creada exitosamente ", finca });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "No se pudo crear la finca" })
        }

    },
    putFincas:async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, estado, ...resto } = req.body;
        
            const fincaActualizado = await Finca.findByIdAndUpdate(id, resto, { new: true });
        
            res.json({ finca: fincaActualizado });
          } catch (error) {
            console.error("Error updating Finca:", error);
            res.status(400).json({ error: error.message || "No se pudo actualizar Finca" });
          }
    },
    putFincasActivar:async (req,res) => {
        const { id } = req.params;
        try {
            const finca = await Finca.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!finca) {
                return res.status(404).json({ error: "finca no encontrada" });
            }
            res.json({ finca });
        } catch (error) {
            console.error("Error al activar finca", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    putFincasDesactivar:async (req,res) => {
        const { id } = req.params;
        try {
            const finca = await Finca.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!finca) {
                return res.status(404).json({ error: "finca no encontrada" });
            }
            res.json({ finca });
        } catch (error) {
            console.error("Error al desactivar finca", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default httpFincas