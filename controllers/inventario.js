import Inventario from "../models/inventario.js";
// import { json } from "express";
// import cron from "node-cron"
const httpInventarios = {
    getInventarios: async (req, res) => {
        const {busqueda} = req.query
        const inventario = await Inventario.find(
            {
                $or: [
                    {nombre: new RegExp(busqueda, "i") }
                ]
            }
        )
        res.json({ inventario })
    },
    getInventariosID: async (req, res) => {
        const {_id} = req.params
        const inventario = await Inventario.findById(_id)
        res.json({ inventario })
    },
    getInventarioactivado: async (req, res) => {
        try {
            const activados = await Inventario.find({ estado: 1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el inventario activado' });
        }
    },

    getInventariodesactivado: async (req, res) => {
        try {
        const desactivados = await Inventario.find({ estado: 0 })
        res.json({ desactivados })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el inventario desactivado' });
    }
    },
    postInventarios: async (req, res) => {
        try {
            const {idSemilla,idInsumo,idMaquina_herramienta,tipo,observacion,unidad,cantidad}=req.body
            const inventario = new Inventario({idSemilla,idInsumo,idMaquina_herramienta,tipo,observacion,unidad,cantidad});
            await inventario.save()
            console.log(inventario);
            res.json({ message: "el producto fue creado exitosamente ", inventario });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "No se pudo crear el producto" })
        }

    },
    putInventarios:async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, estado, ...resto } = req.body;
        
            const inventarioActualizado = await Inventario.findByIdAndUpdate(id, resto, { new: true });
        
            res.json({ inventario: inventarioActualizado });
          } catch (error) {

            console.error("Error updating inventario:", error);
            res.status(400).json({ error: error.message || "No se pudo actualizar el inventario" });
          }
    },
    putInventariosActivar:async (req,res) => {
        const { id } = req.params;
        try {
            const inventario = await Inventario.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!inventario) {
                return res.status(404).json({ error: "inventario no encontrado" });
            }
            res.json({ inventario });
        } catch (error) {
            console.error("Error al activar inventario", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    putInventarioDesactivar:async (req,res) => {
        const { id } = req.params;
        try {
            const inventario = await Inventario.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!inventario) {
                return res.status(404).json({ error: "inventario no encontrado" });
            }
            res.json({ inventario });
        } catch (error) {
            console.error("Error al desactivar inventario", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default httpInventarios