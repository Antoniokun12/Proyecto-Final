import Factura from "../models/factura.js";
import Parcela from "../models/parcelas.js";
import Cultivo from "../models/cultivos.js";
import Produccion from "../models/produccion.js";
import Comprador from "../models/comprador.js";


// import { json } from "express";
// import cron from "node-cron"
const httpFacturas = {
  // getFacturas: async (req, res) => {
  //     const {busqueda} = req.query
  //     const factura = await Factura.find(
  //         {
  //             $or: [
  //                 {nombre: new RegExp(busqueda, "i") }
  //             ]
  //         }
  //     )
  //     res.json({ factura })
  // },
  getFacturas: async (req, res) => {
    try {
      const factura = await Factura.find().sort({ _id: -1 });
      res.json({ factura });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: "Error al obtener facturas" });
    }
  },

  getFacturasByFinca: async (req, res) => {
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
      const compradores = await Comprador.find({ idProduccion: { $in: idsProducciones } }).select('_id');
      const idsCompradores = compradores.map(comprador => comprador._id);

      // 5. Obtener las facturas asociadas a esos compradores
      const facturas = await Factura.find({ idComprador: { $in: idsCompradores } })
        .sort({ _id: -1 })
      // .populate('idComprador'); // Si deseas obtener más información del comprador

      // 6. Enviar la respuesta con las facturas encontradas
      res.status(200).json({ facturas });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: "Error al obtener facturas" });
    }
  },

  getFacturasID: async (req, res) => {
    const { _id } = req.params
    const factura = await Factura.findById(_id)
    res.json({ factura })
  },

  getFacturaactivado: async (req, res) => {
    try {
      const activados = await Factura.find({ estado: 1 }).sort({ _id: -1 });
      res.json({ activados });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el Factura activado' });
    }
  },

  getFacturadesactivado: async (req, res) => {
    try {
      const desactivados = await Factura.find({ estado: 0 }).sort({ _id: -1 });
      res.json({ desactivados })
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el Factura desactivado' });
    }
  },
  
  postFacturas: async (req, res) => {
    try {
      const { idComprador, nloteComercial, valor, detalle } = req.body;

      const calculatedDetalle = detalle.map(item => {
        const subtotal = item.cantidad * valor;
        const iva = item.iva !== undefined ? item.iva : 19;
        const ivaAmount = (subtotal * iva) / 100;
        const total = subtotal + ivaAmount;

        return {
          ...item,
          subtotal,
          iva,
          total
        };
      });

      const factura = new Factura({
        idComprador,
        nloteComercial,
        valor,
        detalle: calculatedDetalle
      });

      await factura.save();
      console.log(factura);

      res.json({ message: "La factura fue creada exitosamente", factura });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo crear la factura" });
    }
  },

  putFacturas: async (req, res) => {
    try {
      const { id } = req.params;
      const { _id, estado, idComprador, nloteComercial, valor, detalle, ...resto } = req.body;

      const calculatedDetalle = detalle.map(item => {
        const subtotal = item.cantidad * valor;
        const iva = item.iva !== undefined ? item.iva : 19;
        const ivaAmount = (subtotal * iva) / 100;
        const total = subtotal + ivaAmount;

        return {
          ...item,
          subtotal,
          iva,
          total
        };
      });

      const updatedData = {
        ...resto,
        idComprador,
        nloteComercial,
        valor,
        detalle: calculatedDetalle
      };

      const FacturaActualizado = await Factura.findByIdAndUpdate(id, updatedData, { new: true });

      if (!FacturaActualizado) {
        return res.status(404).json({ error: "Factura no encontrada" });
      }

      res.json({ factura: FacturaActualizado });
    } catch (error) {
      console.error("Error updating factura:", error);
      res.status(400).json({ error: error.message || "No se pudo actualizar la factura" });
    }
  },
  // putFacturasActivar:async (req,res) => {
  //     const { id } = req.params;
  //     try {
  //         const factura = await Factura.findByIdAndUpdate(id, { estado: 1 }, { new: true });
  //         if (!factura) {
  //             return res.status(404).json({ error: "factura no encontrado" });
  //         }
  //         res.json({ factura });
  //     } catch (error) {
  //         console.error("Error al desactivar factura", error);
  //         res.status(500).json({ error: "Error interno del servidor" });
  //     }
  // },
  // putFacturasDesactivar:async (req,res) => {
  //     const { id } = req.params;
  //     try {
  //         const factura = await Factura.findByIdAndUpdate(id, { estado: 0 }, { new: true });
  //         if (!factura) {
  //             return res.status(404).json({ error: "factura no encontrado" });
  //         }
  //         res.json({ factura });
  //     } catch (error) {
  //         console.error("Error al desactivar factura", error);
  //         res.status(500).json({ error: "Error interno del servidor" });
  //     }
  // }
}

export default httpFacturas