import elaboracionSustrato from "../models/elaboracion_sustrato.js";
import { json } from "express";
import cron from "node-cron"
const httpElaboracionSustrato = {
    getSustrato: async (req, res) => {
        const {busqueda} = req.query
        const sustra = await elaboracionSustrato.find(
            {
                $or: [
                    {nombre: new RegExp(busqueda, "i") }
                ]
            }
        )
        res.json({ sustra })
    },
    getSustratoID: async (req, res) => {
        const {_id} = req.params
        const sustra = await elaboracionSustrato.findById(_id)
        res.json({ sustra })
    },
    posSustrato: async (req, res) => {
        try {
            const {idprocesos,fecha,productoComercial,ingredienteActivo,dosisSuministrada,metodoAplicacion,empelado_IdOperacion,empleado_IdResponsable,observaciones}=req.body;
            const sustra = new elaboracionSustrato ({idprocesos,fecha,productoComercial,ingredienteActivo,dosisSuministrada,metodoAplicacion,empelado_IdOperacion,empleado_IdResponsable,observaciones});
            await sustra.save()
            console.log(sustra);
            res.json({ message: "sustrato creado exitosamente", cultivos });
        } catch (error) {
            console.log(error);
            res.status(400).json({ err: "No se pudo crear el sustrato" })
        }

    },
    putSustrato:async (req, res) => {
        const {_id} = req.params;
        const sustra = await elaboracionSustrato.findByIdAndUpdate(_id, {new: true});
        res.json(sustra)
    },
    putSustratoActivar:async (req,res) => {
        const {_id} = req.params
        const sustra = await elaboracionSustrato.findByIdAndUpdate(_id, { estado: 1 }, { new: true })
        res.json({ sustra })
    },
    putSustratoDesactivar:async (req,res) => {
        const { _id } = req.params
        const sustra= await elaboracionSustrato.findByIdAndUpdate(_id, { estado: 0 }, { new: true })
        res.json({sustra })
    }
}

export default httpElaboracionSustrato

