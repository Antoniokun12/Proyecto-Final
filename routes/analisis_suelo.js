import { Router } from "express";
import httpAnalisisSuelo from "../controllers/analisis_suelo.js";
import helpersAnalisisSuelo from "../helpers/analisis_suelo.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from '../middlewares/validar-jwt.js';
import { check } from "express-validator";


const router = Router();

router.get("/listar",[validarJWT],httpAnalisisSuelo.getAnalisis);
router.get("/listarporfinca/:idFinca",httpAnalisisSuelo.getAnalisisSueloByFinca);
router.get("/listarid/:id", httpAnalisisSuelo.getAnalisisID);
router.get("/listaractivados",httpAnalisisSuelo.getAnalisisactivado)
router.get("/listardesactivados",httpAnalisisSuelo.getAnalisisdesactivado)

router.post("/escribir", [
  check('idParcela').custom(helpersAnalisisSuelo.validaridParcela),
  check('idEmpleado').custom(helpersAnalisisSuelo.validaridEmpleado),
  check("muestra", "muestra no puede estar vacia").notEmpty(),
  check("cultivo", "cultivo no puede estar vacio").notEmpty(),
  check("laboratorio", "laboratorio no puede estar vacio").notEmpty(),
  check("resultados", "resultados no puede estar vacio").notEmpty(),
  check("recomendaciones", "recomendaciones no puede estar vacio").notEmpty(),
    validarCampos
  ], httpAnalisisSuelo.postAnalisis),
router.put("/modificar/:id", [
    check("id", "Se necesita un mongo ID valido").isMongoId(),
    check("id").custom(helpersAnalisisSuelo.validarExistaId),
    check('idParcela').custom(helpersAnalisisSuelo.validaridParcela),
    check('idEmpleado').custom(helpersAnalisisSuelo.validaridEmpleado),
    check("muestra", "muestra no puede estar vacia").notEmpty(),
    check("cultivo", "cultivo no puede estar vacio").notEmpty(),
    check("laboratorio", "laboratorio no puede estar vacio").notEmpty(),
    check("resultados", "resultados no puede estar vacio").notEmpty(),
    check("recomendaciones", "recomendaciones no puede estar vacio").notEmpty(),
    validarCampos
  ], httpAnalisisSuelo.putAnalisis
),
router.put("/activar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersAnalisisSuelo.validarExistaId),
    validarCampos
  ], httpAnalisisSuelo.putAnalisisActivar
),
router.put("/desactivar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersAnalisisSuelo.validarExistaId),
    validarCampos
  ], httpAnalisisSuelo.putAnalisisDesactivar
)



export default router