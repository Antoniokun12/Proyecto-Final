import { Router } from "express";
import httpControlPlaga from "../controllers/control_plagas.js";
import helpersControlPlagas from "../helpers/control_plagas.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from '../middlewares/validar-jwt.js';
import { check } from "express-validator";

const router = Router();
 
router.get("/listar",[validarJWT],httpControlPlaga.getControlPlaga);
router.get("/listarid/:id", httpControlPlaga.getControlPlagaID);
router.get("/listaractivados",httpControlPlaga.getControlPlagaactivado)
router.get("/listardesactivados",httpControlPlaga.getControlPlagadesactivado)

router.post("/escribir",[
  check('idCultivo').custom(helpersControlPlagas.validaridCultivo),
  check('idEmpleado').custom(helpersControlPlagas.validaridEmpleado),
  check("tipoCultivo", "tipoCultivo no puede estar vacio").notEmpty(),
  check("nombre", "nombre no puede estar vacio").notEmpty(),
  check("tipo", "tipo no puede estar vacio").notEmpty(),
  check("ingredientesActivo", "ingredientesActivo no puede estar vacio").notEmpty(),
  check("dosis", "dosis no puede estar vacio").notEmpty(),
  check("observaciones", "observaciones no puede estar vacio").notEmpty(),
    validarCampos
], httpControlPlaga.postControlPlaga),
router.put( "/modificar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersControlPlagas.validarExistaId),
    check('idCultivo').custom(helpersControlPlagas.validaridCultivo),
    check('idEmpleado').custom(helpersControlPlagas.validaridEmpleado),
    check("tipoCultivo", "tipoCultivo no puede estar vacio").notEmpty(),
    check("nombre", "nombre no puede estar vacio").notEmpty(),
    check("tipo", "tipo no puede estar vacio").notEmpty(),
    check("ingredientesActivo", "ingredientesActivo no puede estar vacio").notEmpty(),
    check("dosis", "dosis no puede estar vacio").notEmpty(),
    check("observaciones", "observaciones no puede estar vacio").notEmpty(),
    validarCampos
  ], httpControlPlaga.putControlPlaga
),
router.put("/activar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersControlPlagas.validarExistaId),
    validarCampos
  ], httpControlPlaga.putControlPlagaActivar
),
router.put("/desactivar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersControlPlagas.validarExistaId),
    validarCampos
  ], httpControlPlaga.putControlPlagaDesactivar
)

export default router