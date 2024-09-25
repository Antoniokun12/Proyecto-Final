import Produccion from "../models/produccion.js";
import Parcela from "../models/parcelas.js";
import Cultivo from "../models/cultivos.js";

// import { json } from "express";
// import cron from "node-cron"
const httpProduccion = {
    // getProduccion: async (req, res) => {
    //     const {busqueda} = req.query
    //     const produccciones = await Produccion.find(
    //         {
    //             $or: [
    //                 {especie: new RegExp(busqueda, "i") }
    //             ]
    //         }
    //     )
    //     res.json({ produccciones})
    // },
    getProduccion: async (req, res) => {
        try {
            const producciones = await Produccion.find().sort({ _id: -1 });
            res.json({ producciones });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Error al obtener producciones" });
        }
    },

getProduccionesByFinca: async (req, res) => {
        try {
            const { idFinca } = req.params; 

            const parcelas = await Parcela.find({ idFinca }).select('_id');
            const idsParcelas = parcelas.map(parcela => parcela._id);

            const cultivos = await Cultivo.find({ idParcela: { $in: idsParcelas } }).select('_id');
            const idsCultivos = cultivos.map(cultivo => cultivo._id);
    
            const producciones = await Produccion.find({ idCultivo: { $in: idsCultivos } }).sort({ _id: -1 });
    
            res.json({ producciones });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Error al obtener producciones", error });
        }
    },
    
    getProduccionID: async (req, res) => {
        const {_id} = req.params
        const produccciones = await Produccion.findById(_id)
        res.json({ produccciones })
    },
    getProduccionactivado: async (req, res) => {
        try {
            const activados = await Produccion.find({ estado: 1 }).sort({ _id: -1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener Produccion activado' });
        }
    },

    getProducciondesactivado: async (req, res) => {
        try {
        const desactivados = await Produccion.find({ estado: 0 }).sort({ _id: -1 });
        res.json({ desactivados })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener Produccion desactivado' });
    }
},
    postProduccion: async (req, res) => {
        try {
            const {idCultivo,Nlote,especie,cantidad,cantidadTrabajadores,observaciones}=req.body
            const produccciones = new Produccion({idCultivo,Nlote,especie,cantidad,cantidadTrabajadores,observaciones});
            await produccciones.save()
            console.log(produccciones);
            res.json({ message: "la produccion fue creada exitosamente ", produccciones });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "No se pudo crear la produccion" })
        }

    },
    putProduccion:async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, estado, ...resto } = req.body;
        
            const produccionActualizado = await Produccion.findByIdAndUpdate(id, resto, { new: true });
        
            res.json({ produccciones: produccionActualizado });
          } catch (error) {

            console.error("Error updating produccciones:", error);
            res.status(400).json({ error: error.message || "No se pudo actualizar produccion" });
          }
    },
    putProduccionActivar:async (req,res) => {
        const { id } = req.params;
        try {
            const produccciones = await Produccion.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!produccciones) {
                return res.status(404).json({ error: "produccciones no encontrado" });
            }
            res.json({ produccciones });
        } catch (error) {
            console.error("Error al activar produccciones", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    putProduccionDesactivar:async (req,res) => {
        const { id } = req.params;
        try {
            const produccciones = await Produccion.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!produccciones) {
                return res.status(404).json({ error: "produccciones no encontrado" });
            }
            res.json({ produccciones });
        } catch (error) {
            console.error("Error al desactivar produccciones", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default httpProduccion