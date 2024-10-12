import Semilla from "../models/semillas.js";

const httpSemillas = {
    // Obtener todas las semillas
    getSemillas: async (req, res) => {
        try {
            const semillas = await Semilla.find().sort({ _id: -1 });
            res.json({ semillas });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener las semillas' });
        }
    },

    // Obtener una semilla por su ID
    getSemillasID: async (req, res) => {
        try {
            const { id } = req.params;
            const semilla = await Semilla.findById(id);
            if (!semilla) {
                return res.status(404).json({ error: 'Semilla no encontrada' });
            }
            res.json({ semilla });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener la semilla' });
        }
    },

    getSemillasactivado: async (req, res) => {
        try {
            const activados = await Semilla.find({ estado: 1 }).sort({ _id: -1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener Semillas activos' });
        }
    },

    getSemillasdesactivado: async (req, res) => {
        try {
            const desactivados = await Semilla.find({ estado: 0 }).sort({ _id: -1 });
            res.json({ desactivados })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener Semillas desactivados' });
        }
    },


    // Crear una nueva semilla
    postSemillas: async (req, res) => {
        try {
            const { id_finca, nombre, registro_ica, registro_invima, fechaVencimiento, especie_variedad, numLote, origen, poderGerminativo, observaciones, unidad, cantidad } = req.body;

            const nuevaSemilla = new Semilla({
                id_finca,
                nombre,
                registro_ica,
                registro_invima,
                fechaVencimiento,
                especie_variedad,
                numLote,
                origen,
                poderGerminativo,
                observaciones,
                unidad,
                cantidad
            });

            await nuevaSemilla.save();
            res.json({ message: "La semilla fue creada exitosamente", semilla: nuevaSemilla });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: "No se pudo crear la semilla" });
        }
    },

    // Actualizar una semilla existente
    putSemillas: async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, ...restoDatos } = req.body;

            const semillaActualizada = await Semilla.findByIdAndUpdate(id, restoDatos, { new: true });
            if (!semillaActualizada) {
                return res.status(404).json({ error: 'Semilla no encontrada' });
            }
            res.json({ message: "Semilla actualizada exitosamente", semilla: semillaActualizada });
        } catch (error) {
            console.error("Error al actualizar la semilla:", error);
            res.status(400).json({ error: "No se pudo actualizar la semilla" });
        }
    },

    putSemillasActivar: async (req, res) => {
        const {id } = req.params;
        try {
            const semilla = await Semilla.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!semilla) {
                return res.status(404).json({ err: "Semilla no encontrado" });
            }
            res.json({ semilla });
        } catch (error) {
            console.log(error);
            res.status(400).json({ err: "No se pudo activar la semilla" });
        }
    },
    putSemillasDesactivar: async (req, res) => {
        const { id } = req.params;
        try {
            const semilla = await Semilla.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!semilla) {
                return res.status(404).json({ err: "Semilla no encontrado" });
            }
            res.json({ semilla });
        } catch (error) {
            console.log(error);
            res.status(400).json({ err: "No se pudo desactivar la semilla" });
        }
    }
};

export default httpSemillas;

