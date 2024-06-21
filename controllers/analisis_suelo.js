import analisisSuelo from "../models/AnalisisSuelo.js";
import { json } from "express";
import cron from "node-cron"
const httpAnalisisSuelo = {
    getAnalisis: async (req, res) => {
        const {busqueda} = req.query
        const anali = await analisisSuelo.find(
            {
                $or: [
                    {nombre: new RegExp(busqueda, "i") }
                ]
            }
        )
        res.json({ anali })
    },
    getAnalisisID: async (req, res) => {
        const {_id} = req.params
        const anali = await analisisSuelo.findById(_id)
        res.json({ anali })
    },
    postAnalisis: async (req, res) => {
        try {
            const {idParcela,idEmpleado,muestra,cultivo,laboratorio,resultados,recomendaciones}=req.body;
            const anali = new analisisSuelo ({idParcela,idEmpleado,muestra,cultivo,laboratorio,resultados,recomendaciones});
            await anali.save()
            console.log(anali);
            res.json({ message: "analisis de suelo creado exitosamente ", analisisSuelo });
        } catch (error) {
            console.log(error);
            res.status(400).json({ err: "No se pudo crear el analisis de suelo" })
        }

    },
    putAnalisis:async (req, res) => {
        const {_id} = req.params;
        const anali = await analisisSuelo.findByIdAndUpdate(_id, {new: true});
        res.json(anali)
    },
    putAnalisisActivar:async (req,res) => {
        const {_id} = req.params
        const anali = await analisisSuelo.findByIdAndUpdate(_id, { estado: 1 }, { new: true })
        res.json({ anali })
    },
    putAnalisisDesactivar:async (req,res) => {
        const { _id } = req.params
        const anali= await analisisSuelo.findByIdAndUpdate(_id, { estado: 0 }, { new: true })
        res.json({ anali })
    }
}

export default httpAnalisisSuelo