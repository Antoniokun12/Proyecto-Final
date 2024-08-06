import { Router } from "express";
import httpMaquinarias from "../controllers/maquinas&herramientas.js";
import helpersMaquinaria from "../helpers/maquinas&herramientas.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from '../middlewares/validar-jwt.js';
import { check } from "express-validator";


const router = Router();

router.get("/listar",[validarJWT],httpMaquinarias.getMaquinarias);
router.get("/listarid/:id", httpMaquinarias.getMaquinariasID);
router.get("/listaractivados",httpMaquinarias.getMaquina_herramientaactivado)
router.get("/listardesactivados",httpMaquinarias.getMaquina_herramientadesactivado)

router.post("/escribir", [
  check('idProveedor').custom(helpersMaquinaria.validaridProveedor),
  check("nombre", "nombre no puede estar vacio").notEmpty().isString(),
  check("tipo", "tipo no puede estar vacio").notEmpty().isString(),
  // check("FechaCompra", "Fecha de Compra debe ser una fecha").isISO8601().toDate(),
  // check("FechaCompra", "Fecha de Compra no puede estar vacia").notEmpty(),
  check("observaciones", "observaciones no puede estar vacio").notEmpty(),
  check("cantidad", "cantidad no puede estar vacio").notEmpty().isNumeric(),
  check("total", "total no puede estar vacio").notEmpty().isNumeric(),
    validarCampos
  ], httpMaquinarias.postMaquinarias),
router.put( "/modificar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersMaquinaria.validarExistaId),
    check('idProveedor').custom(helpersMaquinaria.validaridProveedor),
    check("nombre", "nombre no puede estar vacio").notEmpty().isString(),
    check("tipo", "tipo no puede estar vacio").notEmpty().isString(),
    // check("FechaCompra", "Fecha de Compra debe ser una fecha").isISO8601().toDate(),
    // check("FechaCompra", "Fecha de Compra no puede estar vacia").notEmpty(),
    check("observaciones", "observaciones no puede estar vacio").notEmpty(),
    check("cantidad", "cantidad no puede estar vacio").notEmpty().isNumeric(),
    check("total", "total no puede estar vacio").notEmpty().isNumeric(),
    validarCampos
  ], httpMaquinarias.putMaquinarias
),
router.put("/activar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersMaquinaria.validarExistaId),
    validarCampos
  ], httpMaquinarias.putMaquinariasActivar
),
router.put("/desactivar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersMaquinaria.validarExistaId),
    validarCampos
  ], httpMaquinarias.putMaquinariasDesactivar
)


export default router