import Gasto from "../models/gastos.js";
// import { json } from "express";
// import cron from "node-cron"
const httpGastos = {
    // getGastos: async (req, res) => {
    //     const {busqueda} = req.query
    //     const gasto = await Gasto.find(
    //         {
    //             $or: [
    //                 {nombre: new RegExp(busqueda, "i") }
    //             ]
    //         }
    //     )
    //     res.json({ gasto })
    // },
    getGastos: async (req, res) => {
        try {
            const gasto = await Gasto.find().sort({ _id: -1 });
            res.json({ gasto });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Error al obtener gastos" });
        }
    },
    
    getGastosID: async (req, res) => {
        const {id} = req.params
        const gasto = await Gasto.findById(id)
        res.json({ gasto })
    },
    getGastoactivado: async (req, res) => {
        try {
            const activados = await Gasto.find({ estado: 1 }).sort({ _id: -1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener Gasto activado' });
        }
    },

    getGastodesactivado: async (req, res) => {
        try {
        const desactivados = await Gasto.find({ estado: 0 }).sort({ _id: -1 });
        res.json({ desactivados })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener Gasto desactivado' });
    }
    },
    postGastos: async (req, res) => {
        try {
            const {idInsumo,idSemilla,idMantenimiento,nombre,numero_factura,descripcion,total}=req.body;
            const gasto = new Gasto({idInsumo,idSemilla,idMantenimiento,nombre,numero_factura,descripcion,total});
            await gasto.save()
            console.log(gasto);
            res.json({ message: "el gasto fue creado exitosamente ", gasto });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "No se pudo crear el gasto" })
        }

    },
    putGastos:async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, estado, ...resto } = req.body;
        
            const gastoActualizado = await Gasto.findByIdAndUpdate(id, resto, { new: true });
        
            res.json({ gasto: gastoActualizado });
          } catch (error) {

            console.error("Error updating Gasto:", error);
            res.status(400).json({ error: error.message || "No se pudo actualizar el Gasto" });
          }
    },
    putGastosActivar:async (req,res) => {
        const { id } = req.params;
        try {
            const gasto = await Gasto.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!gasto) {
                return res.status(404).json({ error: "gasto no encontrado" });
            }
            res.json({ gasto });
        } catch (error) {
            console.error("Error al activar gasto", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }

    },
    putGastosDesactivar:async (req,res) => {
        const { id } = req.params;
        try {
            const gasto = await Gasto.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!gasto) {
                return res.status(404).json({ error: "gasto no encontrado" });
            }
            res.json({ gasto });
        } catch (error) {
            console.error("Error al desactivar gasto", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default httpGastos