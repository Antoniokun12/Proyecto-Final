import empleados from "../models/empleados.js";
import { json } from "express";
import cron from "node-cron"
const httpEmpleados = {
    getEmpleados: async (req, res) => {
        const {busqueda} = req.query
        const empleado = await empleados.find(
            {
                $or: [
                    {nombre: new RegExp(busqueda, "i") }
                ]
            }
        )
        res.json({ empleado })
    },
    getEmpleadosID: async (req, res) => {
        const {_id} = req.params
        const empleado = await empleados.findById(_id)
        res.json({ empleado })
    },
    postEmpleados: async (req, res) => {
        try {
            const {nombre,documento,correo,contraseña,direccion,fechaNaciomiento,telefono,estudios,descripcion }=req.body;
            const empleado = new empleados ({nombre,documento,correo,contraseña,direccion,fechaNaciomiento,telefono,estudios,descripcion });
            await empleado.save()
            console.log(cultivos);
            res.json({ message: "empleado creado exitosamente", cultivos });
        } catch (error) {
            console.log(error);
            res.status(400).json({ err: "No se pudo crear el empleado" })
        }

    },
    putEmpleados:async (req, res) => {
        const {_id} = req.params;
        const empleado = await empleados.findByIdAndUpdate(_id, {new: true});
        res.json(empleado)
    },
    putEmpleadosActivar:async (req,res) => {
        const {_id} = req.params
        const empleado = await empleados.findByIdAndUpdate(_id, { estado: 1 }, { new: true })
        res.json({ empleado })
    },
    putEmpleadosDesactivar:async (req,res) => {
        const { _id } = req.params
        const empleado= await empleados.findByIdAndUpdate(_id, { estado: 0 }, { new: true })
        res.json({empleado })
    }
}

export default httpEmpleados

