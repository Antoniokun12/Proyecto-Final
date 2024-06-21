import cultivo from "../models/cultivos.js";
import { json } from "express";
import cron from "node-cron"
const httpCultivo = {
    getCultivo: async (req, res) => {
        const {busqueda} = req.query
        const cultivos = await cultivo.find(
            {
                $or: [
                    {nombre: new RegExp(busqueda, "i") }
                ]
            }
        )
        res.json({ cultivos })
    },
    getCultivoID: async (req, res) => {
        const {_id} = req.params
        const cultivos = await cultivo.findById(_id)
        res.json({ cultivos })
    },
    postCultivo: async (req, res) => {
        try {
            const {idparcela,nombre,tipo}=req.body;
            const cultivos = new cultivo ({idparcela,nombre,tipo});
            await cultivos.save()
            console.log(cultivos);
            res.json({ message: "cultivo creado exitosamente", cultivos });
        } catch (error) {
            console.log(error);
            res.status(400).json({ err: "No se pudo crear el cultivo" })
        }

    },
    putCultivo:async (req, res) => {
        const {_id} = req.params;
        const cultivos = await cultivo.findByIdAndUpdate(_id, {new: true});
        res.json(cultivos)
    },
    putCultivoActivar:async (req,res) => {
        const {_id} = req.params
        const cultivos = await cultivo.findByIdAndUpdate(_id, { estado: 1 }, { new: true })
        res.json({ cultivos })
    },
    putCultivoDesactivar:async (req,res) => {
        const { _id } = req.params
        const cultivos= await cultivo.findByIdAndUpdate(_id, { estado: 0 }, { new: true })
        res.json({cultivos })
    }
}

export default httpCultivo

