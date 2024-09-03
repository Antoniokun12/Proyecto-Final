import { Router } from "express";
import httpParcelas from "../controllers/parcelas.js";
import helpersParcelas from "../helpers/parcelas.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from '../middlewares/validar-jwt.js';
import { check, body } from "express-validator";


const router = Router();

router.get("/listar", [validarJWT], httpParcelas.getParcelas);
router.get("/listarid/:id", httpParcelas.getParcelasID);
router.get("/listaractivados", httpParcelas.getParcelaactivado)
router.get("/listardesactivados", httpParcelas.getParceladesactivado)

router.post("/escribir", [
  check("idFinca", "idFinca no puede estar vacio").notEmpty().isMongoId().withMessage('debe ser un id de mongo'),
  check("idFinca").custom(helpersParcelas.validaridFinca),
  body('ubicacionGeografica').isArray({ min: 1 }).withMessage('ubicacion Geografica debe ser un array con al menos un elemento'),
  body('ubicacionGeografica.*.latitud').notEmpty().isString(),
  body('ubicacionGeografica.*.longitud').notEmpty().isString(),
  check("cultivoAnterior", "cultivo Anterior no puede estar vacio").notEmpty().isString(),
  check("cultivoActual", "cultivo Actual no puede estar vacio").notEmpty().isString(),
  check("detalle", "detalle no puede estar vacio").notEmpty().isString(),
  check("area", "area no puede estar vacio").notEmpty().isNumeric(),
  check("asistenteTecnico", "asistente Tecnico no puede estar vacio").notEmpty().isString(),
  validarCampos
], httpParcelas.postParcelas),

  router.put("/modificar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersParcelas.validarExistaId),
    check("idFinca", "idFinca no puede estar vacio").notEmpty().isMongoId().withMessage('debe ser un id de mongo'),
    check("idFinca").custom(helpersParcelas.validaridFinca),
    body('ubicacionGeografica').isArray({ min: 1 }).withMessage('ubicacion Geografica debe ser un array con al menos un elemento'),
    body('ubicacionGeografica.*.latitud').notEmpty().isString(),
    body('ubicacionGeografica.*.longitud').notEmpty().isString(),
    check("cultivoAnterior", "cultivo Anterior no puede estar vacio").notEmpty().isString(),
    check("cultivoActual", "cultivo Actual no puede estar vacio").notEmpty().isString(),
    check("detalle", "detalle no puede estar vacio").notEmpty().isString(),
    check("area", "area no puede estar vacio").notEmpty().isNumeric(),
    check("asistenteTecnico", "asistente Tecnico no puede estar vacio").notEmpty().isString(),
    validarCampos
  ], httpParcelas.putParcelas
  ),
  router.put("/activar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersParcelas.validarExistaId),
    validarCampos
  ], httpParcelas.putParcelasActivar
  ),
  router.put("/desactivar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersParcelas.validarExistaId),
    validarCampos
  ], httpParcelas.putParcelasDesactivar
  )


export default router