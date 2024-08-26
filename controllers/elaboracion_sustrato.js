import Sustrato from "../models/elaboracion_sustrato.js";
// import { json } from "express";
// import cron from "node-cron"
const httpElaboracionSustrato = {
    // getSustrato: async (req, res) => {
    //     const {busqueda} = req.query
    //     const sustra = await Sustrato.find(
    //         {
    //             $or: [
    //                 {nombre: new RegExp(busqueda, "i") }
    //             ]
    //         }
    //     )
    //     res.json({ sustra })
    // },
    getSustrato: async (req, res) => {
        try {
            // Obtener todos los sustratos sin ningún filtro
            const sustra = await Sustrato.find();
            res.json({ sustra });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Error al obtener sustratos" });
        }
    },
    
    getSustratoID: async (req, res) => {
        const {_id} = req.params
        const sustra = await Sustrato.findById(_id)
        res.json({ sustra })
    },
    getSustratoactivado: async (req, res) => {
        try {
            const activados = await Sustrato.find({ estado: 1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el Sustrato activado' });
        }
    },

    getSustratodesactivado: async (req, res) => {
        try {
        const desactivados = await Sustrato.find({ estado: 0 })
        res.json({ desactivados })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el Sustrato desactivado' });
    }
    },
    postSustrato: async (req, res) => {
        try {
            const {idProceso,productoComercial,ingredienteActivo,dosisUtilizada,metodoAplicacion,idEmpleado,observaciones}=req.body;
            const sustra = new Sustrato ({idProceso,productoComercial,ingredienteActivo,dosisUtilizada,metodoAplicacion,idEmpleado,observaciones});
            await sustra.save()
            console.log(sustra);
            res.json({ message: "sustrato creado exitosamente", sustra });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "No se pudo crear el sustrato" })
        }

    },
    putSustrato:async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, estado, ...resto } = req.body;
        
            const elaboracionActualizado = await Sustrato.findByIdAndUpdate(id, resto, { new: true });
        
            res.json({ sustra: elaboracionActualizado });
          } catch (error) {
            console.error("Error updating el sustrato:", error);
            res.status(400).json({ error: error.message || "No se pudo actualizar el sustrato" });
          }
    },
    putSustratoActivar:async (req,res) => {
        const { id } = req.params;
        try {
            const sustra = await Sustrato.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!sustra) {
                return res.status(404).json({ error: "sustrato no encontrado" });
            }
            res.json({ sustra });
        } catch (error) {
            console.error("Error al activar sustrato", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    putSustratoDesactivar:async (req,res) => {
        const { id } = req.params;
        try {
            const sustra = await Sustrato.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!sustra) {
                return res.status(404).json({ error: "sustrato no encontrado" });
            }
            res.json({ sustra });
        } catch (error) {
            console.error("Error al desactivar sustrato", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default httpElaboracionSustrato

