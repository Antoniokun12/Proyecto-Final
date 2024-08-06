import Insumo from "../models/insumos.js";
// import { json } from "express";
// import cron from "node-cron"
const httpInsumos = {
    getInsumos: async (req, res) => {
        const {busqueda} = req.query
        const insumo = await Insumo.find(
            {
                $or: [
                    {nombre: new RegExp(busqueda, "i") }
                ]
            }
        )
        res.json({ insumo })
    },
    getInsumosID: async (req, res) => {
        const {_id} = req.params
        const insumo = await Insumo.findById(_id)
        res.json({ insumo })
    },
    getInsumoactivado: async (req, res) => {
        try {
            const activados = await Insumo.find({ estado: 1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el insumo activado' });
        }
    },

    getInsumodesactivado: async (req, res) => {
        try {
        const desactivados = await Insumo.find({ estado: 0 })
        res.json({ desactivados })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el insumo desactivado' });
    }
    },
    postInsumos: async (req, res) => {
        try {
            const {idProveedor,nombre,relacionNPK,cantidad,unidad,responsable,observaciones, }=req.body
            const total = cantidad * unidad;

            const insumo = new Insumo({idProveedor,nombre,relacionNPK,cantidad,unidad,responsable,observaciones, total});
            await insumo.save()
            console.log(insumo);
            res.json({ message: "el insumo fue creado exitosamente ", insumo });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "No se pudo crear el insumo" })
        }

    },
    putInsumos:async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, estado, ...resto } = req.body;
        
            const insumoActualizado = await Insumo.findByIdAndUpdate(id, resto, { new: true });
        
            res.json({ insumo: insumoActualizado });
          } catch (error) {

            console.error("Error updating insumo:", error);
            res.status(400).json({ error: error.message || "No se pudo actualizar el insumo" });
          }
    },
    putInsumosActivar:async (req,res) => {
        const { id } = req.params;
        try {
            const insumo = await Insumo.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!insumo) {
                return res.status(404).json({ error: "insumo no encontrado" });
            }
            res.json({ insumo });
        } catch (error) {
            console.error("Error al activar insumo", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    putInsumosDesactivar:async (req,res) => {
        const { id } = req.params;
        try {
            const insumo = await Insumo.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!insumo) {
                return res.status(404).json({ error: "insumo no encontrado" });
            }
            res.json({ insumo });
        } catch (error) {
            console.error("Error al desactivar insumo", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default httpInsumos