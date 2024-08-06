import { Router } from "express";
import httpFertilizacion from "../controllers/fertilizacion.js";
import helpersFertilizacion from "../helpers/fertilizacion.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from '../middlewares/validar-jwt.js';
import { check } from "express-validator";


const router = Router();

router.get("/listar",[validarJWT],httpFertilizacion.getFertilizacion);
router.get("/listarid/:id", httpFertilizacion.getFertizacionID);
router.get("/listaractivados",httpFertilizacion.getFertilizacionactivado)
router.get("/listardesactivados",httpFertilizacion.getFertilizaciondesactivado)

router.post("/escribir", [
  check('idCultivo').custom(helpersFertilizacion.validaridCultivo),
  check('idEmpleado').custom(helpersFertilizacion.validaridEmpleado),
  check('idInventario').custom(helpersFertilizacion.validaridInventario),
  check("estadoFenologico", "estado fenologico no puede estar vacio").notEmpty(),
  check("tipo", "tipo no puede estar vacio").notEmpty(),
  check("nombreFertilizante", "nombreFertilizante no puede estar vacio").notEmpty(),
  check("cantidad", "cantidad no puede estar vacio").notEmpty().isNumeric(),
    validarCampos
  ], httpFertilizacion.postFertizacion),
router.put("/modificar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersFertilizacion.validarExistaId),
    check('idCultivo').custom(helpersFertilizacion.validaridCultivo),
    check('idEmpleado').custom(helpersFertilizacion.validaridEmpleado),
    check('idInventario').custom(helpersFertilizacion.validaridInventario),
    check("estadoFenologico", "estado fenologico no puede estar vacio").notEmpty(),
    check("tipo", "tipo no puede estar vacio").notEmpty(),
    check("nombreFertilizante", "nombreFertilizante no puede estar vacio").notEmpty(),
    check("cantidad", "cantidad no puede estar vacio").notEmpty().isNumeric(),
    validarCampos
  ], httpFertilizacion.putFertilizacion
),
router.put("/activar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersFertilizacion.validarExistaId),
    validarCampos
  ], httpFertilizacion.putFertilizacionActivar
),
router.put("/desactivar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersFertilizacion.validarExistaId),
    validarCampos
  ], httpFertilizacion.putFertilizacionDesactivar
)



export default router