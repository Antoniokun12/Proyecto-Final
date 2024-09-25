import Comprador from "../models/comprador.js";
import Parcela from "../models/parcelas.js";
import Cultivo from "../models/cultivos.js";
import Produccion from "../models/produccion.js";

// import { json } from "express";
// import cron from "node-cron"
const httpComprador = {
    // getComprador: async (req, res) => {
    //     const {busqueda} = req.query
    //     const comprador = await Comprador.find(
    //         {
    //             $or: [
    //                 {nombre: new RegExp(busqueda, "i") }
    //             ]
    //         }
    //     )
    //     res.json({ comprador })
    // },
    getComprador: async (req, res) => {
        try {
            // Obtener todos los compradores sin ningún filtro
            const comprador = await Comprador.find().sort({ _id: -1 });
            res.json({ comprador });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Error al obtener compradores" });
        }
    },
    
    getCompradoresByFinca: async (req, res) => {
        try {
            const { idFinca } = req.params; 
    
            // 1. Obtener las parcelas asociadas a la finca
            const parcelas = await Parcela.find({ idFinca }).select('_id');
            const idsParcelas = parcelas.map(parcela => parcela._id);
    
            // 2. Obtener los cultivos asociados a esas parcelas
            const cultivos = await Cultivo.find({ idParcela: { $in: idsParcelas } }).select('_id');
            const idsCultivos = cultivos.map(cultivo => cultivo._id);
    
            // 3. Obtener las producciones asociadas a esos cultivos
            const producciones = await Produccion.find({ idCultivo: { $in: idsCultivos } }).select('_id');
            const idsProducciones = producciones.map(produccion => produccion._id);
    
            // 4. Obtener los compradores asociados a esas producciones
            const compradores = await Comprador.find({ idProduccion: { $in: idsProducciones } })
                .populate('idProduccion')
                .sort({ _id: -1 });
    
            // 5. Enviar la respuesta con los compradores encontrados
            res.status(200).json({ compradores });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Error al obtener compradores" });
        }
    },

    getCompradorID: async (req, res) => {
        const {_id} = req.params
        const comprador = await Comprador.findById(_id)
        res.json({ comprador })
    },
    getCompradoractivado: async (req, res) => {
        try {
            const activados = await Comprador.find({ estado: 1 }).sort({ _id: -1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el Comprador activado' });
        }
    },

    getCompradordesactivado: async (req, res) => {
        try {
        const desactivados = await Comprador.find({ estado: 0 }).sort({ _id: -1 });
        res.json({ desactivados })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el Comprador desactivado' });
    }
    },
    postComprador: async (req, res) => {
        try {
            const {idProduccion,especie,nombre,telefono,cantidad,nguiaTransporte,valor}=req.body;
            const comprador = new Comprador({idProduccion,especie,nombre,telefono,cantidad,nguiaTransporte,valor});
            await comprador.save()
            console.log(comprador);
            res.json({ message: "comprador creado exitosamente", comprador });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "No se pudo crear el comprador" })
        }

    },
    putComprador:async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, estado, ...resto } = req.body;
        
            const compradorActualizado = await Comprador.findByIdAndUpdate(id, resto, { new: true });
        
            res.json({ comprador: compradorActualizado });
          } catch (error) {
            console.error("Error updating comprador:", error);
            res.status(400).json({ error: error.message || "No se pudo actualizar el comprador" });
          }
    },
    putCompradorActivar:async (req,res) => {
        const { id } = req.params;
        try {
            const comprador = await Comprador.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!comprador) {
                return res.status(404).json({ error: "comprador no encontrado" });
            }
            res.json({ comprador });
        } catch (error) {
            console.error("Error al activar comprador", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    putCompradorDesactivar:async (req,res) => {
        const { id } = req.params;
        try {
            const comprador = await Comprador.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!comprador) {
                return res.status(404).json({ error: "comprador no encontrado" });
            }
            res.json({ comprador });
        } catch (error) {
            console.error("Error al desactivar comprador", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
}

export default httpComprador