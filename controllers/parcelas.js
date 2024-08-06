import Parcela from "../models/parcelas.js";
// import { json } from "express";
// import cron from "node-cron"
const httpParcelas = {
    getParcelas: async (req, res) => {
        const {busqueda} = req.query
        const parcela = await Parcela.find(
            {
                $or: [
                    {nombre: new RegExp(busqueda, "i") }
                ]
            }
        )
        res.json({ parcela})
    },
    getParcelasID: async (req, res) => {
        const {_id} = req.params
        const parcela = await Parcela.findById(_id)
        res.json({ parcela })
    },
    getParcelaactivado: async (req, res) => {
        try {
            const activados = await Parcela.find({ estado: 1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener Parcela activado' });
        }
    },

    getParceladesactivado: async (req, res) => {
        try {
        const desactivados = await Parcela.find({ estado: 0 })
        res.json({ desactivados })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener Parcela desactivado' });
    }
    },
    
    postParcelas: async (req, res) => {
        try {
            const {idFinca,ubicacion,numero,cultivoAnterior,cultivoActual,detalle,estado,area,asistenteTecnico}=req.body
            const parcela = new Parcela({idFinca,ubicacion,numero,cultivoAnterior,cultivoActual,detalle,estado,area,asistenteTecnico});
            await parcela.save()
            console.log(parcela);
            res.json({ message: "la parcela fue creada exitosamente ", parcela });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "No se pudo crear la parcela" })
        }

    },
    putParcelas:async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, estado, ...resto } = req.body;
        
            const parcelaActualizada = await Parcela.findByIdAndUpdate(id, resto, { new: true });
        
            res.json({ parcela: parcelaActualizada });
          } catch (error) {

            console.error("Error updating parcela:", error);
            res.status(400).json({ error: error.message || "No se pudo actualizar la parcela" });
          }
    },
    putParcelasActivar:async (req,res) => {
        const { id } = req.params;
        try {
            const controlplaga = await Parcela.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!message) {
                return res.status(404).json({ error: "parcela no encontrado" });
            }
            res.json({ controlplaga });
        } catch (error) {
            console.error("Error al activar parcela", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    putParcelasDesactivar:async (req,res) => {
        const { id } = req.params;
        try {
            const controlplaga = await Parcela.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!message) {
                return res.status(404).json({ error: "parcela no encontrado" });
            }
            res.json({ controlplaga });
        } catch (error) {
            console.error("Error al desactivar parcela", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default httpParcelas