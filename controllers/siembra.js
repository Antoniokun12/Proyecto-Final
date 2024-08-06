import Siembra from "../models/siembra.js";
// import { json } from "express";
// import cron from "node-cron"
const httpSiembras= {
    getSiembras: async (req, res) => {
        const {busqueda} = req.query
        const siembra = await Siembra.find(
            {
                $or: [
                    {nombre: new RegExp(busqueda, "i") }
                ]
            }
        )
        res.json({ siembra})
    },
    getSiembrasID: async (req, res) => {
        const {_id} = req.params
        const siembra = await Siembra.findById(_id)
        res.json({ siembra})
    },

    getSiembraactivado: async (req, res) => {
        try {
            const activados = await Siembra.find({ estado: 1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener Siembra activado' });
        }
    },
    getSiembradesactivado: async (req, res) => {
        try {
        const desactivados = await Siembra.find({ estado: 0 })
        res.json({ desactivados })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener Siembra desactivado' });
    }
    },
    postSiembras: async (req, res) => {
        try {
            const {idCultivo,idEmpleado,idInventario,fechacosecha,transplante,CultivoAnterior}=req.body
            const siembra= new Siembra({idCultivo,idEmpleado,idInventario,fechacosecha,transplante,CultivoAnterior});
            await siembra.save()
            console.log(siembra);
            res.json({ message: "la siembra fue creada exitosamente ", siembra });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "No se pudo crear la siembra" })
        }
    },

    putSiembras:async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, estado, ...resto } = req.body;
        
            const siembraActualizada = await Siembra.findByIdAndUpdate(id, resto, { new: true });
        
            res.json({ semilla: siembraActualizada });
          } catch (error) {

            console.error("Error updating semilla:", error);
            res.status(400).json({ error: error.message || "No se pudo actualizar el semilla" });
          }
    },
    putSiembrasActivar:async (req,res) => {
        const { id } = req.params;
        try {
            const siembra = await Siembra.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!siembra) {
                return res.status(404).json({ error: "siembra no encontrada" });
            }
            res.json({ siembra });
        } catch (error) {
            console.error("Error al activar siembra", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    putSiembrasDesactivar:async (req,res) => {
        const { id } = req.params;
        try {
            const siembra = await Siembra.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!siembra) {
                return res.status(404).json({ error: "siembra no encontrada" });
            }
            res.json({ siembra });
        } catch (error) {
            console.error("Error al desactivar siembra", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default httpSiembras