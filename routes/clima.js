import { Router } from "express";
import httpClima from "../controllers/clima.js";
import helpersClima from "../helpers/clima.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";


const router = Router();

router.get("/", httpClima.getClima);
router.get("/:id", httpClima.getClimaID);
router.post("/", [
    validarCampos
  ], httpClima.postClima),
router.put( "/actualizar/:id", [
    check("id", "Se necesita un mongoCc valido").isMongoId(),
    check("id").custom(helpersClima.validarExistaId),
    validarCampos
  ], httpClima.putClima
),
router.put("/activar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersClima.validarExistaId),
    validarCampos
  ], httpClima.putClimaActivar
),
router.put("/desactivar/:id", [
    check("id", "Se necesita un mongoCc valido").isMongoId(),
    check("id").custom(helpersClima.validarExistaId),
    validarCampos
  ], httpClima.putClimaActivar
)

// router.get("/total/clientes", httpClientes.getTotalPer);
// router.get("/listar/cumpleanos", httpClientes.getCumple);
// router.get("/listar/plan", httpClientes.listarPorPlan);
// router.get("/listar/seguimiento/:id", httpClientes.listarSeguimiento);


export default router