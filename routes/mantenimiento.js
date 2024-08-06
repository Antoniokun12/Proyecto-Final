import { Router } from "express";
import httpMantenimientos from "../controllers/mantenimiento.js";
import helpersManteminentos from "../helpers/mantenimiento.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from '../middlewares/validar-jwt.js';
import { check } from "express-validator";


const router = Router();

router.get("/listar",[validarJWT],httpMantenimientos.getMantenimientos);
router.get("/listarid/:id", httpMantenimientos.getMantenimientosID);
router.get("/listaractivados",httpMantenimientos.getMantenimientoactivado)
router.get("/listardesactivados",httpMantenimientos.getMantenimientodesactivado)
router.post("/escribir", [
  // check('idGasto').custom(helpersManteminentos.validaridGasto),
  check('idMaquina').custom(helpersManteminentos.validaridMaquina_herramienta),
  check("responsable", "responsable no puede estar vacio").notEmpty().isString(),
  check("observaciones", "observaciones no puede estar vacio").notEmpty().isString(),
    validarCampos
  ], httpMantenimientos.postMantenimientos),
router.put( "/modificar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersManteminentos.validarExistaId),
    // check('idGasto').custom(helpersManteminentos.validaridGasto),
    check('idMaquina').custom(helpersManteminentos.validaridMaquina_herramienta),
    check("responsable", "responsable no puede estar vacio").notEmpty().isString(),
    check("observaciones", "observaciones no puede estar vacio").notEmpty().isString(),
    validarCampos
  ], httpMantenimientos.putMantenimientos
),
router.put("/activar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersManteminentos.validarExistaId),
    validarCampos
  ], httpMantenimientos.putMantenimientosActivar
),
router.put("/desactivar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersManteminentos.validarExistaId),
    validarCampos
  ], httpMantenimientos.putMantenimientosDesactivar
)


export default router