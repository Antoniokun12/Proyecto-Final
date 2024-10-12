import { Router } from "express";
import httpInsumos from "../controllers/insumos.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";
import { validarJWT } from '../middlewares/validar-jwt.js';


const router = Router();

router.get("/listar", httpInsumos.getInsumos);
router.get("/listarid/:id", httpInsumos.getInsumosID);
router.get("/listaractivados", httpInsumos.getInsumosactivado);
router.get("/listardesactivados", httpInsumos.getInsumosdesactivado);
router.post("/escribir", httpInsumos.postInsumos);
router.put( "/modificar/:id", httpInsumos.putInsumos);
router.put("/activar/:id", [
    check("id", "No es un ID válido").isMongoId(),
    // check("id").custom(helpersAdministrador.validarExistaId),
    validarCampos
], httpInsumos.putInsumosActivar
);
router.put("/desactivar/:id", [
    check("id", "No es un ID válido").isMongoId(),
    // check("id").custom(helpersAdministrador.validarExistaId),
    validarCampos
], httpInsumos.putInsumosDesactivar
)

export default router