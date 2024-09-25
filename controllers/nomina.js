import Nomina from "../models/nomina.js";
// import { json } from "express";
// import cron from "node-cron"
const httpNominas = {
    getNominas: async (req, res) => {
        try {
            const nomina = await Nomina.find().sort({ _id: -1 });
            res.json({ nomina });
        } catch (error) {
            res.status(500).json({ message: "Error al obtener las nóminas", error });
        }
    },

getNominasByFinca: async (req, res) => {
        try {
            const { idFinca } = req.params; // Se asume que idFinca viene en los parámetros de la URL
    
            // 1. Buscar las nóminas asociadas a la finca
            const nominas = await Nomina.find({ idFinca }).sort({ _id: -1 });
    
            // 2. Enviar la respuesta con las nóminas encontradas
            res.status(200).json({ nominas });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al obtener las nóminas", error });
        }
    },
    
    
    getNominasID: async (req, res) => {
        const {_id} = req.params
        const nomina = await Nomina.findById(_id)
        res.json({ nomina })
    },
    getNominaactivado: async (req, res) => {
        try {
            const activados = await Nomina.find({ estado: 1 }).sort({ _id: -1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener la nomina activada' });
        }
    },

    getNominadesactivado: async (req, res) => {
        try {
        const desactivados = await Nomina.find({ estado: 0 }).sort({ _id: -1 });
        res.json({ desactivados })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la nomina activada' });
    }
    },
    postNominas: async (req, res) => {
        try {
            const {idFinca,idEmpleado,tipo,valor}=req.body
            const nomina = new Nomina({idFinca,idEmpleado,tipo,valor});
            await nomina.save()
            console.log(nomina);
            res.json({ message: "la nomina fue creada exitosamente ", nomina });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "No se pudo crear la nomina" })
        }

    },
    putNominas:async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, estado, ...resto } = req.body;
        
            const nominaActualizada = await Nomina.findByIdAndUpdate(id, resto, { new: true });
        
            res.json({ controlplaga: nominaActualizada });
          } catch (error) {

            console.error("Error updating Nomina:", error);
            res.status(400).json({ error: error.message || "No se pudo actualizar Nomina" });
          }
    },
    putNominasActivar:async (req,res) => {
        const {id} = req.params
        const nomina = await Nomina.findByIdAndUpdate(id, { estado: 1 }, { new: true })
        res.json({ nomina })
    },
    putNominasDesactivar:async (req,res) => {
        const {id } = req.params
        const nomina= await Nomina.findByIdAndUpdate(id, { estado: 0 }, { new: true })
        res.json({ nomina })
    }
}

export default httpNominas