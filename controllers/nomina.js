import Nomina from "../models/nomina.js";
// import { json } from "express";
// import cron from "node-cron"
const httpNominas = {
    getNominas: async (req, res) => {
        try {
            const nomina = await Nomina.find(); 
            res.json({ nomina });
        } catch (error) {
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
            const activados = await Nomina.find({ estado: 1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener la nomina activada' });
        }
    },

    getNominadesactivado: async (req, res) => {
        try {
        const desactivados = await Nomina.find({ estado: 0 })
        res.json({ desactivados })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la nomina activada' });
    }
    },
    postNominas: async (req, res) => {
        try {
            const {idEmpleado,tipo,valor}=req.body
            const nomina = new Nomina({idEmpleado,tipo,valor});
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