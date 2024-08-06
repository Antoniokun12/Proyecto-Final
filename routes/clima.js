import { Router } from "express";
import httpClima from "../controllers/clima.js";
import helpersClima from "../helpers/clima.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";
import { validarJWT } from '../middlewares/validar-jwt.js';


const router = Router();

router.get("/listar",[validarJWT],httpClima.getClima);
router.get("/listarid/:id", httpClima.getClimaID);
router.post("/escribir", [
  check('idFinca').custom(helpersClima.validaridFinca),
  check('idEmpleado').custom(helpersClima.validaridEmpleado),
  check("tipo", "tipo no puede estar vacio").notEmpty(),
  check("tempMin", "tempMin no puede estar vacio").notEmpty(),
    validarCampos  
  ], httpClima.postClima),
router.put( "/modificar/:id", [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(helpersClima.validarExistaId),
    check('idFinca').custom(helpersClima.validaridFinca),
    check('idEmpleado').custom(helpersClima.validaridEmpleado),
    check("tipo", "tipo no puede estar vacio").notEmpty(),
    check("tempMin", "tempMin no puede estar vacio").notEmpty(),
    validarCampos
  ], httpClima.putClima
)

// router.put("/activar/:id", [
//     check("id", "Se necesita un mongoId valido").isMongoId(),
//     check("id").custom(helpersClima.validarExistaId),
//     validarCampos
//   ], httpClima.putClimaActivar
// ),
// router.put("/desactivar/:id", [
//     check("id", "Se necesita un mongoCc valido").isMongoId(),
//     check("id").custom(helpersClima.validarExistaId),
//     validarCampos
//   ], httpClima.putClimaDesactivar
// )

// router.get("/total/clientes", httpClientes.getTotalPer);
// router.get("/listar/cumpleanos", httpClientes.getCumple);
// router.get("/listar/plan", httpClientes.listarPorPlan);
// router.get("/listar/seguimiento/:id", httpClientes.listarSeguimiento);


export default router