import Riego from "../models/riego.js";
// import { json } from "express";
// import cron from "node-cron"
const httpRiegos = {
    // getRiegos: async (req, res) => {
    //     const {busqueda} = req.query
    //     const riego = await Riego.find(
    //         {
    //             $or: [
    //                 {nombre: new RegExp(busqueda, "i") }
    //             ]
    //         }
    //     )
    //     res.json({ riego})
    // },
    getRiegos: async (req, res) => {
        try {
            const riego = await Riego.find();
            res.json({ riego });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Error al obtener riegos" });
        }
    },
    
    getRiegosID: async (req, res) => {
        const {_id} = req.params
        const riego = await Riego.findById(_id)
        res.json({ riego })
    },
    getRiegoactivado: async (req, res) => {
        try {
            const activados = await Riego.find({ estado: 1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener Riego activado' });
        }
    },

    getRiegodesactivado: async (req, res) => {
        try {
        const desactivados = await Riego.find({ estado: 0 })
        res.json({ desactivados })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener Riego desactivado' });
    }
    },
    postRiegos: async (req, res) => {
        try {
            const {idCultivo,idEmpleado,diasTransplante,estadoFenologico,horaFin,dosis,cantidadAgua}=req.body
            const riego= new Riego({idCultivo,idEmpleado,diasTransplante,estadoFenologico,horaFin,dosis,cantidadAgua});
            await riego.save()
            console.log(riego);
            res.json({ message: "el riego fue creado exitosamente ", riego });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "No se pudo crear el riego" })
        }

    },  
    putRiegos:async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, estado, ...resto } = req.body;
        
            const riegoActualizado = await Riego.findByIdAndUpdate(id, resto, { new: true });
        
            res.json({ riego: riegoActualizado });
          } catch (error) {

            console.error("Error updating riego:", error);
            res.status(400).json({ error: error.message || "No se pudo actualizar el riego" });
          }
    },
    putRiegosActivar:async (req,res) => {
        const { id } = req.params;
        try {
            const riego = await Riego.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!riego) {
                return res.status(404).json({ error: "riego no encontrado" });
            }
            res.json({ riego });
        } catch (error) {
            console.error("Error al activar riego", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    putRiegosDesactivar:async (req,res) => {
        const { id } = req.params;
        try {
            const riego = await Riego.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!riego) {
                return res.status(404).json({ error: "riego no encontrado" });
            }
            res.json({ riego });
        } catch (error) {
            console.error("Error al desactivar riego", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default httpRiegos