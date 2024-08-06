import Comprador from "../models/comprador.js";
// import { json } from "express";
// import cron from "node-cron"
const httpComprador = {
    getComprador: async (req, res) => {
        const {busqueda} = req.query
        const compra = await Comprador.find(
            {
                $or: [
                    {nombre: new RegExp(busqueda, "i") }
                ]
            }
        )
        res.json({ compra })
    },
    getCompradorID: async (req, res) => {
        const {_id} = req.params
        const compra = await Comprador.findById(_id)
        res.json({ compra })
    },
    getCompradoractivado: async (req, res) => {
        try {
            const activados = await Comprador.find({ estado: 1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el Comprador activado' });
        }
    },

    getCompradordesactivado: async (req, res) => {
        try {
        const desactivados = await Comprador.find({ estado: 0 })
        res.json({ desactivados })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el Comprador desactivado' });
    }
    },
    postComprador: async (req, res) => {
        try {
            const {idProduccion,especie,nombre,telefono,cantidad,nguiaTransporte,nloteComercial}=req.body;
            const compra = new Comprador({idProduccion,especie,nombre,telefono,cantidad,nguiaTransporte,nloteComercial});
            await compra.save()
            console.log(compra);
            res.json({ message: "comprador creado exitosamente", compra });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "No se pudo crear el comprador" })
        }

    },
    putComprador:async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, estado, ...resto } = req.body;
        
            const compradorActualizado = await Comprador.findByIdAndUpdate(id, resto, { new: true });
        
            res.json({ compra: compradorActualizado });
          } catch (error) {
            console.error("Error updating comprador:", error);
            res.status(400).json({ error: error.message || "No se pudo actualizar el comprador" });
          }
    },
    putCompradorActivar:async (req,res) => {
        const { id } = req.params;
        try {
            const compra = await Comprador.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!compra) {
                return res.status(404).json({ error: "comprador no encontrado" });
            }
            res.json({ compra });
        } catch (error) {
            console.error("Error al activar comprador", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    putCompradorDesactivar:async (req,res) => {
        const { id } = req.params;
        try {
            const compra = await Comprador.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!compra) {
                return res.status(404).json({ error: "comprador no encontrado" });
            }
            res.json({ compra });
        } catch (error) {
            console.error("Error al desactivar comprador", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
}

export default httpComprador

