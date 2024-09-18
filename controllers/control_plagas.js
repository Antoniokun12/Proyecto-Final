import ControlPlaga from "../models/control_plagas.js";
// import { json } from "express";
// import cron from "node-cron"
const httpControlPlaga = {
    // getControlPlaga: async (req, res) => {
    //     const {busqueda} = req.query
    //     const controlplaga = await ControlPlaga.find(
    //         {
    //             $or: [
    //                 {nombre: new RegExp(busqueda, "i") }
    //             ]
    //         }
    //     )
    //     res.json({ controlplaga })
    // },
    getControlPlaga: async (req, res) => {
        try {
            // Obtener todos los registros de control de plagas sin ningún filtro
            const controlplaga = await ControlPlaga.find().sort({ _id: -1 });
            res.json({ controlplaga });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Error al obtener registros de control de plagas" });
        }
    },
    
    getControlPlagaID: async (req, res) => {
        const {_id} = req.params
        const controlplaga = await ControlPlaga.findById(_id)
        res.json({ controlplaga })
    },
    getControlPlagaactivado: async (req, res) => {
        try {
            const activados = await ControlPlaga.find({ estado: 1 }).sort({ _id: -1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el Control de Plaga activado' });
        }
    },

    getControlPlagadesactivado: async (req, res) => {
        try {
        const desactivados = await ControlPlaga.find({ estado: 0 }).sort({ _id: -1 });
        res.json({ desactivados })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener  el Control de Plaga  desactivado' });
    }
    },
    postControlPlaga: async (req, res) => {
        try {
            const {idCultivo,idEmpleado,tipoCultivo,nombre,tipo,ingredientesActivo,dosis, observaciones }=req.body;
            const controlplaga = new ControlPlaga ({idCultivo,idEmpleado,tipoCultivo,nombre,tipo,ingredientesActivo,dosis, observaciones });
            await controlplaga.save()
            console.log(controlplaga);
            res.json({ message: "Control de Plaga creado exitosamente", controlplaga });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "No se pudo crear el Control de Plaga" })
        }

    },
    putControlPlaga:async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, estado, ...resto } = req.body;
        
            const controlActualizado = await ControlPlaga.findByIdAndUpdate(id, resto, { new: true });
        
            res.json({ controlplaga: controlActualizado });
          } catch (error) {

            console.error("Error updating controlplaga:", error);
            res.status(400).json({ error: error.message || "No se pudo actualizar el control de plaga" });
          }
    },
    putControlPlagaActivar:async (req,res) => {
        const { id } = req.params;
        try {
            const controlplaga = await ControlPlaga.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!controlplaga) {
                return res.status(404).json({ error: "control de plaga no encontrado" });
            }
            res.json({ controlplaga });
        } catch (error) {
            console.error("Error al activar control de plaga", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    putControlPlagaDesactivar:async (req,res) => {
        const { id } = req.params;
        try {
            const controlplaga = await ControlPlaga.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!controlplaga) {
                return res.status(404).json({ error: "control de plaga no encontrado" });
            }
            res.json({ controlplaga });
        } catch (error) {
            console.error("Error al desactivar control de plaga", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default httpControlPlaga