import { Router } from "express";
import httpGastos from "../controllers/gastos.js";
import helpersGastos from "../helpers/gastos.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from '../middlewares/validar-jwt.js';
import { check } from "express-validator";


const router = Router();

router.get("/listar",[validarJWT],httpGastos.getGastos);
router.get("/listarid/:id", httpGastos.getGastosID);
router.get("/listaractivados", httpGastos.getGastoactivado)
router.get("/listardesactivados",httpGastos.getGastodesactivado)

router.post("/escribir", [
  check('idInsumo').custom(helpersGastos.validaridInsumo),
  check('idSemilla').custom(helpersGastos.validaridSemilla),
  check('idMantenimiento').custom(helpersGastos.validaridMantenimiento),
  check("numero_factura", "numero de factura no puede estar vacia").notEmpty(),
  check("nombre", "nombre no puede estar vacio").notEmpty(),
  check("descripcion", "descripcion no puede estar vacia").notEmpty(),
  check("total", "total no puede estar vacio").notEmpty(),
    validarCampos
  ], httpGastos.postGastos),
router.put( "/modificar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersGastos.validarExistaId),
    check('idInsumo').custom(helpersGastos.validaridInsumo),
    check('idSemilla').custom(helpersGastos.validaridSemilla),
    check('idMantenimiento').custom(helpersGastos.validaridMantenimiento),
    check("numero_factura", "numero de factura no puede estar vacia").notEmpty(),
    check("nombre", "nombre no puede estar vacio").notEmpty(),
  check("total", "total no puede estar vacio").notEmpty(),
  check("descripcion", "descripcion no puede estar vacia").notEmpty(),
    validarCampos
  ], httpGastos.putGastos
),
router.put("/activar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersGastos.validarExistaId),
    validarCampos
  ], httpGastos.putGastosActivar
),
router.put("/desactivar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersGastos.validarExistaId),
    validarCampos
  ], httpGastos.putGastosDesactivar
)


export default router