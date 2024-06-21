import { Router } from "express";
import httpAnalisisSuelo from "../controllers/analisis_suelo.js";
import helpersAnalisisSuelo from "../helpers/analisis_suelo.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";


const router = Router();

router.get("/", httpanAlisisSuelo.getAnalisis);
router.get("/:id", httpAnalisisSuelo.getAnalisisID);
router.post("/", [
    validarCampos
  ], httpAnalisisSuelo.postAnalisis),
router.put( "/actualizar/:id", [
    check("id", "Se necesita un mongoCc valido").isMongoId(),
    check("id").custom(helpersAnalisisSuelo.validarExistaId),
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
    check("id", "Se necesita un mongoCc valido").isMongoId(),
    check("id").custom(helpersAnalisisSuelo.validarExistaId),
    validarCampos
  ], httpAnalisisSuelo.putAnalisisActivar
)

// router.get("/total/clientes", httpClientes.getTotalPer);
// router.get("/listar/cumpleanos", httpClientes.getCumple);
// router.get("/listar/plan", httpClientes.listarPorPlan);
// router.get("/listar/seguimiento/:id", httpClientes.listarSeguimiento);


export default router