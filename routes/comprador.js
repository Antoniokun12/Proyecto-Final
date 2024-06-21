import { Router } from "express";
import httpComprador from "../controllers/comprador.js";
import helpersComprador from "../helpers/comprador.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";


const router = Router();

router.get("/", httpComprador.getComprador);
router.get("/:id", httpComprador.getCompradorID);
router.post("/", [
    validarCampos
  ], httpComprador.postComprador),
router.put( "/actualizar/:id", [
    check("id", "Se necesita un mongoCc valido").isMongoId(),
    check("id").custom(helpersComprador.validarExistaId),
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
    check("id", "Se necesita un mongoCc valido").isMongoId(),
    check("id").custom(helpersComprador.validarExistaId),
    validarCampos
  ], httpComprador.putCompradorActivar
)

// router.get("/total/clientes", httpClientes.getTotalPer);
// router.get("/listar/cumpleanos", httpClientes.getCumple);
// router.get("/listar/plan", httpClientes.listarPorPlan);
// router.get("/listar/seguimiento/:id", httpClientes.listarSeguimiento);


export default router