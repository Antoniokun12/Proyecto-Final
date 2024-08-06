import Semilla from "../models/semillas.js";
// import { json } from "express";
// import cron from "node-cron"
const httpSemillas = {
    getSemillas: async (req, res) => {
        const {busqueda} = req.query
        const semilla = await Semilla.find(
            {
                $or: [
                    {nombre: new RegExp(busqueda, "i") }
                ]
            }
        )
        res.json({ semilla})
    },
    getSemillasID: async (req, res) => {
        const {_id} = req.params
        const semilla = await Semilla.findById(_id)
        res.json({ semilla })
    },
    getSemillasactivado: async (req, res) => {
        try {
            const activados = await Semilla.find({ estado: 1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener Semilla activado' });
        }
    },

    getSemillasdesactivado: async (req, res) => {
        try {
        const desactivados = await Semilla.find({ estado: 0 })
        res.json({ desactivados })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener Semilla desactivado' });
    }
    },
    postSemillas: async (req, res) => {
        try {
            const {idProveedor,numFactura,fechaVencimiento,especie,NumLote,origen,poderGerminativo,unidadtotal,total}=req.body
            const semilla= new Semilla({idProveedor,numFactura,fechaVencimiento,especie,NumLote,origen,poderGerminativo,unidadtotal,total});
            await semilla.save()
            console.log(semilla);
            res.json({ message: "las semillas fueron creadas exitosamente ", semilla });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "No se pudo crear las semillas" })
        }

    },
    putSemillas:async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, estado, ...resto } = req.body;
        
            const semillasActualizado = await Semilla.findByIdAndUpdate(id, resto, { new: true });
        
            res.json({ semilla: semillasActualizado });
          } catch (error) {

            console.error("Error updating semilla:", error);
            res.status(400).json({ error: error.message || "No se pudo actualizar la semilla" });
          }
    },
    putSemillasActivar:async (req,res) => {
        const { id } = req.params;
        try {
            const semilla = await Semilla.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!semilla) {
                return res.status(404).json({ error: "semilla no encontrada" });
            }
            res.json({ semilla });
        } catch (error) {
            console.error("Error al activar semilla", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    putSemillasDesactivar:async (req,res) => {
        const { id } = req.params;
        try {
            const semilla = await Semilla.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!semilla) {
                return res.status(404).json({ error: "semilla no encontrada" });
            }
            res.json({ semilla });
        } catch (error) {
            console.error("Error al desactivar semilla", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default httpSemillas