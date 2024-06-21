import clima from "../models/Clima.js";
import { json } from "express";
import cron from "node-cron"
const httpClima = {
    getClima: async (req, res) => {
        const {busqueda} = req.query
        const climas = await clima.find(
            {
                $or: [
                    {nombre: new RegExp(busqueda, "i") }
                ]
            }
        )
        res.json({ climas })
    },
    getClimaID: async (req, res) => {
        const {_id} = req.params
        const climas = await clima.findById(_id)
        res.json({ climas })
    },
    postClima: async (req, res) => {
        try {
            const {idFinca,idEmpleado,tipo,horaInicial,horaFinal,tempMin,tempMax}=req.body;
            const climas = new clima ({idFinca,idEmpleado,tipo,horaInicial,horaFinal,tempMin,tempMax});
            await climas.save()
            console.log(climas);
            res.json({ message: "clima creado exitosamente", clima });
        } catch (error) {
            console.log(error);
            res.status(400).json({ err: "No se pudo crear el clima" })
        }

    },
    putClima:async (req, res) => {
        const {_id} = req.params;
        const climas = await clima.findByIdAndUpdate(_id, {new: true});
        res.json(climas)
    },
    putClimaActivar:async (req,res) => {
        const {_id} = req.params
        const climas = await clima.findByIdAndUpdate(_id, { estado: 1 }, { new: true })
        res.json({ climas })
    },
    putClimaDesactivar:async (req,res) => {
        const { _id } = req.params
        const climas= await clima.findByIdAndUpdate(_id, { estado: 0 }, { new: true })
        res.json({ climas })
    }
}

export default httpClima