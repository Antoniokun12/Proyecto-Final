import { Router } from "express";
import httpProduccion from "../controllers/produccion.js";
import helpersProduccion from "../helpers/produccion.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from '../middlewares/validar-jwt.js';
import { check } from "express-validator";


const router = Router();

router.get("/listar",[validarJWT], httpProduccion.getProduccion);
router.get("/listarid/:id", httpProduccion.getProduccionID);
router.get("/listaractivados",httpProduccion.getProduccionactivado)
router.get("/listardesactivados",httpProduccion.getProducciondesactivado)
router.post("/escribir", [
  check("idCultivo", "Se necesita un mongoId valido").isMongoId(),
    check("idCultivo").custom(helpersProduccion.validaridCultivo),
    check("Nlote", "Nlote no puede estar vacio").notEmpty().isString(),
    check("especie", "especie no puede estar vacio").notEmpty().isString(),
    check("cantidad", "cantidad no puede estar vacio").notEmpty().isNumeric(),
    check("cantidadTrabajadores", "cantidadTrabajadores no puede estar vacio").notEmpty().isNumeric(),
    check("observaciones", "observaciones no puede estar vacio").notEmpty().isString(),
    validarCampos
  ], httpProduccion.postProduccion),
router.put( "/modificar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersProduccion.validarExistaId),
    check("idCultivo", "Se necesita un mongoId valido").isMongoId(),
    check("idCultivo").custom(helpersProduccion.validaridCultivo),
    check("Nlote", "Nlote no puede estar vacio").notEmpty().isString(),
    check("especie", "especie no puede estar vacio").notEmpty().isString(),
    check("cantidad", "cantidad no puede estar vacio").notEmpty().isNumeric(),
    check("cantidadTrabajadores", "cantidadTrabajadores no puede estar vacio").notEmpty().isNumeric(),
    check("observaciones", "observaciones no puede estar vacio").notEmpty().isString(),
    validarCampos
  ], httpProduccion.putProduccion
),
router.put("/activar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersProduccion.validarExistaId),
    validarCampos
  ], httpProduccion.putProduccionActivar
),
router.put("/desactivar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersProduccion.validarExistaId),
    validarCampos
  ], httpProduccion.putProduccionDesactivar
)

export default router