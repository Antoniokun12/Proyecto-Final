import Gasto from "../models/gastos.js";
import Insumo from "../models/insumos.js"; // Asegúrate de importar el modelo correcto
import Semilla from "../models/semillas.js"; // Asegúrate de importar el modelo correcto

// Conversión de unidades a la unidad base (kilogramos o litros)
const conversiones = {
    g: 0.001,  // gramos a kilogramos
    kg: 1,     // kilogramos a kilogramos (unidad base)
    t: 1000,   // toneladas a kilogramos
    ml: 0.001, // mililitros a litros
    lts: 1,    // litros a litros (unidad base)
};

// Función para convertir la cantidad a la unidad base
function convertirAUnidadBase(cantidad, unidad) {
    const factorConversion = conversiones[unidad];
    if (!factorConversion) {
        throw new Error(`Unidad no soportada: ${unidad}`);
    }
    return cantidad * factorConversion;
}

const httpGastos = {
    getGastos: async (req, res) => {
        try {
            const gasto = await Gasto.find().sort({ _id: -1 });
            res.json({ gasto });
        } catch (error) {
            console.error(error);
            res.status(500).json({ err: "Error al obtener gastos" });
        }
    },
    
    getGastosID: async (req, res) => {
        try {
            const {id} = req.params;
            const gasto = await Gasto.findById(id);
            if (!gasto) {
                return res.status(404).json({ error: "Gasto no encontrado" });
            }
            res.json({ gasto });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al obtener el gasto" });
        }
    },

    postGastos: async (req, res) => {
        const session = await Gasto.startSession();
        session.startTransaction();
    
        try {
            const { id_finca, nombre, numero_factura, descripcion, insumos = [], semillas = [], otros_gastos = [] } = req.body;
    
            // Procesar insumos
            const insumosProcesados = await Promise.all(insumos.map(async (insumo) => {
                const { id_insumo, cantidad, unidad, sub_total } = insumo;
                const cantidadConvertida = convertirAUnidadBase(cantidad, unidad);
    
                const insumoExistente = await Insumo.findById(id_insumo).session(session);
                if (!insumoExistente) {
                    throw new Error(`Insumo con ID ${id_insumo} no encontrado`);
                }
    
                return {
                    ...insumo,
                    cantidad: cantidadConvertida,
                    sub_total,  // Mantener el subtotal proporcionado
                    unidad: insumoExistente.unidad
                };
            }));
    
            // Procesar semillas
            const semillasProcesadas = semillas.map(semilla => {
                const { cantidad, unidad, sub_total } = semilla;
                const cantidadConvertida = convertirAUnidadBase(cantidad, unidad);
    
                return {
                    ...semilla,
                    cantidad: cantidadConvertida,
                    sub_total,  // Mantener el subtotal proporcionado
                    unidad: 'kg' // Establecer la unidad base como kilogramos
                };
            });
    
            // Procesar otros gastos
            const otrosGastosProcesados = otros_gastos.map(gasto => {
                const { tipo, descripcion, monto } = gasto;
                return {
                    tipo,
                    descripcion,
                    monto
                };
            });
    
            // Crear nuevo gasto (el total se calculará automáticamente en el pre-save)
            const gasto = new Gasto({
                id_finca,
                nombre,
                numero_factura,
                descripcion,
                insumos: insumosProcesados,
                semillas: semillasProcesadas,
                otros_gastos: otrosGastosProcesados
            });
    
            // Guardar el gasto
            await gasto.save({ session });
    
            // Actualizar las cantidades de insumos en la base de datos
            for (const insumo of insumosProcesados) {
                const { id_insumo, cantidad } = insumo;
                
                await Insumo.findByIdAndUpdate(
                    id_insumo,
                    { $inc: { cantidad: cantidad } },
                    { session }
                );
            }
    
            // Actualizar las cantidades de semillas en la base de datos
            for (const semilla of semillasProcesadas) {
                const { id_semilla, cantidad } = semilla;
                
                await Semilla.findByIdAndUpdate(
                    id_semilla,
                    { $inc: { cantidad: cantidad } },
                    { session }
                );
            }
    
            await session.commitTransaction();
            res.json({ message: "Gasto creado exitosamente y cantidades actualizadas", gasto });
    
        } catch (error) {
            console.error(error);
            await session.abortTransaction();
            res.status(400).json({ error: "No se pudo crear el gasto" });
        } finally {
            session.endSession();  // Siempre cerrar la sesión al final
        }
    },
    
    

    putGastos: async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, ...resto } = req.body;
        
            const gastoActualizado = await Gasto.findByIdAndUpdate(id, resto, { new: true });
            if (!gastoActualizado) {
                return res.status(404).json({ error: "Gasto no encontrado" });
            }
            res.json({ message: "Gasto actualizado exitosamente", gasto: gastoActualizado });
        } catch (error) {
            console.error("Error al actualizar gasto:", error);
            res.status(400).json({ error: "No se pudo actualizar el gasto" });
        }
    }
};

export default httpGastos;
