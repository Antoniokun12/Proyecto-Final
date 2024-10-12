import mongoose from "mongoose";

// Esquema para insumos
const insumoSchema = new mongoose.Schema({
    id_proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor', required: true },
    id_insumo: { type: mongoose.Schema.Types.ObjectId, ref: 'Insumo', required: true },
    unidad: { 
        type: String, 
        required: true,
        enum: ['g', 'kg', 't', 'ml', 'lts'] // Solo se permiten estas unidades
    },
    cantidad: { type: Number, required: true },
    sub_total: { type: Number, required: true }
});

// Esquema para semillas
const semillaSchema = new mongoose.Schema({
    id_proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor', required: true },
    id_semilla: { type: mongoose.Schema.Types.ObjectId, ref: 'Semilla', required: true },
    unidad: { 
        type: String, 
        required: true,
        enum: ['g', 'kg'] // Solo se permiten estas unidades
    },
    cantidad: { type: Number, required: true },
    sub_total: { type: Number, required: true }
});

// Esquema para otros tipos de gastos
const otrosGastosSchema = new mongoose.Schema({
    tipo: { type: String, required: true },  // Ej: 'recibo de luz', 'agua', 'mantenimiento'
    descripcion: { type: String, required: true },
    monto: { type: Number, required: true }  // Monto del gasto específico
});

// Esquema principal de gasto
const gastoSchema = new mongoose.Schema({
    id_finca: { type: mongoose.Schema.Types.ObjectId, ref: 'Finca', required: true },
    nombre: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
    numero_factura: { type: String, required: true, unique: true },
    descripcion: { type: String, required: true },
    total: { type: Number },  // Total del gasto calculado automáticamente
    insumos: { type: [insumoSchema], default: [] },  // Lista opcional de insumos
    semillas: { type: [semillaSchema], default: [] },  // Lista opcional de semillas
    otros_gastos: { type: [otrosGastosSchema], default: [] }  // Lista opcional de otros gastos
});

// Middleware pre-save para calcular el total
gastoSchema.pre('save', function (next) {
    const gasto = this;

    // Sumar los subtotales de insumos, semillas y otros gastos
    const totalInsumos = gasto.insumos.reduce((sum, insumo) => sum + insumo.sub_total, 0);
    const totalSemillas = gasto.semillas.reduce((sum, semilla) => sum + semilla.sub_total, 0);
    const totalOtrosGastos = gasto.otros_gastos.reduce((sum, otro) => sum + otro.monto, 0);

    // Asignar el total calculado
    gasto.total = totalInsumos + totalSemillas + totalOtrosGastos;

    next();
});

export default mongoose.model("Gasto", gastoSchema);



