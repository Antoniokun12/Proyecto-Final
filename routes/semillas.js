import { Router } from "express";
import httpSemillas from "../controllers/semillas.js";
import helpersSemillas from "../helpers/semillas.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from '../middlewares/validar-jwt.js';
import { check, body } from "express-validator";


const router = Router();

router.get("/listar",[validarJWT],httpSemillas.getSemillas);
router.get("/listarid/:id", httpSemillas.getSemillasID);
router.get("/listaractivados",httpSemillas.getSemillasactivado)
router.get("/listardesactivados",httpSemillas.getSemillasdesactivado)
router.post("/escribir", [
  check('idProveedor').custom(helpersSemillas.validaridProveedor),
  check("numFactura", "numFactura no puede estar vacio").notEmpty().isString(),
  // check('fechaVencimiento')
  // .isAfter('fechaCompra')
  // .withMessage('La fecha de vencimiento debe ser posterior a la fecha de compra'),
  body('fechaCompra').custom((value, { req }) => {
    if (value) {
      return true; 
    } else {
      req.body.fechaCompra = new Date().toISOString(); 
      return true;
    }
  }),
  body('fechaVencimiento')
    .custom((value, { req }) => {
      const fechaCompra = new Date(req.body.fechaCompra);
      const fechaVencimiento = new Date(value);
      if (fechaVencimiento <= fechaCompra) {
        throw new Error('La fecha de vencimiento debe ser posterior a la fecha de compra');
      }
      return true;
    })
    .withMessage('La fecha de vencimiento debe ser posterior a la fecha de compra'),
  check("especie", "especie no puede estar vacio").notEmpty().isString(),
  check("NumLote", "NumLote no puede estar vacia").notEmpty().isNumeric(),
  check("origen", "origen no puede estar vacio").notEmpty().isString(),
  check("poderGerminativo", "poderGerminativo no puede estar vacio").notEmpty().isString(),
  check("unidadtotal", "unidadtotal no puede estar vacio").notEmpty().isNumeric(),
  check("total", "total no puede estar vacia").notEmpty().isNumeric(),
    validarCampos
  ], httpSemillas.postSemillas),
router.put( "/modificar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersSemillas.validarExistaId),
    check('idProveedor').custom(helpersSemillas.validaridProveedor),
    check("numFactura", "numFactura no puede estar vacio").notEmpty().isString(),
    body('fechaCompra').custom((value, { req }) => {
      if (value) {
        return true; 
      } else {
        req.body.fechaCompra = new Date().toISOString(); 
        return true;
      }
    }),
    body('fechaVencimiento')
      .custom((value, { req }) => {
        const fechaCompra = new Date(req.body.fechaCompra);
        const fechaVencimiento = new Date(value);
        if (fechaVencimiento <= fechaCompra) {
          throw new Error('La fecha de vencimiento debe ser posterior a la fecha de compra');
        }
        return true;
      })
      .withMessage('La fecha de vencimiento debe ser posterior a la fecha de compra'),
    check("especie", "especie no puede estar vacio").notEmpty().isString(),
    check("NumLote", "NumLote no puede estar vacia").notEmpty().isNumeric(),
    check("origen", "origen no puede estar vacio").notEmpty().isString(),
    check("poderGerminativo", "poderGerminativo no puede estar vacio").notEmpty().isString(),
    check("unidadtotal", "unidadtotal no puede estar vacio").notEmpty().isNumeric(),
    check("total", "total no puede estar vacia").notEmpty().isNumeric(),
    validarCampos
  ], httpSemillas.putSemillas
),
router.put("/activar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersSemillas.validarExistaId),
    validarCampos
  ], httpSemillas.putSemillasActivar
),
router.put("/desactivar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersSemillas.validarExistaId),
    validarCampos
  ], httpSemillas.putSemillasDesactivar
)


export default router