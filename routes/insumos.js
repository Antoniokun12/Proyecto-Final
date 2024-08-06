import { Router } from "express";
import httpInsumos from "../controllers/insumos.js";
import helpersInsumos from "../helpers/insumos.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";
import { validarJWT } from '../middlewares/validar-jwt.js';


const router = Router();

router.get("/listar",[validarJWT],httpInsumos.getInsumos);
router.get("/listarid/:id", httpInsumos.getInsumosID);
router.get("/listaractivados",httpInsumos.getInsumoactivado)
router.get("/listardesactivados",httpInsumos.getInsumodesactivado)

router.post("/escribir", [
  check('idProveedor').custom(helpersInsumos.validaridProveedor),
  check("nombre", "nombre no puede estar vacio").notEmpty(),
  check("relacionNPK", "relacionNPK no puede estar vacio").notEmpty(),
  check("cantidad", "cantidad no puede estar vacia").notEmpty().isNumeric(),
  check("unidad", "unidad no puede estar vacio").notEmpty(),
  check("responsable", "responsable no puede estar vacio").notEmpty().isString(),
  check("observaciones", "observaciones no puede estar vacias").notEmpty().isString(),
  // check("total", "total no puede estar vacio").notEmpty(),
    validarCampos
  ], httpInsumos.postInsumos),
router.put( "/modificar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersInsumos.validarExistaId),
    check('idProveedor').custom(helpersInsumos.validaridProveedor),
    check("nombre", "nombre no puede estar vacio").notEmpty(),
    check("relacionNPK", "relacionNPK no puede estar vacio").notEmpty(),
    check("cantidad", "cantidad no puede estar vacia").notEmpty().isNumeric(),
    check("unidad", "unidad no puede estar vacio").notEmpty(),
    check("responsable", "responsable no puede estar vacio").notEmpty().isString(),
    check("observaciones", "observaciones no puede estar vacias").notEmpty().isString(),
    // check("total", "total no puede estar vacio").notEmpty(),
    validarCampos
  ], httpInsumos.putInsumos
),
router.put("/activar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersInsumos.validarExistaId),
    validarCampos
  ], httpInsumos.putInsumosActivar
),
router.put("/desactivar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersInsumos.validarExistaId),
    validarCampos
  ], httpInsumos.putInsumosDesactivar
)


export default router