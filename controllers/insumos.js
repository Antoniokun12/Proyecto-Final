import Insumo from "../models/insumos.js";

const httpInsumos = {
    // Obtener todos los insumos
    getInsumos: async (req, res) => {
        try {
            const insumos = await Insumo.find().sort({ _id: -1 });
            res.json({ insumos });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener los insumos' });
        }
    },

    // Obtener un insumo por su ID
    getInsumosID: async (req, res) => {
        try {
            const { id } = req.params;
            const insumo = await Insumo.findById(id);
            if (!insumo) {
                return res.status(404).json({ error: 'Insumo no encontrado' });
            }
            res.json({ insumo });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el insumo' });
        }
    },

    getInsumosactivado: async (req, res) => {
        try {
            const activados = await Insumo.find({ estado: 1 }).sort({ _id: -1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener Insumos activos' });
        }
    },

    getInsumosdesactivado: async (req, res) => {
        try {
            const desactivados = await Insumo.find({ estado: 0 }).sort({ _id: -1 });
            res.json({ desactivados })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener Insumos desactivados' });
        }
    },

    // Crear un nuevo insumo
    postInsumos: async (req, res) => {
        try {
            const { id_finca, nombre, registro_ica, registro_invima, relacion_NPK, unidad, cantidad, observaciones } = req.body;

            const nuevoInsumo = new Insumo({
                id_finca,
                nombre,
                registro_ica,
                registro_invima,
                relacion_NPK,
                unidad,
                cantidad,
                observaciones
            });

            await nuevoInsumo.save();
            res.json({ message: "El insumo fue creado exitosamente", insumo: nuevoInsumo });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: "No se pudo crear el insumo" });
        }
    },

    // Actualizar un insumo existente
    putInsumos: async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, ...restoDatos } = req.body;

            const insumoActualizado = await Insumo.findByIdAndUpdate(id, restoDatos, { new: true });
            if (!insumoActualizado) {
                return res.status(404).json({ error: 'Insumo no encontrado' });
            }
            res.json({ message: "Insumo actualizado exitosamente", insumo: insumoActualizado });
        } catch (error) {
            console.error("Error al actualizar el insumo:", error);
            res.status(400).json({ error: "No se pudo actualizar el insumo" });
        }
    },

    putInsumosActivar: async (req, res) => {
        const { id } = req.params;
        try {
            const insumos = await Insumo.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!insumos) {
                return res.status(404).json({ err: "Insumo no encontrado" });
            }
            res.json({ insumos });
        } catch (error) {
            console.log(error);
            res.status(400).json({ err: "No se pudo activar el insumo" });
        }
    },
    putInsumosDesactivar: async (req, res) => {
        const { id } = req.params;
        try {
            const insumos = await Insumo.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!insumos) {
                return res.status(404).json({ err: "Insumo no encontrado" });
            }
            res.json({ insumos });
        } catch (error) {
            console.log(error);
            res.status(400).json({ err: "No se pudo desactivar el insumo" });
        }
    }
};

export default httpInsumos;
