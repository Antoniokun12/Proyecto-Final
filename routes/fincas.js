import { Router } from "express";
import httpFincas from "../controllers/fincas.js";
import helpersFincas from "../helpers/fincas.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from '../middlewares/validar-jwt.js';
import { check, body } from 'express-validator';


const router = Router();

router.get("/listar",[validarJWT],httpFincas.getFincas);
router.get("/listarid/:id",httpFincas.getFincasID);
router.get("/listaractivados",httpFincas.getFincaactivado)
router.get("/listardesactivados",httpFincas.getFincadesactivado)

router.post("/escribir", [
  check('idAdministrador').custom(helpersFincas.validaridAdministrador),
  check("nombre", "nombre no puede estar vacio").notEmpty(),
  check('rut').custom(helpersFincas.rutExiste),
  check("direccion", "direccion no puede estar vacia").notEmpty(),
  check("ubicacionGeografica", "ubicacion geografica no puede estar vacia").notEmpty(),
  check("area", "ubicacion geografica no puede estar vacia").notEmpty(),
  check("ciudad", "ubicacion geografica no puede estar vacia").notEmpty(),
  check("departamento", "ubicacion geografica no puede estar vacia").notEmpty(),
  body('limites').isArray({ min: 1 }).withMessage('detalle debe ser un array con al menos un elemento'),
  body('limites.*.norte').notEmpty().isString(),
  body('limites.*.sur').notEmpty().isString(),
  body('limites.*.este').notEmpty().isString(),
  body('limites.*.oeste').notEmpty().isString(),  
    validarCampos
  ], httpFincas.postFincas),
router.put("/modificar/:id", [
    check("id", "Se necesita un idmongo valido").isMongoId(),
    check("id").custom(helpersFincas.validarExistaId),
    check('idAdministrador').custom(helpersFincas.validaridAdministrador),
    check("rut").custom((rut, { req }) => helpersFincas.rutExisteExceptoPropio(rut, req.params.id)),
    check("nombre", "nombre no puede estar vacio").notEmpty(),
    check("direccion", "direccion no puede estar vacia").notEmpty(),
    check("ubicacionGeografica", "ubicacion geografica no puede estar vacia").notEmpty(),
    check("area", "ubicacion geografica no puede estar vacia").notEmpty(),
    check("ciudad", "ubicacion geografica no puede estar vacia").notEmpty(),
    check("departamento", "ubicacion geografica no puede estar vacia").notEmpty(),
    body('limites').isArray({ min: 1 }).withMessage('limites debe ser un array con al menos un elemento'),
    body('limites.*.norte').notEmpty().isString(),
    body('limites.*.sur').notEmpty().isString(),
    body('limites.*.este').notEmpty().isString(),
    body('limites.*.oeste').notEmpty().isString(),  
    validarCampos
  ], httpFincas.putFincas
),
router.put("/activar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersFincas.validarExistaId),
    validarCampos
  ], httpFincas.putFincasActivar
),
router.put("/desactivar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersFincas.validarExistaId),
    validarCampos
  ], httpFincas.putFincasDesactivar
)

export default router