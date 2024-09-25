import { Router } from "express";
import httpProcesos from "../controllers/procesos.js";
import helpersProcesos from "../helpers/procesos.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from '../middlewares/validar-jwt.js';
import { check } from "express-validator";


const router = Router();

router.get("/listar",[validarJWT],httpProcesos.getProcesos);
router.get("/listarporfinca/:idFinca", httpProcesos.getProcesosByFinca);
router.get("/listarid/:id", httpProcesos.getProcesosID);
router.get("/listaractivados",httpProcesos.getProcesoactivado)
router.get("/listardesactivados",httpProcesos.getProcesodesactivado)
router.post("/escribir", [
  check("idCultivo", "Se necesita un mongoId valido").isMongoId(),
  check("idCultivo").custom(helpersProcesos.validaridCultivo),
  check("idEmpleado", "Se necesita un mongoId valido").isMongoId(),
  check("idEmpleado").custom(helpersProcesos.validaridEmpleado),
  check("tipo", "tipo no puede estar vacio").notEmpty().isString(),
  check("descripcion", "descripcion no puede estar vacio").notEmpty().isString(),
  check("fechaFinal", "fecha Final no puede estar vacia").notEmpty(),
  // check("fechaFinal", "fecha Final debe ser una fecha válida").isISO8601().toDate(),
    validarCampos
  ], httpProcesos.postProcesos),
router.put( "/modificar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersProcesos.validarExistaId),
    check("idCultivo", "Se necesita un mongoId valido").isMongoId(),
    check("idCultivo").custom(helpersProcesos.validaridCultivo),
    check("idEmpleado", "Se necesita un mongoId valido").isMongoId(),
    check("idEmpleado").custom(helpersProcesos.validaridEmpleado),
    check("tipo", "tipo no puede estar vacio").notEmpty().isString(),
    check("descripcion", "descripcion no puede estar vacio").notEmpty().isString(),
    check("fechaFinal", "fecha Final no puede estar vacia").notEmpty(),
    // check("fechaFinal", "fecha Final debe ser una fecha válida").isISO8601().toDate(),
    validarCampos
  ], httpProcesos.putProcesos
),
router.put("/activar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersProcesos.validarExistaId),
    validarCampos
  ], httpProcesos.putProcesosActivar
),
router.put("/desactivar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersProcesos.validarExistaId),
    validarCampos
  ], httpProcesos.putProcesosDesactivar
)

export default router