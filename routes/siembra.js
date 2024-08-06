import { Router } from "express";
import httpSiembras from "../controllers/siembra.js";
import helpersSiembras from "../helpers/siembra.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from '../middlewares/validar-jwt.js';
import { check } from "express-validator";


const router = Router();

router.get("/listar",[validarJWT],httpSiembras.getSiembras);
router.get("/listarid/:id",  httpSiembras.getSiembrasID);
router.get("/listaractivados",httpSiembras.getSiembraactivado)
router.get("/listardesactivados",httpSiembras.getSiembradesactivado)
router.post("/escribir", [
  check('idCultivo').custom(helpersSiembras.validaridCultivo),
  check('idEmpleado').custom(helpersSiembras.validaridInventario),
  check('idInventario').custom(helpersSiembras.validaridEmpleado),
  check('fechacosecha')
  .isAfter('fechasiembra')
  .withMessage('La fecha de cosecha debe ser posterior a la fecha de siembra'),
  check("transplante", "transplante no puede estar vacio").notEmpty().isString(),
  check("CultivoAnterior", "CultivoAnterior no puede estar vacio").notEmpty().isString(),
    validarCampos
  ], httpSiembras.postSiembras),
router.put( "/modificar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersSiembras.validarExistaId),
    check('idCultivo').custom(helpersSiembras.validaridCultivo),
    check('idEmpleado').custom(helpersSiembras.validaridInventario),
    check('idInventario').custom(helpersSiembras.validaridEmpleado),
    check('fechacosecha')
    .isAfter('fechasiembra')
    .withMessage('La fecha de cosecha debe ser posterior a la fecha de siembra'),
    check("transplante", "transplante no puede estar vacio").notEmpty().isString(),
    check("CultivoAnterior", "CultivoAnterior no puede estar vacio").notEmpty().isString(),
    validarCampos
  ], httpSiembras.putSiembras
),
router.put("/activar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersSiembras.validarExistaId),
    validarCampos
  ], httpSiembras.putSiembrasActivar
),
router.put("/desactivar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersSiembras.validarExistaId),
    validarCampos
  ], httpSiembras.putSiembrasDesactivar
)


export default router