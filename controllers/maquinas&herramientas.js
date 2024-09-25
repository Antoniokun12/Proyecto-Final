import Maquina_herramienta from "../models/maquinas&herramientas.js";
// import { json } from "express";
// import cron from "node-cron"
const httpMaquinarias = {
    // getMaquinarias: async (req, res) => {
    //     const {busqueda} = req.query
    //     const maquinaria = await Maquina_herramienta.find(
    //         {
    //             $or: [
    //                 {nombre: new RegExp(busqueda, "i") }
    //             ]
    //         }
    //     )
    //     res.json({ maquinaria})
    // },
    getMaquinarias: async (req, res) => {
        try {
            const maquina = await Maquina_herramienta.find({}).sort({ _id: -1 });
            res.json({ maquina });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener las maquinas' });
        }
    },
    getMaquinariasID: async (req, res) => {
        const { id } = req.params
        const maquinaria = await Maquina_herramienta.findById(id)
        res.json({ maquinaria })
    },

    getMaquina_herramientaactivado: async (req, res) => {
        try {
            const activados = await Maquina_herramienta.find({ estado: 1 }).sort({ _id: -1 });
            res.json({ activados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener Maquina y herramienta activado' });
        }
    },

    getMaquina_herramientadesactivado: async (req, res) => {
        try {
            const desactivados = await Maquina_herramienta.find({ estado: 0 }).sort({ _id: -1 });
            res.json({ desactivados })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener Maquina y herramienta desactivado' });
        }
    },
    postMaquinarias: async (req, res) => {
        try {
            const { idProveedor, nombre, tipo, observaciones, cantidad, total, mantenimiento, desinfeccion } = req.body
            const maquinaria = new Maquina_herramienta({ idProveedor, nombre, tipo, observaciones, cantidad, total, mantenimiento, desinfeccion });
            await maquinaria.save()
            console.log(maquinaria);
            res.json({ message: "la maquinaria fue creada exitosamente ", maquinaria });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "No se pudo crear la maquinaria" })
        }

    },
    putMaquinarias: async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, estado, ...resto } = req.body;

            const maquinaActualizada = await Maquina_herramienta.findByIdAndUpdate(id, resto, { new: true });

            res.json({ Maquina_herramienta: maquinaActualizada });
        } catch (error) {

            console.error("Error updating Maquina_herramienta:", error);
            res.status(400).json({ error: error.message || "No se pudo actualizar la maquina" });
        }
    },
    putAgregarMantenimiento: async (req, res) => {
        const { id } = req.params;
        const { mantenimiento } = req.body;
    
        try {
            const maquina = await Maquina_herramienta.findById(id);
            if (!maquina) {
                return res.status(404).json({ error: "Máquina no encontrada" });
            }
    
            // Agregar nuevo mantenimiento
            maquina.mantenimiento.push(mantenimiento);
    
            await maquina.save();
    
            res.status(200).json({ message: "Mantenimiento agregado", maquina });
        } catch (error) {
            console.error("Error al agregar mantenimiento", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    putEditarMantenimiento: async (req, res) => {
        const { id, mantenimientoId } = req.params;
        const { mantenimiento } = req.body;
    
        try {
            const maquina = await Maquina_herramienta.findById(id);
            if (!maquina) {
                return res.status(404).json({ error: "Máquina no encontrada" });
            }
    
            const mantenimientoItem = maquina.mantenimiento.id(mantenimientoId);
            if (!mantenimientoItem) {
                return res.status(404).json({ error: "Mantenimiento no encontrado" });
            }
    
            // Actualizar los campos del mantenimiento encontrado
            mantenimientoItem.fechamantenimiento = mantenimiento.fechamantenimiento;
            mantenimientoItem.responsable = mantenimiento.responsable;
            mantenimientoItem.observaciones = mantenimiento.observaciones;
            mantenimientoItem.precio = mantenimiento.precio;
    
            await maquina.save();
    
            res.status(200).json({ message: "Mantenimiento actualizado", maquina });
        } catch (error) {
            console.error("Error al actualizar mantenimiento", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    putAgregarProductoDesinfeccion: async (req, res) => {
        const { id } = req.params;
        const { desinfeccion } = req.body;
    
        try {
            const maquina = await Maquina_herramienta.findById(id);
            if (!maquina) {
                return res.status(404).json({ error: "Máquina no encontrada" });
            }
    
            // Agregar desinfección con productos
            maquina.desinfeccion.push(desinfeccion);
    
            await maquina.save();
    
            res.status(200).json({ message: "Producto agregado a desinfección", maquina });
        } catch (error) {
            console.error("Error al agregar producto a desinfección", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    putEditarProductoDesinfeccion: async (req, res) => {
        const { id, desinfeccionId, productoId } = req.params;
        const { producto } = req.body;
    
        try {
            const maquina = await Maquina_herramienta.findById(id);
            if (!maquina) {
                return res.status(404).json({ error: "Máquina no encontrada" });
            }
    
            const desinfeccionItem = maquina.desinfeccion.id(desinfeccionId);
            if (!desinfeccionItem) {
                return res.status(404).json({ error: "Desinfección no encontrada" });
            }
    
            const productoItem = desinfeccionItem.productos.id(productoId);
            if (!productoItem) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }
    
            // Actualizar los campos del producto encontrado
            productoItem.idInsumo = producto.idInsumo;
            productoItem.idEmpleado = producto.idEmpleado;
    
            await maquina.save();
    
            res.status(200).json({ message: "Producto de desinfección actualizado", maquina });
        } catch (error) {
            console.error("Error al actualizar producto de desinfección", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },        
    
    
    putMaquinariasActivar: async (req, res) => {
        const { id } = req.params;
        try {
            const maquinaria = await Maquina_herramienta.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            if (!maquinaria) {
                return res.status(404).json({ error: "maquinaria no encontrada" });
            }
            res.json({ maquinaria });
        } catch (error) {
            console.error("Error al activar maquinaria", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }

    },
    putMaquinariasDesactivar: async (req, res) => {
        const { id } = req.params;
        try {
            const maquinaria = await Maquina_herramienta.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            if (!maquinaria) {
                return res.status(404).json({ error: "maquinaria no encontrada" });
            }
            res.json({ maquinaria });
        } catch (error) {
            console.error("Error al desactivar maquinaria", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default httpMaquinarias