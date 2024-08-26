import { Router } from "express";
import httpComprador from "../controllers/comprador.js";
import helpersComprador from "../helpers/comprador.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";
import { validarJWT } from '../middlewares/validar-jwt.js';


const router = Router();

router.get("/listar",[validarJWT],httpComprador.getComprador);
router.get("/listarid/:id", httpComprador.getCompradorID);
router.get("/listaractivados",httpComprador.getCompradoractivado)
router.get("/listardesactivados",httpComprador.getCompradordesactivado)
router.post("/escribir", [
  check('idProduccion').custom(helpersComprador.validaridProduccion),
  check("especie", "especie no puede estar vacio").notEmpty(),
  check("nombre", "nombre no puede estar vacio").notEmpty(),
  check("telefono", "telefono no puede estar vacio").notEmpty().isString(),
  check("cantidad", "cantidad no puede estar vacio").notEmpty().isNumeric(),
  check("nguiaTransporte", "nguiaTransporte no puede estar vacio").notEmpty(),
  check("valor", "valor no puede estar vacio").notEmpty(),
    validarCampos
  ], httpComprador.postComprador),
router.put( "/modificar/:id", [
    check("id", "Se necesita un mongo ID valido").isMongoId(),
    check("idProduccion", "Se necesita un mongo ID valido").isMongoId(),
    check("id").custom(helpersComprador.validarExistaId),
    check('idProduccion').custom(helpersComprador.validaridProduccion),
    check("especie", "especie no puede estar vacio").notEmpty(),
    check("nombre", "nombre no puede estar vacio").notEmpty(),
    check("telefono", "telefono no puede estar vacio").notEmpty().isString(),
    check("cantidad", "cantidad no puede estar vacio").notEmpty().isNumeric(),
    check("nguiaTransporte", "nguiaTransporte no puede estar vacio").notEmpty(),
    check("valor", "valor no puede estar vacio").notEmpty(),
    validarCampos
  ], httpComprador.putComprador
),
router.put("/activar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersComprador.validarExistaId),
    validarCampos
  ], httpComprador.putCompradorActivar
),
router.put("/desactivar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersComprador.validarExistaId),
    validarCampos
  ], httpComprador.putCompradorDesactivar
)


export default router