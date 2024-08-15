import { Router } from "express";
import httpNominas from "../controllers/nomina.js";
import helpersNominas from "../helpers/nomina.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from '../middlewares/validar-jwt.js';
import { check } from "express-validator";


const router = Router();

router.get("/listar", [validarJWT], httpNominas.getNominas);
router.get("/listar/activadas", [validarJWT], httpNominas.getNominaactivado);
router.get("/listar/desactivadas", [validarJWT], httpNominas.getNominadesactivado);

router.get("/listarid/:id", httpNominas.getNominasID);
router.post("/escribir", [
  validarJWT,
  check("idEmpleado", "Se necesita un mongoId valido").isMongoId(),
  check("idEmpleado").custom(helpersNominas.validaridEmpleado),
  // check("fecha", "fecha no puede estar vacia").notEmpty(),
  // check("fecha", "fecha debe ser una fecha válida").isISO8601().toDate(),
  check("tipo", "tipo no puede estar vacio").notEmpty().isString(),
  check("valor", "valor no puede estar vacio").notEmpty().isNumeric(),
  validarCampos
], httpNominas.postNominas),
  router.put("/modificar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersNominas.validarExistaId),
    check("idEmpleado", "Se necesita un mongoId valido").isMongoId(),
    check("idEmpleado").custom(helpersNominas.validaridEmpleado),
    //   check("fecha", "fecha no puede estar vacia").notEmpty(),
    // check("fecha", "fecha debe ser una fecha válida").isISO8601().toDate(),
    check("tipo", "tipo no puede estar vacio").notEmpty().isString(),
    check("valor", "valor no puede estar vacio").notEmpty().isNumeric(),
    validarCampos
  ], httpNominas.putNominas
  ),
  router.put("/activar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersNominas.validarExistaId),
    validarCampos
  ], httpNominas.putNominasActivar
  ),
  router.put("/desactivar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersNominas.validarExistaId),
    validarCampos
  ], httpNominas.putNominasDesactivar
  )



export default router