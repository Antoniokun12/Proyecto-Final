import { Router } from "express";
import httpFacturas from "../controllers/factura.js";
import helpersFactura from "../helpers/factura.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from '../middlewares/validar-jwt.js';
import { check, body } from 'express-validator';


const router = Router();

router.get("/listar",[validarJWT],httpFacturas.getFacturas);
router.get("/listarporfinca/:idFinca",httpFacturas.getFacturasByFinca);
router.get("/listarid/:id",httpFacturas.getFacturasID);

router.post("/escribir", [
  check('idComprador').custom(helpersFactura.validaridComprador),
  check("nloteComercial", "nro de lote Comercial no puede estar vacio").notEmpty(),
  check("valor", "valor no puede estar vacio").notEmpty(),
  check("valor").custom(helpersFactura.validarValor),
  body('detalle').isArray({ min: 1 }).withMessage('detalle debe ser un array con al menos un elemento'),
  body('detalle.*.idInventario', 'debe ser un id valido de inventario').notEmpty(),
  body('detalle.*.nombreProducto', 'nombreProducto no puede estar vacio').notEmpty(),
  body('detalle.*.cantidad', 'cantidad debe ser un número y no puede estar vacio').isNumeric(),
  body('detalle.*.subtotal').optional().isNumeric().withMessage('subtotal debe ser un número'),
  body('detalle.*.total').optional().isNumeric().withMessage('total debe ser un número'),
  body('detalle.*.iva').optional().isNumeric().withMessage('iva debe ser un número'),
  validarCampos
], httpFacturas.postFacturas);

router.put( "/modificar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersFactura.validarExistaId),
    check('idComprador').custom(helpersFactura.validaridComprador),
    check("nloteComercial", "nro de lote Comercial no puede estar vacio").notEmpty(),
    check("valor", "valor no puede estar vacio").notEmpty(),
    check("valor").custom(helpersFactura.validarValor),
    body('detalle').isArray({ min: 1 }).withMessage('detalle debe ser un array con al menos un elemento'),
    body('detalle.*.idInventario', 'debe ser un id valido de inventario').custom(helpersFactura.validaridInventario),
    body('detalle.*.nombreProducto', 'nombreProducto no puede estar vacio').notEmpty(),
    body('detalle.*.cantidad', 'cantidad debe ser un número y no puede estar vacio').isNumeric(),
    body('detalle.*.subtotal').optional().isNumeric().withMessage('subtotal debe ser un número'),
    body('detalle.*.total').optional().isNumeric().withMessage('total debe ser un número'),
    body('detalle.*.iva').optional().isNumeric().withMessage('iva debe ser un número'),
    validarCampos
  ], httpFacturas.putFacturas
)

// router.put("/activar/:id", [
//     check("id", "Se necesita un mongoId valido").isMongoId(),
//     check("id").custom(helpersFactura.validarExistaId),
//     validarCampos
//   ], httpFacturas.putFacturasActivar
// ),
// router.put("/desactivar/:id", [
//     check("id", "Se necesita un mongoId valido").isMongoId(),
//     check("id").custom(helpersFactura.validarExistaId),
//     validarCampos
//   ], httpFacturas.putFacturasDesactivar
// )


export default router