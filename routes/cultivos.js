import { Router } from "express";
import httpCultivo from "../controllers/cultivos.js";
import helpersCultivo from "../helpers/cultivos.js";
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";


const router = Router();

router.get("/listar",[validarJWT],httpCultivo.getCultivo);
router.get("/listarporfinca/:idFinca", httpCultivo.getCultivosByFinca);
router.get("/listarid/:id", httpCultivo.getCultivoID);
router.get("/listaractivados",httpCultivo.getCultivoactivado)
router.get("/listardesactivados",httpCultivo.getCultivodesactivado)

router.post("/escribir", [
  check('idParcela').custom(helpersCultivo.validaridParcela),
  check("nombre", "nombre no puede estar vacio").notEmpty(),
  check("tipo", "tipo no puede estar vacio").notEmpty(),
    validarCampos
  ], httpCultivo.postCultivo),
router.put( "/modificar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersCultivo.validarExistaId),
    check('idParcela').custom(helpersCultivo.validaridParcela),
    check("nombre", "nombre no puede estar vacio").notEmpty(),
    check("tipo", "tipo no puede estar vacio").notEmpty(),
    validarCampos
  ], httpCultivo.putCultivo
),
router.put("/activar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersCultivo.validarExistaId),
    validarCampos
  ], httpCultivo.putCultivoActivar
),
router.put("/desactivar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersCultivo.validarExistaId),
    validarCampos
  ], httpCultivo.putCultivoDesactivar
)


export default router