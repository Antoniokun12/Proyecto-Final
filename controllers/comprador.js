import comprador from "../models/Comprador.js";
import { json } from "express";
import cron from "node-cron"
const httpComprador = {
    getComprador: async (req, res) => {
        const {busqueda} = req.query
        const compra = await comprador.find(
            {
                $or: [
                    {nombre: new RegExp(busqueda, "i") }
                ]
            }
        )
        res.json({ compra })
    },
    getCompradorID: async (req, res) => {
        const {_id} = req.params
        const compra = await comprador.findById(_id)
        res.json({ compra })
    },
    postComprador: async (req, res) => {
        try {
            const {idproduccion,idingreso,especie,nombre,telefono,cantidad,nguiaTransporte,nloteComercial}=req.body;
            const compra = new comprador({idproduccion,idingreso,especie,nombre,telefono,cantidad,nguiaTransporte,nloteComercial});
            await compra.save()
            console.log(compra);
            res.json({ message: "clima creado exitosamente", compra });
        } catch (error) {
            console.log(error);
            res.status(400).json({ err: "No se pudo crear el clima" })
        }

    },
    putComprador:async (req, res) => {
        const {_id} = req.params;
        const compra = await comprador.findByIdAndUpdate(_id, {new: true});
        res.json(compra)
    },
    putCompradorActivar:async (req,res) => {
        const {_id} = req.params
        const compra = await comprador.findByIdAndUpdate(_id, { estado: 1 }, { new: true })
        res.json({ compra })
    },
    putCompradorDesactivar:async (req,res) => {
        const { _id } = req.params
        const compra= await comprador.findByIdAndUpdate(_id, { estado: 0 }, { new: true })
        res.json({ compra })
    }
}

export default httpComprador

