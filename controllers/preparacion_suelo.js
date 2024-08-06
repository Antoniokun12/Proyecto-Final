import Suelo from "../models/preparacion_suelo.js";
// import { json } from "express";
// import cron from "node-cron"
const httpPreparaciones = {
    getPreparaciones: async (req, res) => {
        const {busqueda} = req.query
        const preparacion = await Suelo.find(
            {
                $or: [
                    {nombre: new RegExp(busqueda, "i") }
                ]
            }
        )
        res.json({ preparacion})
    },
    getPreparacionesID: async (req, res) => {
        const {_id} = req.params
        const preparacion = await Suelo.findById(_id)
        res.json({ preparacion })
    },
    getSueloactivado: async (req, res) => {
        try {
            const activados = await Suelo.find({ estado: 1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener Suelo activado' });
        }
    },

    getSuelodesactivado: async (req, res) => {
        try {
        const desactivados = await Suelo.find({ estado: 0 })
        res.json({ desactivados })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener Suelo desactivado' });
    }
},
    postPreparaciones: async (req, res) => {
        try {
            const {idParcela,idEmpleado,productos,operario,responsable,observaciones}=req.body
            const preparacion = new Suelo({idParcela,idEmpleado,productos,operario,responsable,observaciones});
            await preparacion.save()
            console.log(preparacion);
            res.json({ message: "la preparacion de suelo fue creada exitosamente ", preparacion });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "No se pudo crear la preparacion de suelo" })
        }

    },
    putPreparaciones:async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, estado, ...resto } = req.body;
        
            const preparacionActualizado = await Suelo.findByIdAndUpdate(id, resto, { new: true });
        
            res.json({ preparacion: preparacionActualizado });
          } catch (error) {

            console.error("Error updating preparacion:", error);
            res.status(400).json({ error: error.message || "No se pudo actualizar preparacion" });
          }
    },
    putPreparacionesActivar:async (req,res) => {
        const { id } = req.params;
        try {
            const preparacion = await Suelo.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!preparacion) {
                return res.status(404).json({ error: "preparacion no encontrado" });
            }
            res.json({ preparacion });
        } catch (error) {
            console.error("Error al activar preparacion", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    putPreparacionesDesactivar:async (req,res) => {
        const { id } = req.params;
        try {
            const preparacion = await Suelo.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!preparacion) {
                return res.status(404).json({ error: "preparacion no encontrado" });
            }
            res.json({ preparacion });
        } catch (error) {
            console.error("Error al desactivar preparacion", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default httpPreparaciones