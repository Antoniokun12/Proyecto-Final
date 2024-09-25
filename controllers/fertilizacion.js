import Fertilizacion from "../models/fertilizacion.js";
import Parcela from "../models/parcelas.js";
import Cultivo from "../models/cultivos.js";



// import { json } from "express";
// import cron from "node-cron"
const httpFertilizacion = {
    // getFertilizacion: async (req, res) => {
    //     try {
    //         const { busqueda } = req.query;
    //         const fertilizacion = await Fertilizacion.find({
    //             $or: [{ tipo: new RegExp(busqueda, "i") }]
    //         });
    //         res.json({ fertilizacion });
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({ err: "Error al obtener Fertilizacion" });
    //     }
    // },
    getFertilizacion: async (req, res) => {
        try {
            const fertilizacion = await Fertilizacion.find().sort({ _id: -1 });
            res.json({ fertilizacion });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Error al obtener Fertilizacion" });
        }
    },

    getFertilizacionByFinca: async (req, res) => {
        try {
            const { idFinca } = req.params; // Se asume que idFinca viene en los parámetros de la URL
    
            // 1. Obtener las parcelas asociadas a la finca
            const parcelas = await Parcela.find({ idFinca }).select('_id');
            const idsParcelas = parcelas.map(parcela => parcela._id);
    
            // 2. Obtener los cultivos asociados a esas parcelas
            const cultivos = await Cultivo.find({ idParcela: { $in: idsParcelas } }).select('_id');
            const idsCultivos = cultivos.map(cultivo => cultivo._id);
    
            // 3. Obtener las fertilizaciones asociadas a esos cultivos
            const fertilizaciones = await Fertilizacion.find({ idCultivo: { $in: idsCultivos } })
                .sort({ _id: -1 })
                // .populate('idCultivo'); // Si deseas obtener más información sobre el cultivo
    
            // 4. Enviar la respuesta con las fertilizaciones encontradas
            res.status(200).json({ fertilizaciones });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Error al obtener fertilizaciones" });
        }
    },
    
    getFertizacionID: async (req, res) => {
        try {
            const { id } = req.params;
            const fertilizacion = await Fertilizacion.findById(id);
            if (!fertilizacion) {
                return res.status(404).json({ err: "Fertilizacion no encontrado" });
            }
            res.json({ fertilizacion });
        } catch (error) {
            console.log(error);
            res.status(500).json({ err: "Error al obtener Fertilizacion" });
        }
    },
    getFertilizacionactivado: async (req, res) => {
        try {
            const activados = await Fertilizacion.find({ estado: 1 }).sort({ _id: -1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener Fertilizacion activado' });
        }
    },

    getFertilizaciondesactivado: async (req, res) => {
        try {
        const desactivados = await Fertilizacion.find({ estado: 0 }).sort({ _id: -1 });
        res.json({ desactivados })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener Fertilizacion desactivado' });
    }
    },
    postFertizacion: async (req, res) => {
        try {
            const {idCultivo,idEmpleado,idInventario,estadoFenologico,tipo,nombreFertilizante,cantidad}=req.body;
            const fertilizacion = new Fertilizacion({idCultivo,idEmpleado,idInventario,estadoFenologico,tipo,nombreFertilizante,cantidad});
            await fertilizacion.save()
            console.log(fertilizacion);
            res.json({ message: "la fertilizacion fue creada exitosamente ", fertilizacion });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "No se pudo crear la fertilizacion" })
        }

    },
    putFertilizacion:async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, estado, ...resto } = req.body;
        
            const fertilizacionActualizado = await Fertilizacion.findByIdAndUpdate(id, resto, { new: true });
        
            res.json({ fertilizacion: fertilizacionActualizado });
          } catch (error) {
            console.error("Error updating fertilizacion:", error);
            res.status(400).json({ error: error.message || "No se pudo actualizar el fertilizacion" });
          }
    },
    putFertilizacionActivar:async (req,res) => {
        const { id } = req.params;
        try {
            const fertilizacion = await Fertilizacion.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!fertilizacion) {
                return res.status(404).json({ error: "fertilizacion no encontrado" });
            }
            res.json({ fertilizacion });
        } catch (error) {
            console.error("Error al activar fertilizacion", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    putFertilizacionDesactivar:async (req,res) => {
        const { id } = req.params;
        try {
            const fertilizacion  = await Fertilizacion.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!fertilizacion ) {
                return res.status(404).json({ error: "fertilizacion  no encontrado" });
            }
            res.json({ fertilizacion  });
        } catch (error) {
            console.error("Error al desactivar fertilizacion ", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default httpFertilizacion