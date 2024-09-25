import Proceso from "../models/procesos.js";
import Parcela from "../models/parcelas.js";
import Cultivo from "../models/cultivos.js";



// import { json } from "express";
// import cron from "node-cron"
const httpProcesos = {
    // getProcesos: async (req, res) => {
    //     const {busqueda} = req.query
    //     const proceso = await Proceso.find(
    //         {
    //             $or: [
    //                 {tipo: new RegExp(busqueda, "i") }
    //             ]
    //         }
    //     )
    //     res.json({ proceso})
    // },
    getProcesos: async (req, res) => {
        try {
            const proceso = await Proceso.find().sort({ _id: -1 });
            res.json({ proceso });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Error al obtener procesos" });
        }
    },

getProcesosByFinca: async (req, res) => {
        try {
            const { idFinca } = req.params;
    
            const parcelas = await Parcela.find({ idFinca }).select('_id');
            const idsParcelas = parcelas.map(parcela => parcela._id);
    
            const cultivos = await Cultivo.find({ idParcela: { $in: idsParcelas } }).select('_id');
            const idsCultivos = cultivos.map(cultivo => cultivo._id);
    
            const procesos = await Proceso.find({ idCultivo: { $in: idsCultivos } }).sort({ _id: -1 });

            res.json({ procesos });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Error al obtener procesos", error });
        }
    },
    
    getProcesosID: async (req, res) => {
        const {_id} = req.params
        const proceso = await Proceso.findById(_id)
        res.json({ proceso })
    },
    getProcesoactivado: async (req, res) => {
        try {
            const activados = await Proceso.find({ estado: 1 }).sort({ _id: -1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener Proceso activado' });
        }
    },

    getProcesodesactivado: async (req, res) => {
        try {
        const desactivados = await Proceso.find({ estado: 0 }).sort({ _id: -1 });
        res.json({ desactivados })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener Proceso desactivado' });
    }
    },
    postProcesos: async (req, res) => {
        try {
            const {idCultivo,idEmpleado,tipo,descripcion,fechaInicio,fechaFinal}=req.body
            const proceso = new Proceso({idCultivo,idEmpleado,tipo,descripcion,fechaInicio,fechaFinal});
            await proceso.save()
            console.log(proceso);
            res.json({ message: "el proceso fue creado exitosamente ", proceso });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "No se pudo crear el proceso" })
        }

    },
    putProcesos:async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, estado, ...resto } = req.body;
        
            const procesoActualizado = await Proceso.findByIdAndUpdate(id, resto, { new: true });
        
            res.json({ proceso: procesoActualizado });
          } catch (error) {

            console.error("Error updating proceso:", error);
            res.status(400).json({ error: error.message || "No se pudo actualizar el proceso" });
          }
    },
    putProcesosActivar:async (req,res) => {
        const { id } = req.params;
        try {
            const proceso = await Proceso.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!proceso) {
                return res.status(404).json({ error: "proceso no encontrado" });
            }
            res.json({ proceso });
        } catch (error) {
            console.error("Error al activar proceso", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    putProcesosDesactivar:async (req,res) => {
        const { id } = req.params;
        try {
            const proceso = await Proceso.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!proceso) {
                return res.status(404).json({ error: "proceso no encontrado" });
            }
            res.json({ proceso });
        } catch (error) {
            console.error("Error al desactivar proceso", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default httpProcesos