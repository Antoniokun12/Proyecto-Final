import Clima from "../models/clima.js";
// import { json } from "express";
// import cron from "node-cron"
const httpClima = {
    // getClima: async (req, res) => {
    //     const {busqueda} = req.query
    //     const clima = await Clima.find(
    //         {
    //             $or: [
    //                 {nombre: new RegExp(busqueda, "i") }
    //             ]
    //         }
    //     )
    //     res.json({ clima })
    // },
    getClima: async (req, res) => {
        try {
            // Obtener todos los registros de clima sin ningún filtro
            const clima = await Clima.find();
            res.json({ clima });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Error al obtener registros de clima" });
        }
    },

    getClimaID: async (req, res) => {
        const { _id } = req.params
        const clima = await Clima.findById(_id)
        res.json({ clima })
    },
    postClima: async (req, res) => {
        try {
            const { idFinca, idEmpleado, tipo, horaFinal, tempMin, tempMax } = req.body;
            const clima = new Clima({ idFinca, idEmpleado, tipo, horaFinal, tempMin, tempMax });
            await clima.save()
            console.log(clima);
            res.json({ message: "clima creado exitosamente", clima });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "No se pudo crear el clima" })
        }

    },
    putClima: async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, estado, ...resto } = req.body;

            const climaActualizado = await Clima.findByIdAndUpdate(id, resto, { new: true });

            res.json({ clima: climaActualizado });
        } catch (error) {
            console.error("Error updating Clima:", error);
            res.status(400).json({ error: error.message || "No se pudo actualizar el Clima" });
        }
    },
    // putClimaActivar:async (req,res) => {
    //     const { id } = req.params;
    //     try {
    //         const clima = await Clima.findByIdAndUpdate(id, { estado: 1 }, { new: true });
    //         if (!clima) {
    //             return res.status(404).json({ error: "clima no encontrado" });
    //         }
    //         res.json({ clima });
    //     } catch (error) {
    //         console.error("Error al desactivar clima", error);
    //         res.status(500).json({ error: "Error interno del servidor" });
    //     }
    // },
    // putClimaDesactivar:async (req,res) => {
    //     const { id } = req.params;
    //     try {
    //         const clima = await Clima.findByIdAndUpdate(id, { estado: 0 }, { new: true });
    //         if (!clima) {
    //             return res.status(404).json({ error: "clima no encontrado" });
    //         }
    //         res.json({ clima });
    //     } catch (error) {
    //         console.error("Error al desactivar clima", error);
    //         res.status(500).json({ error: "Error interno del servidor" });
    //     }
    // }
}

export default httpClima