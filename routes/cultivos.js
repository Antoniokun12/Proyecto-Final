import { Router } from "express";
import httpCultivo from "../controllers/cultivos.js";
import helpersCultivo from "../helpers/cultivos.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";


const router = Router();

router.get("/", httpCultivo.getCultivo);
router.get("/:id", httpCultivo.getCultivoID);
router.post("/", [
    validarCampos
  ], httpCultivo.postCultivo),
router.put( "/actualizar/:id", [
    check("id", "Se necesita un mongoCc valido").isMongoId(),
    check("id").custom(helpersCultivo.validarExistaId),
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
    check("id", "Se necesita un mongoCc valido").isMongoId(),
    check("id").custom(helpersCultivo.validarExistaId),
    validarCampos
  ], httpCultivo.putCultivoActivar
)

// router.get("/total/clientes", httpClientes.getTotalPer);
// router.get("/listar/cumpleanos", httpClientes.getCumple);
// router.get("/listar/plan", httpClientes.listarPorPlan);
// router.get("/listar/seguimiento/:id", httpClientes.listarSeguimiento);


export default router