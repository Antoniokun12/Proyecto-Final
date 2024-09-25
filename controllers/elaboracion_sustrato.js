import Sustrato from "../models/elaboracion_sustrato.js";
import Parcela from "../models/parcelas.js";
import Cultivo from "../models/cultivos.js";
import Proceso from "../models/procesos.js";


// import { json } from "express";
// import cron from "node-cron"
const httpElaboracionSustrato = {
    // getSustrato: async (req, res) => {
    //     const {busqueda} = req.query
    //     const sustra = await Sustrato.find(
    //         {
    //             $or: [
    //                 {nombre: new RegExp(busqueda, "i") }
    //             ]
    //         }
    //     )
    //     res.json({ sustra })
    // },
    getSustrato: async (req, res) => {
        try {
            // Obtener todos los sustratos sin ningún filtro
            const sustra = await Sustrato.find().sort({ _id: -1 });
            res.json({ sustra });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Error al obtener sustratos" });
        }
    },
getSustratosByFinca: async (req, res) => {
        try {
            const { idFinca } = req.params; // Se asume que idFinca viene en los parámetros de la URL
    
            // 1. Obtener las parcelas asociadas a la finca
            const parcelas = await Parcela.find({ idFinca }).select('_id');
            const idsParcelas = parcelas.map(parcela => parcela._id);
    
            // 2. Obtener los cultivos asociados a esas parcelas
            const cultivos = await Cultivo.find({ idParcela: { $in: idsParcelas } }).select('_id');
            const idsCultivos = cultivos.map(cultivo => cultivo._id);
    
            // 3. Obtener los procesos asociados a esos cultivos
            const procesos = await Proceso.find({ idCultivo: { $in: idsCultivos } }).select('_id');
            const idsProcesos = procesos.map(proceso => proceso._id);
    
            // 4. Obtener los sustratos asociados a esos procesos
            const sustratos = await Sustrato.find({ idProceso: { $in: idsProcesos } })
                .sort({ _id: -1 })
                // .populate('idProceso'); // Si quieres información adicional sobre el proceso
    
            // 5. Enviar la respuesta con los sustratos encontrados
            res.status(200).json({ sustratos });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Error al obtener sustratos" });
        }
    },
    
    getSustratoID: async (req, res) => {
        const {_id} = req.params
        const sustra = await Sustrato.findById(_id)
        res.json({ sustra })
    },
    getSustratoactivado: async (req, res) => {
        try {
            const activados = await Sustrato.find({ estado: 1 }).sort({ _id: -1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el Sustrato activado' });
        }
    },

    getSustratodesactivado: async (req, res) => {
        try {
        const desactivados = await Sustrato.find({ estado: 0 }).sort({ _id: -1 });
        res.json({ desactivados })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el Sustrato desactivado' });
    }
    },
    postSustrato: async (req, res) => {
        try {
            const {idProceso,productoComercial,ingredienteActivo,dosisUtilizada,metodoAplicacion,idEmpleado,observaciones}=req.body;
            const sustra = new Sustrato ({idProceso,productoComercial,ingredienteActivo,dosisUtilizada,metodoAplicacion,idEmpleado,observaciones});
            await sustra.save()
            console.log(sustra);
            res.json({ message: "sustrato creado exitosamente", sustra });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "No se pudo crear el sustrato" })
        }

    },
    putSustrato:async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, estado, ...resto } = req.body;
        
            const elaboracionActualizado = await Sustrato.findByIdAndUpdate(id, resto, { new: true });
        
            res.json({ sustra: elaboracionActualizado });
          } catch (error) {
            console.error("Error updating el sustrato:", error);
            res.status(400).json({ error: error.message || "No se pudo actualizar el sustrato" });
          }
    },
    putSustratoActivar:async (req,res) => {
        const { id } = req.params;
        try {
            const sustra = await Sustrato.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!sustra) {
                return res.status(404).json({ error: "sustrato no encontrado" });
            }
            res.json({ sustra });
        } catch (error) {
            console.error("Error al activar sustrato", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    putSustratoDesactivar:async (req,res) => {
        const { id } = req.params;
        try {
            const sustra = await Sustrato.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!sustra) {
                return res.status(404).json({ error: "sustrato no encontrado" });
            }
            res.json({ sustra });
        } catch (error) {
            console.error("Error al desactivar sustrato", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default httpElaboracionSustrato

