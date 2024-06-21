import { Router } from "express";
import httpElaboracionSustrato from "../controllers/elaboracion_sustrato.js";
import helpersElaboracionSustrato from "../helpers/elaboracion_sustrato.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";


const router = Router();

router.get("/", httpElaboracionSustrato.getSustrato);
router.get("/:id", httpElaboracionSustrato.getSustratoID);
router.post("/", [
    validarCampos
  ], httpElaboracionSustrato.posSustrato),
router.put( "/actualizar/:id", [
    check("id", "Se necesita un mongoCc valido").isMongoId(),
    check("id").custom(helpersElaboracionSustrato.validarExistaId),
    validarCampos
  ], httpElaboracionSustrato.putSustrato
),
router.put("/activar/:id", [
    check("id", "Se necesita un mongoId valido").isMongoId(),
    check("id").custom(helpersElaboracionSustrato.validarExistaId),
    validarCampos
  ], httpElaboracionSustrato.putSustratoActivar
),
router.put("/desactivar/:id", [
    check("id", "Se necesita un mongoCc valido").isMongoId(),
    check("id").custom(helpersElaboracionSustrato.validarExistaId),
    validarCampos
  ], httpElaboracionSustrato.putSustratoActivar
)

// router.get("/total/clientes", httpClientes.getTotalPer);
// router.get("/listar/cumpleanos", httpClientes.getCumple);
// router.get("/listar/plan", httpClientes.listarPorPlan);
// router.get("/listar/seguimiento/:id", httpClientes.listarSeguimiento);


export default router