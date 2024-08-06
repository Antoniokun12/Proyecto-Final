import { Router } from "express";
import httpPreparaciones from "../controllers/preparacion_suelo.js";
import helpersPreparacion from "../helpers/preparacion_suelo.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from '../middlewares/validar-jwt.js';
import { check, body } from 'express-validator';


const router = Router();

router.get("/listar",[validarJWT], httpPreparaciones.getPreparaciones);
router.get("/listarid/:id",httpPreparaciones.getPreparacionesID);
router.get("/listaractivados",httpPreparaciones.getSueloactivado)
router.get("/listardesactivados",httpPreparaciones.getSuelodesactivado)
router.post("/escribir", [
  check('idParcela').custom(helpersPreparacion.validaridParcela),
  check('idEmpleado').custom(helpersPreparacion.validaridEmpleado),
  // check("fecha", "fecha no puede estar vacio").notEmpty(),
  // check("fecha", "fecha debe estar escrito correcto").isISO8601().toDate(),
  check("operario", "operario no puede estar vacio").notEmpty().isString(),
  check("responsable", "responsable no puede estar vacio").notEmpty().isString(),
  check("observaciones", "observaciones no puede estar vacio").notEmpty(),
  body('productos').isArray({ min: 1 }).withMessage('productos debe ser un array con al menos un elemento'),
  body('productos.*.ingredienteActivo').notEmpty().isString(),
  body('productos.*.dosis').notEmpty().isString(),
  body('productos.*.metodoAplicacion').notEmpty().isString(),
    validarCampos
  ], httpPreparaciones.postPreparaciones),
router.put( "/modificar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersPreparacion.validarExistaId),
    check('idParcela').custom(helpersPreparacion.validaridParcela),
    check('idEmpleado').custom(helpersPreparacion.validaridEmpleado),
    // check("fecha", "fecha no puede estar vacio").notEmpty(),
    // check("fecha", "fecha debe estar escrito correcto").isISO8601().toDate(),
    check("operario", "operario no puede estar vacio").notEmpty().isString(),
    check("responsable", "responsable no puede estar vacio").notEmpty().isString(),
    check("observaciones", "observaciones no puede estar vacio").notEmpty(),
    body('productos').isArray({ min: 1 }).withMessage('productos debe ser un array con al menos un elemento'),
    body('productos.*.ingredienteActivo').notEmpty().isString(),
    body('productos.*.dosis').notEmpty().isString(),
    body('productos.*.metodoAplicacion').notEmpty().isString(),
    validarCampos
  ], httpPreparaciones.putPreparaciones
),
router.put("/activar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersPreparacion.validarExistaId),
    validarCampos
  ], httpPreparaciones.putPreparacionesActivar
),
router.put("/desactivar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersPreparacion.validarExistaId),
    validarCampos
  ], httpPreparaciones.putPreparacionesDesactivar
)


export default router