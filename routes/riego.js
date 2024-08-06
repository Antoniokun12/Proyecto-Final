import { Router } from "express";
import httpRiegos from "../controllers/riego.js";
import helpersRiego from "../helpers/riego.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from '../middlewares/validar-jwt.js';
import { check } from "express-validator";


const router = Router();

router.get("/listar",[validarJWT],httpRiegos.getRiegos);
router.get("/listarid/:id", httpRiegos.getRiegosID);
router.get("/listaractivados",httpRiegos.getRiegoactivado)
router.get("/listardesactivados",httpRiegos.getRiegodesactivado)
router.post("/escribir", [
  check('idCultivo').custom(helpersRiego.validaridCultivo),
  check('idEmpleado').custom(helpersRiego.validaridEmpleado),
  check("horaFin", "horaFin debe ser una fecha").isISO8601().toDate(),
  check("horaFin", "horaFin no puede estar vacia").notEmpty(),
  check("diasTransplante", "diasTransplante no puede estar vacio").notEmpty().isString(),
  check("estadoFenologico", "estadoFenologico no puede estar vacio").notEmpty().isString(),
  check("dosis", "dosis no puede estar vacio").notEmpty().isString(),
  check("cantidadAgua", "cantidadAgua no puede estar vacio").notEmpty().isNumeric(),
    validarCampos
  ], httpRiegos.postRiegos),
router.put( "/modificar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersRiego.validarExistaId),
    check('idCultivo').custom(helpersRiego.validaridCultivo),
    check('idEmpleado').custom(helpersRiego.validaridEmpleado),
    check("horaFin", "horaFin debe ser una fecha").isISO8601().toDate(),
    check("horaFin", "horaFin no puede estar vacia").notEmpty(),
    check("diasTransplante", "diasTransplante no puede estar vacio").notEmpty().isString(),
    check("estadoFenologico", "estadoFenologico no puede estar vacio").notEmpty().isString(),
    check("dosis", "dosis no puede estar vacio").notEmpty().isString(),
    check("cantidadAgua", "cantidadAgua no puede estar vacio").notEmpty().isNumeric(),
    validarCampos
  ], httpRiegos.putRiegos
),
router.put("/activar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersRiego.validarExistaId),
    validarCampos
  ], httpRiegos.putRiegosActivar
),
router.put("/desactivar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersRiego.validarExistaId),
    validarCampos
  ], httpRiegos.putRiegosDesactivar
)

export default router