import { Router } from "express";
import httpInventarios from "../controllers/inventario.js";
import helpersInventarios from "../helpers/inventario.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from '../middlewares/validar-jwt.js';
import { check } from "express-validator";


const router = Router();

router.get("/listar", [validarJWT], httpInventarios.getInventarios);
router.get("/listarid/:id", httpInventarios.getInventariosID);
router.get("/listaractivados", httpInventarios.getInventarioactivado)
router.get("/listardesactivados", httpInventarios.getInventariodesactivado)

router.post("/escribir", [
  check('idSemilla').custom(helpersInventarios.validaridSemilla),
  check('idInsumo').custom(helpersInventarios.validaridInsumo),
  check('idMaquina_herramienta').custom(helpersInventarios.validaridMaquina_herramienta),
  check("tipo", "tipo no puede estar vacio, solo texto").notEmpty().isString(),
  check("observacion", "observacion no puede estar vacio, solo texto").notEmpty().isString(),
  check("unidad", "unidad no puede estar vacio, solo texto").notEmpty().isNumeric(),
  check("cantidad", "cantidad no puede estar vacio, solo numeros").notEmpty().isNumeric(),
  validarCampos
], httpInventarios.postInventarios),
  router.put("/modificar/:id", [
    validarJWT,
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersInventarios.validarExistaId),
    check('idSemilla').custom(helpersInventarios.validaridSemilla),
    check('idInsumo').custom(helpersInventarios.validaridInsumo),
    check('idMaquina_herramienta').custom(helpersInventarios.validaridMaquina_herramienta),
    check("tipo", "tipo no puede estar vacio, solo texto").notEmpty().isString(),
    check("observacion", "observacion no puede estar vacio, solo texto").notEmpty().isString(),
    check("unidad", "unidad no puede estar vacio, solo texto").notEmpty().isString(),
    check("cantidad", "cantidad no puede estar vacio, solo numeros").notEmpty().isNumeric(),
    validarCampos
  ], httpInventarios.putInventarios
  ),
  router.put("/activar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersInventarios.validarExistaId),
    validarCampos
  ], httpInventarios.putInventariosActivar
  ),
  router.put("/desactivar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersInventarios.validarExistaId),
    validarCampos
  ], httpInventarios.putInventarioDesactivar
  )

export default router