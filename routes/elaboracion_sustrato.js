import { Router } from "express";
import httpElaboracionSustrato from "../controllers/elaboracion_sustrato.js";
import helpersElaboracionSustrato from "../helpers/elaboracion_sustrato.js";
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";


const router = Router();

router.get("/listar",[validarJWT],httpElaboracionSustrato.getSustrato);
router.get("/listarporfinca/:idFinca",httpElaboracionSustrato.getSustratosByFinca);
router.get("/listarid/:id",httpElaboracionSustrato.getSustratoID);
router.get("/listaractivados",httpElaboracionSustrato.getSustratoactivado)
router.get("/listardesactivados",httpElaboracionSustrato.getSustratodesactivado)

router.post("/escribir", [
  check('idProceso').custom(helpersElaboracionSustrato.validaridProceso),
  check('idEmpleado').custom(helpersElaboracionSustrato.validaridEmpleado),
  check("productoComercial", "productoComercial no puede estar vacio").notEmpty().isString(),
  check("ingredienteActivo", "ingredienteActivo no puede estar vacio").notEmpty(),
  check("dosisUtilizada", "dosisUtilizada no puede estar vacio").notEmpty().isString(),
  check("metodoAplicacion", "metodoAplicacion no puede estar vacio").notEmpty(),
  check("observaciones", "observaciones no puede estar vacio").notEmpty(),
    validarCampos
    ], httpElaboracionSustrato.postSustrato),
router.put( "/modificar/:id", [
    check("id", "Se necesita un mongoCc valido").isMongoId(),
    check("id").custom(helpersElaboracionSustrato.validarExistaId),
    check('idProceso').custom(helpersElaboracionSustrato.validaridProceso),
    check('idEmpleado').custom(helpersElaboracionSustrato.validaridEmpleado),
    check("productoComercial", "productoComercial no puede estar vacio").notEmpty().isString(),
    check("ingredienteActivo", "ingredienteActivo no puede estar vacio").notEmpty(),
    check("dosisUtilizada", "dosisUtilizada no puede estar vacio").notEmpty().isString(),
    check("metodoAplicacion", "metodoAplicacion no puede estar vacio").notEmpty(),
    check("observaciones", "observaciones no puede estar vacio").notEmpty(),
    validarCampos
  ], httpElaboracionSustrato.putSustrato
),
router.put("/activar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersElaboracionSustrato.validarExistaId),
    validarCampos
  ], httpElaboracionSustrato.putSustratoActivar
),
router.put("/desactivar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersElaboracionSustrato.validarExistaId),
    validarCampos
  ], httpElaboracionSustrato.putSustratoDesactivar
)

export default router